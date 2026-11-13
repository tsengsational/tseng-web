<template>
  <main class="project-details pt-32 pb-24 min-h-screen bg-wabi-bg text-wabi-text font-sans">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-[50vh] space-y-3 text-xs text-wabi-muted font-serif italic">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-wabi-border border-t-clay-terracotta"></div>
      <p>Opening project documentation...</p>
    </div>

    <!-- Project Container -->
    <div v-else-if="project" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Wayfinding Bar -->
      <div class="mb-8 flex items-center justify-between border-b border-wabi-border pb-4 text-xs text-wabi-muted">
        <router-link to="/" class="hover:text-clay-terracotta transition-colors flex items-center gap-1.5 font-medium">
          <span>&larr;</span>
          <span>Back to folio</span>
        </router-link>
        <div class="flex items-center gap-2 text-wabi-subtle font-serif italic">
          <span>{{ project.role }}</span>
          <span>•</span>
          <span>{{ project.year || '2025' }}</span>
        </div>
      </div>

      <!-- Header Spec Block -->
      <header class="mb-12 rounded-3xl border border-wabi-border bg-white p-8 sm:p-12 shadow-soft">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="text-xs uppercase tracking-widest font-medium text-clay-terracotta mb-2">
              {{ project.role }} Archive
            </div>
            
            <h1 class="text-3xl sm:text-5xl font-serif text-wabi-text mb-4 leading-tight">
              {{ project.title }}
            </h1>
            
            <p v-if="project.description" class="text-base sm:text-lg text-wabi-muted font-normal leading-relaxed max-w-2xl">
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div v-if="project.tags && project.tags.length > 0" class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="(tagObj, index) in project.tags"
                :key="index"
                class="text-xs px-3 py-1 rounded-full border border-wabi-border bg-wabi-card text-wabi-muted font-medium"
              >
                {{ tagObj?.tags_id?.name || tagObj?.tags_id?.Title || tagObj?.tags_id || tagObj }}
              </span>
            </div>
          </div>

          <!-- External Link Button -->
          <a 
            v-if="project.link" 
            :href="project.link" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="shrink-0 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide bg-wabi-text text-white hover:bg-clay-terracotta transition-colors shadow-sm flex items-center gap-2"
          >
            <span>Visit external work</span>
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <!-- Featured Media Container -->
        <div v-if="imageUrl" class="mt-8 rounded-2xl border border-wabi-border overflow-hidden bg-wabi-card shadow-sm">
          <img :src="imageUrl" :alt="project.title" class="w-full h-auto max-h-[500px] object-cover" />
        </div>
      </header>

      <!-- Content Blocks -->
      <section class="rounded-3xl border border-wabi-border bg-white p-8 sm:p-12 shadow-soft">
        <div v-if="project.content && project.content.blocks && project.content.blocks.length > 0" class="prose max-w-none text-wabi-text">
          <template v-for="(block, index) in project.content.blocks" :key="index">
            <h2 v-if="block.type === 'header'" v-html="block.data.text" class="text-2xl font-serif text-wabi-text mb-4 mt-8 border-b border-wabi-border pb-2"></h2>
            <p v-else-if="block.type === 'paragraph'" v-html="block.data.text" class="text-wabi-muted text-base leading-relaxed mb-6"></p>
            <blockquote v-else-if="block.type === 'quote'" class="border-l-2 border-clay-terracotta pl-6 py-2 my-6 font-serif italic text-xl text-wabi-text">
              <p v-html="block.data.text"></p>
              <footer v-if="block.data.caption" class="text-xs text-wabi-subtle mt-2 not-italic font-sans">— {{ block.data.caption }}</footer>
            </blockquote>
          </template>
        </div>
        <div v-else class="text-center py-12 text-xs text-wabi-subtle font-serif italic">
          <p>Additional notes, sketches, and manuscripts for this work are kept in the studio archive.</p>
        </div>
      </section>

    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-24 text-xs text-wabi-muted font-serif italic">
      <p>Work not found in the current archive.</p>
      <router-link to="/" class="mt-3 inline-block text-clay-terracotta underline underline-offset-4 font-sans">
        Return to main folio &rarr;
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { createDirectus, rest, readItem } from '@directus/sdk';
import { getImageUrl, fetchAllProjects } from '../useDirectus';

const route = useRoute();
const project = ref(null);
const loading = ref(true);

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://127.0.0.1:8055';
const client = createDirectus(DIRECTUS_URL).with(rest());

onMounted(async () => {
  try {
    project.value = await client.request(readItem('projects', route.params.id, {
      fields: ['*', 'tags.tags_id.*']
    }));
  } catch (err) {
    const all = await fetchAllProjects();
    const found = all.find(p => p.id === route.params.id);
    if (found) {
      project.value = found;
    }
  } finally {
    loading.value = false;
  }
});

const imageUrl = computed(() => getImageUrl(project.value?.image));
</script>
