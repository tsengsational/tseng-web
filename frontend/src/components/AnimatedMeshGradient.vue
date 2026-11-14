<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  color1: {
    type: String,
    default: '#fdf9f3' // Cream linen ground
  },
  color2: {
    type: String,
    default: '#d97d5a' // Warm rich terracotta
  },
  color3: {
    type: String,
    default: '#2c2523' // Deep sumi soot ink
  }
});

const canvasContainer = ref(null);

function parseColor(hex) {
  return new THREE.Color(hex);
}

// Suminagashi: Continuous natural marbling ripples + interactive cursor waves
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  varying float vWave;
  varying float vRipples;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseSpeed;

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
    vec3 normalizedPos = position * 0.055;
    float t = uTime * 0.45;
    
    // 1. Autonomous concentric water ripples propagating across the surface
    vec2 c1 = vec2(0.3, 0.4);
    vec2 c2 = vec2(0.7, 0.6);
    float d1 = length((uv - c1) * vec2(1.4, 1.0));
    float d2 = length((uv - c2) * vec2(1.2, 1.0));
    float autoRipple = sin(d1 * 14.0 - t * 2.0) * 0.5 + cos(d2 * 12.0 - t * 1.5) * 0.5;
    vRipples = autoRipple;

    // 2. Large organic flowing simplex noise
    float ambientNoise = cnoise(normalizedPos + vec3(t * 0.4, t * 0.3, t * 0.2));
    
    // 3. Interactive pointer ripples
    vec2 diff = (uv - uMouse) * vec2(1.35, 1.0);
    float mouseD = length(diff);
    float mouseInfluence = exp(-mouseD * 3.2);
    float mouseWave = sin(mouseD * 22.0 - t * 4.0) * mouseInfluence * (0.8 + min(uMouseSpeed * 2.2, 1.8));
    vWave = mouseWave;

    // Combine autonomous water currents and mouse waves for rich tactile motion
    vec3 pos = position + normal * (ambientNoise * 4.0 + autoRipple * 2.5 + mouseWave * 6.5);
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// High-contrast Wabi-Sabi Marbled Pigment Shader
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  varying float vWave;
  varying float vRipples;
  
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uMouse;
  uniform float uMouseSpeed;
  uniform float uTime;

  void main() {
    vec2 diff = (vUv - uMouse) * vec2(1.35, 1.0);
    float d = length(diff);
    
    // Swirling marbling distortion around mouse
    float swirlAngle = exp(-d * 3.0) * (1.0 + uMouseSpeed * 2.0);
    mat2 rot = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
    vec2 swirledDiff = rot * diff;

    // Dynamic Suminagashi ink veins responding to ripples and time
    float inkVein = sin((vUv.x * 6.0 + vUv.y * 5.0) + vRipples * 2.0 + vWave * 4.0 + uTime * 0.3);
    inkVein = smoothstep(-0.4, 0.8, inkVein);

    // Sharp, crisp contrast mixing between paper ground (Color 1), earth tone (Color 2), and sumi accent (Color 3)
    float baseGrad = smoothstep(-10.0, 12.0, vPos.x + swirledDiff.x * 12.0);
    float rippleGrad = smoothstep(-0.8, 1.2, vWave * 1.5 + vRipples * 0.8);
    
    // Color 1: Soft paper ground
    // Color 2: Rich earth tone (terracotta / ocher / sage)
    // Color 3: Deep sumi charcoal accent
    vec3 tone = mix(uColor1, uColor2, baseGrad * 0.85 + rippleGrad * 0.35);
    
    // Marbled ink streak definition
    float inkStreak = exp(-d * 3.5) * (0.3 + uMouseSpeed * 0.5) + (1.0 - inkVein) * 0.22;
    vec3 finalColor = mix(tone, uColor3, clamp(inkStreak, 0.0, 0.85));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

let scene, camera, renderer, material, mesh, animationId;

const targetMouse = { x: 0.5, y: 0.5 };
const currentMouse = { x: 0.5, y: 0.5 };
let targetSpeed = 0;
let currentSpeed = 0;
let lastPointerTime = 0;

function handlePointerMove(e) {
  if (!canvasContainer.value) return;
  const rect = canvasContainer.value.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const nx = (clientX - rect.left) / rect.width;
  const ny = 1.0 - (clientY - rect.top) / rect.height;

  const now = performance.now();
  const dt = Math.max(now - lastPointerTime, 16);
  lastPointerTime = now;

  const dx = nx - targetMouse.x;
  const dy = ny - targetMouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  targetSpeed = Math.min((dist / (dt / 1000)) * 0.25, 2.0);

  targetMouse.x = Math.max(-0.2, Math.min(1.2, nx));
  targetMouse.y = Math.max(-0.2, Math.min(1.2, ny));
}

function handlePointerLeave() {
  targetSpeed = 0;
}

function initWebGL() {
  if (!canvasContainer.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 100);
  camera.position.z = 18;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.value.appendChild(renderer.domElement);

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseSpeed: { value: 0 },
      uColor1: { value: parseColor(props.color1) },
      uColor2: { value: parseColor(props.color2) },
      uColor3: { value: parseColor(props.color3) }
    },
    wireframe: false
  });

  const geometry = new THREE.PlaneGeometry(50, 50, 75, 75);
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 4;
  mesh.rotation.z = Math.PI / 8;
  scene.add(mesh);

  window.addEventListener('mousemove', handlePointerMove, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
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

  currentMouse.x += (targetMouse.x - currentMouse.x) * 0.085;
  currentMouse.y += (targetMouse.y - currentMouse.y) * 0.085;
  
  targetSpeed *= 0.92;
  currentSpeed += (targetSpeed - currentSpeed) * 0.1;

  if (material) {
    material.uniforms.uTime.value += 0.005; // Slightly faster natural ripple current
    material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
    material.uniforms.uMouseSpeed.value = currentSpeed;
  }

  if (renderer && scene && camera) renderer.render(scene, camera);
}

watch(() => props.color1, (val) => { if (material) material.uniforms.uColor1.value.set(val); });
watch(() => props.color2, (val) => { if (material) material.uniforms.uColor2.value.set(val); });
watch(() => props.color3, (val) => { if (material) material.uniforms.uColor3.value.set(val); });

onMounted(() => {
  initWebGL();
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('mousemove', handlePointerMove);
  window.removeEventListener('touchmove', handlePointerMove);
  window.removeEventListener('mouseleave', handlePointerLeave);
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
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
    <!-- Refined 12px blur keeps the fluid water ripples and marbling ink lines crisp and vivid -->
    <div 
      ref="canvasContainer" 
      class="absolute inset-[-8%] w-[116%] h-[116%] pointer-events-none opacity-90 transition-opacity duration-700" 
      style="filter: blur(12px); will-change: transform;"
    ></div>
    
    <!-- Organic tactile paper noise overlay -->
    <div 
      class="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none" 
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"
    ></div>
  </div>
</template>
