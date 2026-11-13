<template>
  <div class="home">
    <!-- Hero & Interactive Triad Switcher -->
    <HeroSection 
      :activeDiscipline="activeDiscipline"
      @update:discipline="handleDisciplineUpdate"
    />
    
    <!-- Main Works Archive -->
    <main id="works-archive" class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
      
      <!-- Wabi-Sabi Paper Sheet Container -->
      <div class="rounded-3xl border border-wabi-border bg-white/80 backdrop-blur-md p-6 sm:p-12 md:p-14 shadow-wabi">
        
        <!-- Live Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-24 space-y-3 font-serif italic text-sm text-wabi-muted">
          <div class="h-8 w-8 animate-spin rounded-full border-2 border-wabi-border border-t-clay-terracotta"></div>
          <p>Unfolding selected works...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-8 rounded-2xl border border-wabi-border bg-wabi-card text-center text-sm text-wabi-muted">
          <p>{{ error }}</p>
        </div>

        <!-- Disciplines Content -->
        <div v-else class="space-y-12">
          
          <!-- Filter Indicator -->
          <div v-if="activeDiscipline !== 'all'" class="flex items-center justify-between border-b border-wabi-border pb-4 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-wabi-subtle">Showing:</span>
              <span class="font-serif italic text-sm text-wabi-text">{{ activeDiscipline }} Works</span>
            </div>
            <button 
              type="button" 
              @click="activeDiscipline = 'all'" 
              class="text-wabi-muted hover:text-clay-terracotta underline underline-offset-4"
            >
              Show all works
            </button>
          </div>

          <!-- Writer Discipline -->
          <RoleSection 
            v-if="activeDiscipline === 'all' || activeDiscipline === 'Writer'"
            role="Writer" 
            :projects="writerProjects" 
          />

          <!-- Artist Discipline -->
          <RoleSection 
            v-if="activeDiscipline === 'all' || activeDiscipline === 'Artist'"
            role="Artist" 
            :projects="artistProjects" 
          />

          <!-- Coder Discipline -->
          <RoleSection 
            v-if="activeDiscipline === 'all' || activeDiscipline === 'Coder'"
            role="Coder" 
            :projects="coderProjects" 
          />
          
          <!-- Gentle Divider -->
          <div class="h-px bg-wabi-border w-full my-8"></div>
          
          <!-- Substack Dispatches -->
          <Blogroll substackUrl="https://jasontseng.substack.com/feed" />

        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import RoleSection from '../components/RoleSection.vue';
import Blogroll from '../components/Blogroll.vue';
import { fetchFeaturedProjects } from '../useDirectus';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);
const activeDiscipline = ref('all');

onMounted(async () => {
  try {
    projects.value = await fetchFeaturedProjects();
  } catch (err) {
    error.value = 'Failed to load projects archive.';
  } finally {
    loading.value = false;
  }
});

function handleDisciplineUpdate(discipline) {
  activeDiscipline.value = discipline;
}

const writerProjects = computed(() => projects.value.filter(p => p.role === 'Writer'));
const artistProjects = computed(() => projects.value.filter(p => p.role === 'Artist'));
const coderProjects = computed(() => projects.value.filter(p => p.role === 'Coder'));
</script>
