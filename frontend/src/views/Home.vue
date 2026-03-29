<template>
  <section class="home">
    <HeroSection class="home__hero" />
    
    <main class="home__main mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 -mt-16 sm:-mt-24 relative z-10">
      <div class="home__container bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-12 md:p-16 border border-white/60 dark:border-slate-700 transition-colors duration-300">
        <div v-if="loading" class="home__loading flex flex-col items-center justify-center py-32 space-y-4">
          <div class="home__spinner h-16 w-16 animate-spin rounded-full border-4 border-slate-100 dark:border-slate-700 border-t-brand-500 dark:border-t-brand-400 shadow-sm"></div>
          <p class="home__loading-text text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading amazing projects...</p>
        </div>
        <div v-else-if="error" class="home__error text-center py-32">
          <p class="home__error-message text-red-500 dark:text-red-400 font-medium">{{ error }}</p>
        </div>
        <div v-else class="home__roles space-y-16 sm:space-y-24">
          <RoleSection role="Writer" :projects="writerProjects" class="home__role-section" />
          <RoleSection role="Artist" :projects="artistProjects" class="home__role-section" />
          <RoleSection role="Coder" :projects="coderProjects" class="home__role-section" />
          
          <div class="home__divider h-px bg-slate-200/60 dark:bg-slate-700/60 w-full my-8"></div>
          
          <Blogroll substackUrl="https://jasontseng.substack.com/feed" class="home__blogroll" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import RoleSection from '../components/RoleSection.vue';
import Blogroll from '../components/Blogroll.vue';
import { fetchFeaturedProjects } from '../useDirectus';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    projects.value = await fetchFeaturedProjects();
  } catch (err) {
    error.value = 'Check your connection or start your local database.';
  } finally {
    loading.value = false;
  }
});

const writerProjects = computed(() => projects.value.filter(p => p.role === 'Writer'));
const artistProjects = computed(() => projects.value.filter(p => p.role === 'Artist'));
const coderProjects = computed(() => projects.value.filter(p => p.role === 'Coder'));
</script>
