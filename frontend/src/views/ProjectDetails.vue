<template>
  <main class="pt-24 min-h-screen bg-[#f6f6f8] text-[#2d2f31]">
    <div v-if="loading" class="flex flex-col items-center justify-center h-screen space-y-4">
      <div class="h-16 w-16 animate-spin rounded-full border-4 border-[#e1e2e5] border-t-[#a20da0]"></div>
      <p class="animate-pulse font-medium text-[#a20da0]">Accessing the archive...</p>
    </div>

    <div v-else-if="project" class="max-w-screen-2xl mx-auto px-6 md:px-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <!-- Hero Section -->
      <header class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div class="lg:col-span-8">
            <span class="font-label text-xs uppercase tracking-[0.2em] text-[#a20da0] mb-4 block">Selected Works — {{ project.role }}</span>
            <h1 class="text-5xl md:text-7xl italic font-serif leading-[1.1] text-[#2d2f31] -ml-1">
              {{ project.title }}
            </h1>
          </div>
          <div class="lg:col-span-4 pb-2">
            <p class="text-slate-500 text-lg leading-relaxed">
              {{ project.description }}
            </p>
          </div>
        </div>

        <div class="mt-12 relative group overflow-hidden rounded-3xl shadow-2xl">
          <div class="aspect-[21/9] w-full overflow-hidden bg-slate-200">
            <img v-if="imageUrl" :src="imageUrl" :alt="project.title" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div v-else class="w-full h-full bg-gradient-to-br from-[#a20da0] to-[#fc6cf2] opacity-20"></div>
          </div>
          <div class="absolute bottom-8 left-8 bg-white/85 backdrop-blur-2xl p-6 rounded-2xl max-w-sm shadow-xl border border-white/40">
            <p class="italic text-xl text-[#2d2f31] font-serif">"Where the ghost in the machine meets the precision of the grid."</p>
          </div>
        </div>
      </header>

      <!-- Content Bento Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-3 space-y-12">
          <div>
            <h3 class="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Project Roles</h3>
            <ul class="space-y-3 font-medium text-sm">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#a20da0]"></span>
                Lead Creative Technologist
              </li>
              <li class="flex items-center gap-2 text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                UI/UX Strategy
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Tools & Craft</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-white text-xs font-semibold rounded-full shadow-sm border border-slate-100">Directus</span>
              <span class="px-3 py-1 bg-white text-xs font-semibold rounded-full shadow-sm border border-slate-100">Vue 3</span>
              <span class="px-3 py-1 bg-white text-xs font-semibold rounded-full shadow-sm border border-slate-100">Tailwind</span>
            </div>
          </div>
        </aside>

        <div class="lg:col-span-9 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/60">
          <div v-if="project.content && project.content.blocks && project.content.blocks.length > 0" class="prose max-w-none">
            <template v-for="(block, index) in project.content.blocks" :key="index">
              <h1 v-if="block.type === 'header' && block.data.level === 1" v-html="block.data.text" class="text-4xl italic font-serif mb-6 text-[#2d2f31]"></h1>
              <h2 v-else-if="block.type === 'header' && block.data.level === 2" v-html="block.data.text" class="text-3xl italic font-serif mb-6 text-[#2d2f31]"></h2>
              <h3 v-else-if="block.type === 'header' && block.data.level === 3" v-html="block.data.text" class="text-2xl font-semibold mb-4 text-[#2d2f31]"></h3>
              <p v-else-if="block.type === 'paragraph'" v-html="block.data.text" class="text-slate-500 text-lg leading-relaxed mb-6"></p>
              <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'" class="list-disc list-inside text-slate-500 text-lg leading-relaxed mb-6 space-y-2">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
              </ul>
              <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'" class="list-decimal list-inside text-slate-500 text-lg leading-relaxed mb-6 space-y-2">
                <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
              </ol>
              <div v-else-if="block.type === 'image'" class="my-10 rounded-3xl overflow-hidden shadow-xl bg-slate-100 border border-slate-200">
                <img :src="getImageUrl(block.data.file?.url)" :alt="block.data.caption" class="w-full h-auto object-cover" />
                <p v-if="block.data.caption" class="text-sm text-center text-slate-400 mt-4 mb-4 italic px-4">{{ block.data.caption }}</p>
              </div>
              <blockquote v-else-if="block.type === 'quote'" class="border-l-[6px] border-[#a20da0] pl-8 py-4 my-10 bg-gradient-to-r from-slate-50 to-transparent italic text-2xl text-slate-700 rounded-r-3xl">
                <p v-html="block.data.text" class="mb-2 font-serif leading-relaxed"></p>
                <footer v-if="block.data.caption" class="text-sm text-[#a20da0] font-bold uppercase tracking-widest mt-4">— {{ block.data.caption }}</footer>
              </blockquote>
              <div v-else-if="block.type === 'delimiter'" class="my-12 flex justify-center text-[#a20da0] text-3xl opacity-50">✦ ✦ ✦</div>
            </template>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-20 opacity-50">
            <div class="text-[#a20da0] mb-4 text-4xl">✦</div>
            <p class="text-slate-500 italic text-lg font-serif">Project documentation is currently being archived.</p>
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
    project.value = await client.request(readItem('projects', route.params.id));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const imageUrl = computed(() => getImageUrl(project.value?.image));
</script>
