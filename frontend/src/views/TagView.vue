<template>
  <div class="tag-view pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header with Restraint -->
    <div class="mb-12 border-b border-wabi-border pb-8">
      <div class="text-xs uppercase tracking-widest font-medium text-clay-terracotta mb-2">
        Index & Tag
      </div>
      
      <h1 class="text-3xl sm:text-5xl font-serif text-wabi-text mb-4">
        {{ tagData?.name || tagData?.Title || tagData?.title || tagId }}
      </h1>
      
      <p class="text-base text-wabi-muted font-normal max-w-2xl leading-relaxed">
        Selected works and artifacts organized under this focus.
      </p>

      <div class="mt-4 flex items-center gap-3 text-xs text-wabi-subtle">
        <router-link to="/" class="hover:text-clay-terracotta transition-colors flex items-center gap-1 font-medium">
          &larr; Return to main folio
        </router-link>
        <span>•</span>
        <span>{{ projects.length }} {{ projects.length === 1 ? 'work' : 'works' }}</span>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-28 text-xs text-wabi-muted font-serif italic space-y-3">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-wabi-border border-t-clay-terracotta"></div>
      <p>Gathering tagged works...</p>
    </div>
    
    <!-- Grid -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProjectCard from '../components/ProjectCard.vue';
import { createDirectus, rest, readItems, readItem } from '@directus/sdk';
import { fetchAllProjects } from '../useDirectus';

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
    const all = await fetchAllProjects();
    projects.value = all.filter(p => p.tags && p.tags.some(t => {
      const name = t.tags_id?.name || t.tags_id || t;
      return String(name).toLowerCase() === String(tagId.value).toLowerCase();
    }));
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
