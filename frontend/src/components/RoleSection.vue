<template>
  <section class="role-section py-10" :id="role.toLowerCase()">
    <!-- Section Header with Warm Restraint -->
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-wabi-border pb-4">
      <div>
        <div class="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-1.5" :class="roleAccentClass">
          <span>{{ roleSubtitle }}</span>
        </div>
        <router-link :to="{ name: 'Category', params: { role: role } }" class="group inline-flex items-baseline gap-3">
          <h2 class="text-2xl sm:text-3xl font-serif text-wabi-text group-hover:text-clay-terracotta transition-colors">
            {{ role }}
          </h2>
          <span class="text-xs text-wabi-subtle font-sans group-hover:text-wabi-muted transition-colors">
            ({{ projects.length }} {{ projects.length === 1 ? 'work' : 'works' }})
          </span>
        </router-link>
      </div>

      <router-link 
        :to="{ name: 'Category', params: { role: role } }" 
        class="text-xs text-wabi-muted hover:text-clay-terracotta transition-colors flex items-center gap-1.5 font-medium"
      >
        <span>View all {{ role.toLowerCase() }} works</span>
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project" 
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import ProjectCard from './ProjectCard.vue';

const props = defineProps({
  role: {
    type: String,
    required: true
  },
  projects: {
    type: Array,
    required: true
  }
});

const roleSubtitle = computed(() => {
  switch (props.role) {
    case 'Writer':
      return 'Plays, Prose & Fiction';
    case 'Artist':
      return 'Illustation, Printmaking, Fiber Arts, & Ceramics';
    case 'Coder':
      return 'Creative Tools, Interactive Experiences, & Web Experiments';
    default:
      return 'Selected Works';
  }
});

const roleAccentClass = computed(() => {
  switch (props.role) {
    case 'Writer':
      return 'text-clay-terracotta';
    case 'Artist':
      return 'text-clay-ocher';
    case 'Coder':
      return 'text-clay-sage';
    default:
      return 'text-wabi-muted';
  }
});
</script>
