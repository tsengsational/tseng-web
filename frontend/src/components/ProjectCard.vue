<template>
  <div class="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm shadow-md border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white flex flex-col h-full">
    <div class="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
      <img v-if="imageUrl" :src="imageUrl" :alt="project.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 via-white to-brand-50 text-brand-900 overflow-hidden relative">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-300 to-transparent blur-md"></div>
        <svg class="h-16 w-16 opacity-40 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-slate-900 mb-2 leading-tight">{{ project.title }}</h3>
      <p class="text-sm text-slate-600 line-clamp-3 mb-6 flex-grow">{{ project.description }}</p>
      <router-link :to="{ name: 'ProjectDetails', params: { id: project.id } }" class="inline-flex w-fit items-center text-sm font-semibold text-brand-600 transition-colors hover:text-brand-800">
        View Project
        <svg class="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
