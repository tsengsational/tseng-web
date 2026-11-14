<template>
  <header class="hero relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Tactile Wabi-Sabi Paper Sheet with Soft Shadow and Fibrous Texture -->
    <div class="relative rounded-3xl border border-wabi-border bg-white/80 backdrop-blur-md p-8 sm:p-14 md:p-16 overflow-hidden shadow-wabi">
      
      <!-- Three.js Ambient Fluid Watercolor Wash -->
      <div class="absolute inset-0 z-0 opacity-80 pointer-events-none" aria-hidden="true">
        <AnimatedMeshGradient 
          :color1="shaderColors.color1"
          :color2="shaderColors.color2"
          :color3="shaderColors.color3"
        />
      </div>

      <!-- Human-Centered Content -->
      <div class="relative z-10 flex flex-col items-center text-center">

        <!-- Tactile Organic Avatar Viewport -->
        <div class="relative mb-8 group">
          <div class="relative p-1.5 rounded-full bg-wabi-card border border-wabi-border shadow-soft transition-transform duration-500 ease-out group-hover:scale-105">
            <img 
              src="/headshot.png" 
              alt="Jason Tseng portrait" 
              class="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover filter contrast-[1.02] sepia-[0.08]"
              onerror="this.src='https://ui-avatars.com/api/?name=Jason+Tseng&background=f4ede2&color=2c2825&size=300&font-size=0.33'" 
            />
          </div>
        </div>

        <!-- Warm Literary Heading -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-wabi-text mb-6 leading-[1.08] drop-shadow-sm">
          Jason Tseng
        </h1>

        <!-- Warm Poetic Bio (White with warm drop shadow to pop over the wash) -->
        <p class="max-w-2xl text-lg sm:text-xl text-pop-light font-sans font-medium leading-relaxed mb-10">
          Writer, artist, and creative technologist exploring human memory, diaspora narratives, and tactile digital crafts with care and quiet intention.
        </p>

        <!-- Tactile Triad Filter Pills (Warm Terracotta / Ocher / Sage) -->
        <div class="w-full max-w-2xl mb-10">
          <div class="text-xs uppercase tracking-widest text-pop-subtle font-semibold mb-3">
            Explore by craft
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <!-- Writer -->
            <button 
              type="button"
              @click="setDiscipline('Writer')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative backdrop-blur-sm',
                activeDiscipline === 'Writer' 
                  ? 'bg-clay-terracotta/25 border-clay-terracotta text-white shadow-md' 
                  : 'bg-white/40 border-wabi-border/80 hover:border-clay-terracotta/60 hover:bg-white/60 text-white shadow-sm'
              ]"
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-base font-serif font-medium text-pop-light">Writer</span>
                <span class="h-2.5 w-2.5 rounded-full bg-clay-terracotta shadow-[0_0_8px_rgba(200,90,56,0.6)]"></span>
              </div>
              <p class="text-xs text-pop-subtle leading-relaxed line-clamp-2">
                Plays, Fiction, and cultural essays.
              </p>
            </button>

            <!-- Artist -->
            <button 
              type="button"
              @click="setDiscipline('Artist')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative backdrop-blur-sm',
                activeDiscipline === 'Artist' 
                  ? 'bg-clay-ocher/25 border-clay-ocher text-white shadow-md' 
                  : 'bg-white/40 border-wabi-border/80 hover:border-clay-ocher/60 hover:bg-white/60 text-white shadow-sm'
              ]"
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-base font-serif font-medium text-pop-light">Artist</span>
                <span class="h-2.5 w-2.5 rounded-full bg-clay-ocher shadow-[0_0_8px_rgba(212,136,51,0.6)]"></span>
              </div>
              <p class="text-xs text-pop-subtle leading-relaxed line-clamp-2">
                Illustration, Printmaking, Fiber Arts, Ceramics, and more.
              </p>
            </button>

            <!-- Coder -->
            <button 
              type="button"
              @click="setDiscipline('Coder')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative backdrop-blur-sm',
                activeDiscipline === 'Coder' 
                  ? 'bg-clay-sage/25 border-clay-sage text-white shadow-md' 
                  : 'bg-white/40 border-wabi-border/80 hover:border-clay-sage/60 hover:bg-white/60 text-white shadow-sm'
              ]"
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-base font-serif font-medium text-pop-light">Coder</span>
                <span class="h-2.5 w-2.5 rounded-full bg-clay-sage shadow-[0_0_8px_rgba(74,107,74,0.6)]"></span>
              </div>
              <p class="text-xs text-pop-subtle leading-relaxed line-clamp-2">
                Creative tools, Interactive experiences, and web experiments.
              </p>
            </button>

          </div>

          <!-- Reset Filter -->
          <div v-if="activeDiscipline !== 'all'" class="mt-3.5 text-center">
            <button 
              type="button"
              @click="setDiscipline('all')"
              class="text-xs text-pop-subtle hover:text-white underline underline-offset-4 transition-colors font-medium"
            >
              View all works together
            </button>
          </div>
        </div>

        <!-- Gentle Actions -->
        <div class="flex flex-wrap justify-center items-center gap-3.5 mb-8">
          <button 
            type="button"
            @click="scrollToWorks" 
            class="px-6 py-2.5 rounded-full text-sm font-medium bg-wabi-text text-white hover:bg-clay-terracotta transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Browse Selected Works</span>
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <router-link 
            :to="{ name: 'Contact' }" 
            class="px-6 py-2.5 rounded-full text-sm font-medium border border-wabi-border bg-white hover:border-wabi-text text-wabi-text transition-colors shadow-sm"
          >
            Say Hello
          </router-link>
        </div>

        <!-- Social Connections -->
        <SocialLinks class="mt-2" />

      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import AnimatedMeshGradient from './AnimatedMeshGradient.vue';
import SocialLinks from './SocialLinks.vue';

const props = defineProps({
  activeDiscipline: {
    type: String,
    default: 'all'
  }
});

const emit = defineEmits(['update:discipline']);

function setDiscipline(role) {
  emit('update:discipline', role === props.activeDiscipline ? 'all' : role);
}

function scrollToWorks() {
  const el = document.getElementById('works-archive');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Richer, higher-contrast earth & sumi tones for visible Suminagashi marbling
const shaderColors = computed(() => {
  switch (props.activeDiscipline) {
    case 'Writer':
      return {
        color1: '#fdf9f4', // Warm unbleached paper ground
        color2: '#c85a38', // Rich fired terracotta
        color3: '#36241e'  // Deep soot sumi ink
      };
    case 'Artist':
      return {
        color1: '#fdfaf2', // Warm washi
        color2: '#d48833', // Deep golden raw ocher
        color3: '#30291f'  // Umber woodcut ink
      };
    case 'Coder':
      return {
        color1: '#f8faf7', // Crisp herbal paper
        color2: '#4a6b4a', // Forest lichen / matcha
        color3: '#1e2d21'  // Deep pine sumi
      };
    default:
      return {
        color1: '#fcf7f0', // Natural linen ground
        color2: '#be6b4f', // Warm clay terracotta
        color3: '#2a2220'  // Sumi charcoal ink
      };
  }
});
</script>
