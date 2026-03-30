<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  color1: {
    type: String,
    default: '#33a0ff' // Blue
  },
  color2: {
    type: String,
    default: '#ff7a33' // Orange
  },
  color3: {
    type: String,
    default: '#ffde33' // Yellow
  }
});

const canvasContainer = ref(null);

// Utility to parse hex colors to THREE.Color
function parseColor(hex) {
  return new THREE.Color(hex);
}

// GLSL Vertex Shader (Simplex Noise Deformation)
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;

  // 3D Simplex Noise from shadergradient
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    // Normalize position relative to our huge plane size to keep the noise structure large
    vec3 normalizedPos = position * 0.05; 
    vec3 noisePos = 0.43 * normalizedPos * uNoiseDensity;
    
    // Adjusted animation speed and magnitude
    float t = uTime * 0.5;
    float distortion = 0.75 * cnoise(noisePos + t);
    
    // Scale up the normal displacement drastically to produce deep valleys and high peaks
    vec3 pos = position + normal * distortion * (uNoiseStrength * 8.0);
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// GLSL Fragment Shader (Color Linear Blend)
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  void main() {
    // 3D procedural gradient mixing logic modeled after shadergradient
    // Blends horizontally between color 1 and 2, and maps color 3 to the Z-depth peaks.
    float xMix = smoothstep(-20.0, 20.0, vPos.x);
    float zMix = smoothstep(-8.0, 8.0, vPos.z);
    
    vec3 finalColor = mix(mix(uColor1, uColor2, xMix), uColor3, zMix);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

let scene, camera, renderer, material, mesh, animationId;

function initWebGL() {
  if (!canvasContainer.value) return;

  scene = new THREE.Scene();
  
  // Camera Setup (pulled further back to view the enlarged plane)
  camera = new THREE.PerspectiveCamera(75, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 100);
  camera.position.z = 20;
  
  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap pixel ratio for performance
  canvasContainer.value.appendChild(renderer.domElement);

  // Material & Shaders
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uNoiseDensity: { value: 1.2 },
      uNoiseStrength: { value: 2.0 },
      uColor1: { value: parseColor(props.color1) },
      uColor2: { value: parseColor(props.color2) },
      uColor3: { value: parseColor(props.color3) }
    },
    wireframe: false
  });

  // Mesh Setup
  // High density plane geometry guarantees smooth rolling hills
  const geometry = new THREE.PlaneGeometry(50, 50, 100, 100);
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 4; // Tilt back 45%
  mesh.rotation.z = Math.PI / 6;  // Spin 30%
  scene.add(mesh);

  window.addEventListener('resize', handleResize);
  animate();
}

function handleResize() {
  if (!canvasContainer.value || !camera || !renderer) return;
  camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  // Extremely slow delta for a very relaxed, lava-lamp aesthetic
  if (material) material.uniforms.uTime.value += 0.004;
  if (renderer && scene && camera) renderer.render(scene, camera);
}

// Reactivity mapping the Vue props exactly back to the Canvas uniforms
watch(() => props.color1, (val) => { if (material) material.uniforms.uColor1.value.set(val); });
watch(() => props.color2, (val) => { if (material) material.uniforms.uColor2.value.set(val); });
watch(() => props.color3, (val) => { if (material) material.uniforms.uColor3.value.set(val); });

onMounted(() => {
  initWebGL();
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
  if (renderer && canvasContainer.value) {
    canvasContainer.value.removeChild(renderer.domElement);
    renderer.dispose();
  }
  if (material) material.dispose();
  if (mesh && mesh.geometry) mesh.geometry.dispose();
});
</script>

<template>
  <div class="absolute inset-0 z-0  bg-slate-900">
    <!-- WebGL Canvas Anchor -->
    <div ref="canvasContainer" class="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none opacity-100 z-0" style="filter: blur(90px); transform: translate3d(0, 0, 0); will-change: transform;"></div>
    
    <!-- Grain Overlay on top of the Mesh adds tangible realism without requiring PBR shaders -->
    <div class="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none z-10" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
  </div>
</template>

<style scoped>
/* Scoped styles omitted: Filters applied directly to wrapper to ensure dynamically appended <canvas> elements are blurred correctly */
</style>
