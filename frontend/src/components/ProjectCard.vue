<template>
  <div class="project-card group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-800/80 backdrop-blur-sm shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-brand-500/20 hover:bg-white dark:hover:bg-slate-800 flex flex-col h-full">
    <div class="project-card__thumbnail-container aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
      <img v-if="imageUrl" :src="imageUrl" :alt="project.title" class="project-card__thumbnail h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div v-else class="project-card__placeholder flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 dark:from-brand-900 via-white dark:via-slate-800 to-brand-50 dark:to-slate-800 text-brand-900 dark:text-brand-200 overflow-hidden relative">
        <div class="project-card__placeholder-overlay absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-300 dark:from-brand-600 to-transparent blur-md"></div>
        <svg class="project-card__placeholder-icon h-16 w-16 opacity-40 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    <div class="project-card__content p-6 flex flex-col flex-grow">
      <h3 class="project-card__title text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 leading-tight">{{ project.title }}</h3>
      <p class="project-card__description text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 flex-grow">{{ project.description }}</p>

      <div v-if="project.tags && project.tags.length > 0" class="project-card__tags-container flex flex-wrap gap-2 mb-4">
        <span 
          v-for="t in project.tags" 
          :key="t.tags_id.name" 
          class="project-card__tag text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-600/50"
        >
          {{ t.tags_id.name }}
        </span>
      </div>

      <router-link :to="{ name: 'ProjectDetails', params: { id: project.id } }" class="project-card__link inline-flex w-fit items-center text-sm font-semibold text-brand-600 dark:text-brand-400 transition-colors hover:text-brand-800 dark:hover:text-brand-300">
        See More
        <svg class="project-card__link-icon ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getImageUrl } from '../useDirectus';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  }
});

const imageUrl = computed(() => getImageUrl(props.project.image));
</script>
