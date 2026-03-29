<template>
  <main class="project-details pt-24 min-h-screen bg-[#f6f6f8] dark:bg-slate-900 text-[#2d2f31] dark:text-slate-50 transition-colors duration-300">
    <div v-if="loading" class="project-details__loading flex flex-col items-center justify-center h-screen space-y-4">
      <div class="project-details__spinner h-16 w-16 animate-spin rounded-full border-4 border-[#e1e2e5] dark:border-slate-800 border-t-[#a20da0] dark:border-t-brand-400"></div>
      <p class="project-details__loading-text animate-pulse font-medium text-[#a20da0] dark:text-brand-400">Accessing the archive...</p>
    </div>

    <div v-else-if="project" class="project-details__container max-w-screen-2xl mx-auto px-6 md:px-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <!-- Hero Section -->
      <header class="project-details__header mb-16">
        <div class="project-details__hero-top flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div class="project-details__titles">
            <span class="project-details__subtitle font-label text-xs uppercase tracking-[0.2em] text-[#a20da0] dark:text-brand-300 mb-4 block">Selected Works</span>
            <h1 class="project-details__title text-5xl md:text-7xl italic font-serif leading-[1.1] text-[#2d2f31] dark:text-slate-50 -ml-1">
              {{ project.title }}
            </h1>
            <div v-if="project.tags && project.tags.length > 0" class="project-details__tags mt-4 flex flex-wrap gap-2">
              <router-link
                v-for="(tagObj, index) in project.tags"
                :key="index"
                :to="{ name: 'TagDetails', params: { id: tagObj?.tags_id?.id || tagObj?.tags_id || 'unknown' } }"
                class="project-details__tag px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm border border-[#a20da0]/20 dark:border-brand-500/20 text-[#a20da0] dark:text-brand-300 text-xs font-semibold tracking-wide uppercase rounded-full hover:bg-[#a20da0] hover:text-white dark:hover:bg-brand-600 dark:hover:text-white hover:shadow-md transition-all cursor-pointer"
              >
                {{ tagObj?.tags_id?.name || tagObj?.tags_id?.Title || tagObj?.tags_id?.title || tagObj?.tags_id?.id || tagObj?.tags_id }}
              </router-link>
            </div>
          </div>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-details__external-link shrink-0 mb-2 inline-flex items-center px-6 py-3 bg-[#a20da0] dark:bg-brand-600 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-[#fc6cf2] dark:hover:bg-brand-500 transition-colors">
            Visit Project 
            <svg class="project-details__link-icon ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div class="project-details__hero-image-wrapper mt-12 relative group overflow-hidden rounded-3xl shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div class="project-details__image-aspect aspect-[21/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img v-if="imageUrl" :src="imageUrl" :alt="project.title" class="project-details__hero-image w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div v-else class="project-details__image-placeholder w-full h-full bg-gradient-to-br from-[#a20da0] to-[#fc6cf2] dark:from-brand-900 dark:to-slate-800 opacity-20"></div>
          </div>
          
          <div v-if="project.description" class="project-details__description-container absolute bottom-8 left-8 right-8 md:right-auto md:max-w-md bg-white/20 dark:bg-slate-900/40 backdrop-blur-2xl bg-gradient-to-br from-white/50 to-white/10 dark:from-slate-800/80 dark:to-slate-900/30 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/40 dark:border-slate-700 border-t-white/80 dark:border-t-slate-600 border-l-white/80 dark:border-l-slate-600 transition-transform duration-700">
            <p class="project-details__description text-slate-800 dark:text-slate-100 font-medium text-lg leading-relaxed drop-shadow-sm">{{ project.description }}</p>
          </div>
        </div>
      </header>

      <!-- Content Bento Grid -->
      <section class="project-details__content grid grid-cols-1 gap-8">
        <div class="project-details__bento-card bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/60 dark:border-slate-700">
          <div v-if="project.content && project.content.blocks && project.content.blocks.length > 0" class="project-details__prose prose max-w-none dark:prose-invert">
            <template v-for="(block, index) in project.content.blocks" :key="index">
              <h1 v-if="block.type === 'header' && block.data.level === 1" v-html="block.data.text" class="project-details__heading-1 text-4xl italic font-serif mb-6 text-[#2d2f31] dark:text-slate-50"></h1>
              <h2 v-else-if="block.type === 'header' && block.data.level === 2" v-html="block.data.text" class="project-details__heading-2 text-3xl italic font-serif mb-6 text-[#2d2f31] dark:text-slate-100"></h2>
              <h3 v-else-if="block.type === 'header' && block.data.level === 3" v-html="block.data.text" class="project-details__heading-3 text-2xl font-semibold mb-4 text-[#2d2f31] dark:text-slate-200"></h3>
              <p v-else-if="block.type === 'paragraph'" v-html="block.data.text" class="project-details__paragraph text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-6"></p>
              <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'" class="project-details__list project-details__list--unordered list-disc list-inside text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-6 space-y-2">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item" class="project-details__list-item text-[#2d2f31] dark:text-slate-300"></li>
              </ul>
              <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'" class="project-details__list project-details__list--ordered list-decimal list-inside text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-6 space-y-2">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item" class="project-details__list-item text-[#2d2f31] dark:text-slate-300"></li>
              </ol>
              <div v-else-if="block.type === 'image'" class="project-details__content-image-wrapper my-10 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img :src="getImageUrl(block.data.file?.url)" :alt="block.data.caption" class="project-details__content-image w-full h-auto object-cover" />
                <p v-if="block.data.caption" class="project-details__caption text-sm text-center text-slate-400 dark:text-slate-500 mt-4 mb-4 italic px-4">{{ block.data.caption }}</p>
              </div>
              <blockquote v-else-if="block.type === 'quote'" class="project-details__quote border-l-[6px] border-[#a20da0] dark:border-brand-500 pl-8 py-4 my-10 bg-gradient-to-r from-slate-50 dark:from-slate-800/50 to-transparent italic text-2xl text-slate-700 dark:text-slate-300 rounded-r-3xl">
                <p v-html="block.data.text" class="project-details__quote-text mb-2 font-serif leading-relaxed"></p>
                <footer v-if="block.data.caption" class="project-details__quote-footer text-sm text-[#a20da0] dark:text-brand-400 font-bold uppercase tracking-widest mt-4">— {{ block.data.caption }}</footer>
              </blockquote>
              <div v-else-if="block.type === 'delimiter'" class="project-details__delimiter my-12 flex justify-center text-[#a20da0] dark:text-brand-500 text-3xl opacity-50 dark:opacity-30">✦ ✦ ✦</div>
            </template>
          </div>
          <div v-else class="project-details__empty-state flex flex-col items-center justify-center py-20 opacity-50 dark:opacity-30">
            <div class="project-details__empty-icon text-[#a20da0] dark:text-brand-400 mb-4 text-4xl">✦</div>
            <p class="project-details__empty-text text-slate-500 dark:text-slate-400 italic text-lg font-serif">Project documentation is currently being archived.</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { createDirectus, rest, readItem } from '@directus/sdk';
import { getImageUrl } from '../useDirectus';

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
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const imageUrl = computed(() => getImageUrl(project.value?.image));
</script>
