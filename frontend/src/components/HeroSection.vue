<template>
  <header class="hero relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <!-- Tactile Wabi-Sabi Paper Sheet with Soft Shadow and Fibrous Texture -->
    <div class="relative rounded-3xl border border-wabi-border bg-white/80 backdrop-blur-md p-8 sm:p-14 md:p-16 overflow-hidden shadow-wabi">
      
      <!-- Three.js Ambient Fluid Watercolor Wash -->
      <div class="absolute inset-0 z-0 opacity-40 pointer-events-none" aria-hidden="true">
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
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-wabi-text mb-6 leading-[1.08]">
          Jason Tseng
        </h1>

        <!-- Warm Poetic Bio -->
        <p class="max-w-2xl text-lg sm:text-xl text-wabi-muted font-sans font-normal leading-relaxed mb-10">
          Writer, artist, and creative technologist exploring human memory, diaspora narratives, and tactile digital crafts with care and quiet intention.
        </p>

        <!-- Tactile Triad Filter Pills (Warm Terracotta / Ocher / Sage) -->
        <div class="w-full max-w-2xl mb-10">
          <div class="text-xs uppercase tracking-widest text-wabi-subtle font-medium mb-3">
            Explore by craft
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <!-- Writer -->
            <button 
              type="button"
              @click="setDiscipline('Writer')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative',
                activeDiscipline === 'Writer' 
                  ? 'bg-clay-terracotta/10 border-clay-terracotta text-wabi-text shadow-sm' 
                  : 'bg-wabi-card/50 border-wabi-border hover:border-clay-terracotta/40 hover:bg-white text-wabi-muted'
              ]"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-serif font-medium text-wabi-text">Writer</span>
                <span class="h-2 w-2 rounded-full bg-clay-terracotta opacity-70"></span>
              </div>
              <p class="text-xs text-wabi-muted leading-relaxed line-clamp-2">
                Plays, Fiction, and cultural essays.
              </p>
            </button>

            <!-- Artist -->
            <button 
              type="button"
              @click="setDiscipline('Artist')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative',
                activeDiscipline === 'Artist' 
                  ? 'bg-clay-ocher/10 border-clay-ocher text-wabi-text shadow-sm' 
                  : 'bg-wabi-card/50 border-wabi-border hover:border-clay-ocher/40 hover:bg-white text-wabi-muted'
              ]"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-serif font-medium text-wabi-text">Artist</span>
                <span class="h-2 w-2 rounded-full bg-clay-ocher opacity-70"></span>
              </div>
              <p class="text-xs text-wabi-muted leading-relaxed line-clamp-2">
                Illustration, Printmaking, Fiber Arts, Ceramics, and more.
              </p>
            </button>

            <!-- Coder -->
            <button 
              type="button"
              @click="setDiscipline('Coder')"
              :class="[
                'p-4 rounded-2xl border transition-all duration-300 text-left relative',
                activeDiscipline === 'Coder' 
                  ? 'bg-clay-sage/10 border-clay-sage text-wabi-text shadow-sm' 
                  : 'bg-wabi-card/50 border-wabi-border hover:border-clay-sage/40 hover:bg-white text-wabi-muted'
              ]"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-serif font-medium text-wabi-text">Coder</span>
                <span class="h-2 w-2 rounded-full bg-clay-sage opacity-70"></span>
              </div>
              <p class="text-xs text-wabi-muted leading-relaxed line-clamp-2">
                Creative tools, Interactive experiences, and web experiments.
              </p>
            </button>

          </div>

          <!-- Reset Filter -->
          <div v-if="activeDiscipline !== 'all'" class="mt-3 text-center">
            <button 
              type="button"
              @click="setDiscipline('all')"
              class="text-xs text-wabi-subtle hover:text-clay-terracotta underline underline-offset-4 transition-colors"
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

// Organic warm watercolor tones shifting smoothly with the active craft
const shaderColors = computed(() => {
  switch (props.activeDiscipline) {
    case 'Writer':
      return {
        color1: '#f8f1ea', // Warm terracotta wash
        color2: '#ecdacf', // Soft earth
        color3: '#e4d3c3'  // Raw clay
      };
    case 'Artist':
      return {
        color1: '#faf3e5', // Warm ocher sunlight
        color2: '#efe3cd', // Raw paper
        color3: '#e5d3b6'  // Warm sand
      };
    case 'Coder':
      return {
        color1: '#f2f5f1', // Lichen / pale sage
        color2: '#e5ebe3', // Soft green tea
        color3: '#d6dfd3'  // Muted olive
      };
    default:
      return {
        color1: '#f7f2eb', // Warm oatmeal
        color2: '#eee5d8', // Washi fiber
        color3: '#e5dcce'  // Clay stone
      };
  }
});
</script>
