<template>
  <section class="role-section py-12">
    <div class="role-section__header mb-12 flex items-center justify-between gap-6">
      <router-link :to="{ name: 'Category', params: { role: role } }" class="role-section__link">
        <h2 class="role-section__title text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-50 dark:to-slate-300">{{ role }} Projects</h2>
      </router-link>
      <div class="role-section__divider h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent"></div>
    </div>
    <div class="role-section__grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" class="role-section__card" />
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
