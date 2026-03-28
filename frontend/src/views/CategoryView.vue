<template>
  <div class="pt-24 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
    <div class="mb-12">
      <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-900">
        {{ role }} Portfolio
      </h1>
      <p class="mt-4 text-xl text-slate-600 font-medium">Detailed collection of my latest work as a {{ role.toLowerCase() }}.</p>
    </div>
    
    <div v-if="loading" class="flex items-center justify-center py-32">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-brand-500"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFeaturedProjects } from '../useDirectus';
import ProjectCard from '../components/ProjectCard.vue';

const route = useRoute();
const role = ref(route.params.role);
const projects = ref([]);
const loading = ref(true);

const load = async () => {
  loading.value = true;
  const all = await fetchFeaturedProjects();
  projects.value = all.filter(p => p.role === role.value);
  loading.value = false;
};

onMounted(load);
watch(() => route.params.role, (newRole) => {
  role.value = newRole;
  load();
});
</script>
