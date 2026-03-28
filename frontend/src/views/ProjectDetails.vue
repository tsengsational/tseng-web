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

        <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/60 flex flex-col justify-between">
            <div>
              <div class="text-[#a20da0] mb-6 text-3xl">✦</div>
              <h2 class="text-3xl italic font-serif mb-6">The Creative Challenge</h2>
              <p class="text-slate-500 leading-relaxed">
                Balancing technical constraints with the 'Editorial' aesthetic requested in the initial brief. This project required a custom-built headless architecture to deliver content with millisecond precision across global regions.
              </p>
            </div>
          </div>

          <div class="md:col-span-2 bg-gradient-to-br from-[#a20da0] to-[#fc6cf2] p-12 rounded-3xl text-white flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2">
              <h2 class="text-4xl italic font-serif mb-6 text-white">Prismatic Logic</h2>
              <p class="text-white/80 leading-relaxed font-medium">
                Every interaction in our gallery is governed by a 'chromatic weight' system. As users explore different layers of the project, the primary accents shift in intensity, creating a responsive atmosphere.
              </p>
            </div>
            <div class="md:w-1/2 flex justify-center">
               <div class="h-32 w-32 rounded-full bg-white/20 backdrop-blur-3xl border border-white/30 animate-pulse"></div>
            </div>
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

const client = createDirectus('http://127.0.0.1:8055').with(rest());

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
