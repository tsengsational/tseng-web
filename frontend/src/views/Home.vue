<template>
  <section>
    <HeroSection />
    
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 -mt-16 sm:-mt-24 relative z-10">
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-6 sm:p-12 md:p-16 border border-white/60">
        <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
          <div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-100 border-t-brand-500 shadow-sm"></div>
          <p class="text-slate-500 font-medium animate-pulse">Loading amazing projects...</p>
        </div>
        <div v-else-if="error" class="text-center py-32">
          <p class="text-red-500 font-medium">{{ error }}</p>
        </div>
        <div v-else class="space-y-16 sm:space-y-24">
          <RoleSection role="Writer" :projects="writerProjects" />
          <RoleSection role="Artist" :projects="artistProjects" />
          <RoleSection role="Coder" :projects="coderProjects" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import RoleSection from '../components/RoleSection.vue';
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
