<template>
  <div class="tag-view pt-24 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
    <div class="tag-view__header mb-12">
      <h1 class="tag-view__title text-5xl md:text-7xl italic font-serif leading-[1.1] text-[#2d2f31] dark:text-slate-50 bg-clip-text text-transparent bg-gradient-to-r from-[#a20da0] dark:from-brand-300 to-[#fc6cf2] dark:to-brand-500">
        Tag: {{ tagData?.name || tagData?.Title || tagData?.title || tagId }}
      </h1>
      <p class="tag-view__description mt-4 text-xl text-slate-600 dark:text-slate-300 font-medium">Archived projects associated with this signature tag.</p>
    </div>
    
    <div v-if="loading" class="tag-view__loading flex flex-col items-center justify-center py-32 space-y-4">
      <div class="tag-view__spinner h-16 w-16 animate-spin rounded-full border-4 border-[#e1e2e5] dark:border-slate-800 border-t-[#a20da0] dark:border-t-brand-400"></div>
      <p class="tag-view__loading-text animate-pulse font-medium text-[#a20da0] dark:text-brand-400">Indexing tagged items...</p>
    </div>
    
    <div v-else class="tag-view__grid grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" class="tag-view__card" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProjectCard from '../components/ProjectCard.vue';
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

const route = useRoute();
const tagId = ref(route.params.id);
const tagData = ref(null);
const projects = ref([]);
const loading = ref(true);

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
const client = createDirectus(DIRECTUS_URL).with(rest());

const load = async () => {
  loading.value = true;
  try {
    try {
      tagData.value = await client.request(readItem('tags', tagId.value));
    } catch {
      tagData.value = null;
    }
    
    const response = await client.request(readItems('projects', {
      filter: {
        tags: {
          tags_id: { _eq: tagId.value }
        }
      },
      fields: ['*']
    }));
    projects.value = response;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(load);
watch(() => route.params.id, (newId) => {
  tagId.value = newId;
  load();
});
</script>
