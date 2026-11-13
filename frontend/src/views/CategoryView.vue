<template>
  <div class="category-view pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header with Warmth and Restraint -->
    <div class="mb-12 border-b border-wabi-border pb-8">
      <div class="text-xs uppercase tracking-widest font-medium mb-2" :class="roleAccentClass">
        Selected Craft Archive
      </div>
      
      <h1 class="text-4xl sm:text-5xl font-serif text-wabi-text mb-4">
        {{ role }}
      </h1>
      
      <p class="text-base text-wabi-muted font-normal max-w-2xl leading-relaxed">
        Collected works, essays, and artifacts created within the {{ role.toLowerCase() }} discipline.
      </p>

      <div class="mt-4 flex items-center gap-3 text-xs text-wabi-subtle">
        <router-link to="/" class="hover:text-clay-terracotta transition-colors flex items-center gap-1 font-medium">
          &larr; Return to main folio
        </router-link>
        <span>•</span>
        <span>{{ projects.length }} {{ projects.length === 1 ? 'project' : 'projects' }}</span>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-28 text-xs text-wabi-muted font-serif italic space-y-3">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-wabi-border border-t-clay-terracotta"></div>
      <p>Unfolding archive...</p>
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
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProjectsByRole } from '../useDirectus';
import ProjectCard from '../components/ProjectCard.vue';

const route = useRoute();
const role = ref(route.params.role);
const projects = ref([]);
const loading = ref(true);

const load = async () => {
  loading.value = true;
  projects.value = await fetchProjectsByRole(role.value);
  loading.value = false;
};

onMounted(load);
watch(() => route.params.role, (newRole) => {
  role.value = newRole;
  load();
});

const roleAccentClass = computed(() => {
  switch (role.value) {
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
