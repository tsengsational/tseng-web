<template>
  <section class="py-12">
    <div class="mb-12 flex items-center justify-between gap-6">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">{{ role }} Collection</h2>
      <div class="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
    </div>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <div v-if="projects.length === 0" class="text-center py-16 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
      <p class="text-slate-500 font-medium">No featured projects found for this role at the moment.</p>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue';

defineProps({
  role: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    required: true
  }
});
</script>
