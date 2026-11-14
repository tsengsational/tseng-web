<template>
  <article class="project-card group relative rounded-2xl border border-wabi-border bg-white hover:border-wabi-border-dark transition-all duration-300 flex flex-col h-full shadow-soft hover:shadow-wabi overflow-hidden">
    
    <!-- Top Metadata Bar -->
    <div class="px-5 py-3 border-b border-wabi-border/70 flex items-center justify-between text-xs text-wabi-muted bg-wabi-card/40">
      <div class="flex items-center gap-2">
        <span 
          :class="[
            'inline-block h-2 w-2 rounded-full',
            roleDotColor
          ]"
        ></span>
        <span class="font-medium tracking-wide text-wabi-text">{{ project.role }}</span>
      </div>
      <div class="text-[11px] text-wabi-subtle font-mono">
        <span>{{ project.year || '2025' }}</span>
      </div>
    </div>

    <!-- Preview Media or Tactile Washi Monogram -->
    <div class="aspect-[16/10] w-full overflow-hidden bg-wabi-card/70 relative border-b border-wabi-border/60 flex items-center justify-center">
      <img 
        v-if="imageUrl" 
        :src="imageUrl" 
        :alt="project.title" 
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[0.98]" 
      />
      <!-- Handcrafted Paper Plate Monogram when no image is uploaded -->
      <div v-else class="h-full w-full p-6 flex flex-col justify-between relative overflow-hidden bg-[#fbf8f3]">
        <div class="flex justify-between items-start text-[11px] text-wabi-subtle font-serif italic">
          <span>Plate Archive</span>
          <span>{{ project.role }}</span>
        </div>

        <div class="flex flex-col items-center justify-center my-auto">
          <!-- Ceramic seal stamp icon -->
          <div class="w-10 h-10 rounded-full border border-wabi-border-dark flex items-center justify-center bg-wabi-card text-clay-terracotta">
            <span class="font-serif italic text-lg leading-none">J</span>
          </div>
        </div>

        <div class="flex justify-between items-end text-[10px] text-wabi-subtle">
          <span>Atelier Record</span>
          <span>New York</span>
        </div>
      </div>
    </div>

    <!-- Content Block -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-serif font-normal text-wabi-text group-hover:text-clay-terracotta transition-colors mb-2.5 leading-snug">
        {{ project.title }}
      </h3>
      
      <p class="text-sm text-wabi-text/90 font-normal leading-relaxed line-clamp-3 mb-6 flex-grow">
        {{ project.description }}
      </p>

      <!-- Natural Material Tags -->
      <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-1.5 mb-6">
        <span 
          v-for="t in project.tags" 
          :key="t.tags_id?.name || t" 
          class="text-[11px] px-2.5 py-0.5 rounded-full border border-wabi-border bg-wabi-card/80 text-wabi-text/80 font-medium"
        >
          {{ t.tags_id?.name || t }}
        </span>
      </div>

      <!-- Action Row -->
      <div class="pt-4 border-t border-wabi-border/70 flex items-center justify-between text-xs">
        <router-link 
          :to="{ name: 'ProjectDetails', params: { id: project.id } }" 
          class="text-wabi-text hover:text-clay-terracotta transition-colors font-medium flex items-center gap-1.5"
        >
          <span>View project</span>
          <svg class="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>

        <a 
          v-if="project.link" 
          :href="project.link" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="text-wabi-subtle hover:text-wabi-text transition-colors flex items-center gap-1"
        >
          <span>Visit link</span>
          <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

    </div>
  </article>
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

const roleDotColor = computed(() => {
  switch (props.project.role) {
    case 'Writer':
      return 'bg-clay-terracotta';
    case 'Artist':
      return 'bg-clay-ocher';
    case 'Coder':
      return 'bg-clay-sage';
    default:
      return 'bg-wabi-muted';
  }
});
</script>
