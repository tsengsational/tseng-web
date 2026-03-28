<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
    <div class="max-w-7xl mx-auto xl:px-8">
      <HeroSection />
      
      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 -mt-16 sm:-mt-24 relative z-10 transition-all duration-500">
        <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-12 md:p-16 border border-white/60">
          <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
            <div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-brand-500 shadow-sm"></div>
            <p class="text-slate-500 font-medium animate-pulse">Loading amazing projects...</p>
          </div>
          <div v-else-if="error" class="text-center py-32">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Connection Error</h3>
            <p class="text-slate-500 max-w-md mx-auto">{{ error }}</p>
          </div>
          <div v-else class="space-y-16 sm:space-y-24">
            <RoleSection role="Writer" :projects="writerProjects" />
            <RoleSection role="Artist" :projects="artistProjects" />
            <RoleSection role="Coder" :projects="coderProjects" />
          </div>
        </div>
      </main>
    </div>
    
    <footer class="bg-white border-t border-slate-200">
      <div class="mx-auto max-w-7xl px-6 py-12 flex flex-col items-center justify-between gap-6 lg:px-8 sm:flex-row">
        <p class="text-center text-sm leading-5 text-slate-500 font-medium">
          &copy; {{ new Date().getFullYear() }} Jason Tseng. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm font-medium text-brand-600">
          <a href="#" class="hover:text-brand-900 transition-colors">Twitter</a>
          <a href="#" class="hover:text-brand-900 transition-colors">GitHub</a>
          <a href="#" class="hover:text-brand-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeroSection from './components/HeroSection.vue';
import RoleSection from './components/RoleSection.vue';
import { fetchFeaturedProjects } from './useDirectus';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    projects.value = await fetchFeaturedProjects();
  } catch (err) {
    error.value = 'Failed to load projects. Please ensure the Directus server is running and accessible.';
  } finally {
    loading.value = false;
  }
});

const writerProjects = computed(() => projects.value.filter(p => p.role === 'Writer'));
const artistProjects = computed(() => projects.value.filter(p => p.role === 'Artist'));
const coderProjects = computed(() => projects.value.filter(p => p.role === 'Coder'));
</script>
