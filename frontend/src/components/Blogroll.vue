<template>
  <section class="blogroll py-12" id="dispatches">
    <!-- Header with Warm Restraint -->
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-wabi-border pb-4">
      <div>
        <div class="text-xs uppercase tracking-widest font-medium text-clay-terracotta mb-1.5">
          Essays & Dispatches
        </div>
        <h2 class="text-2xl sm:text-3xl font-serif text-wabi-text">
          Notes from Substack
        </h2>
      </div>

      <a 
        :href="substackUrl.replace('/feed', '')" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="text-xs text-wabi-text hover:text-clay-terracotta transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-wabi-border bg-white shadow-sm font-medium"
      >
        <span>Read on Substack</span>
        <svg class="h-3 w-3 text-clay-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 space-y-3 text-xs text-wabi-muted font-serif italic">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-wabi-border border-t-clay-terracotta"></div>
      <p>Gathering latest essays...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="p-6 rounded-2xl border border-wabi-border bg-wabi-card text-center text-xs text-wabi-muted">
      <p>{{ error }}</p>
      <a :href="substackUrl.replace('/feed', '')" target="_blank" class="mt-2 inline-block text-clay-terracotta underline">
        Read directly on Substack &rarr;
      </a>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a 
        v-for="post in posts" 
        :key="post.guid" 
        :href="post.link" 
        target="_blank"
        rel="noopener noreferrer"
        class="group relative rounded-2xl border border-wabi-border bg-white hover:border-wabi-border-dark transition-all duration-300 flex flex-col h-full shadow-soft hover:shadow-wabi p-6"
      >
        <!-- Date -->
        <div class="flex items-center justify-between text-xs text-wabi-subtle mb-3">
          <span class="font-serif italic">{{ formatDate(post.pubDate) }}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-wabi-card border border-wabi-border text-wabi-muted">Essay</span>
        </div>

        <!-- Post Title -->
        <h3 class="text-lg font-serif font-normal text-wabi-text group-hover:text-clay-terracotta transition-colors mb-2.5 leading-snug" v-html="post.title"></h3>
        
        <!-- Post Excerpt -->
        <p class="text-xs text-wabi-text/90 font-normal leading-relaxed line-clamp-3 mb-6 flex-grow" v-html="stripHtml(post.description)"></p>

        <!-- Read Action -->
        <div class="pt-3 border-t border-wabi-border/60 flex items-center justify-between text-xs text-wabi-muted group-hover:text-wabi-text transition-colors">
          <span class="font-medium">Read article</span>
          <svg class="h-3 w-3 transition-transform group-hover:translate-x-1 text-clay-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  substackUrl: {
    type: String,
    default: 'https://jasontseng.substack.com/feed'
  },
  maxPosts: {
    type: Number,
    default: 3
  }
});

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const FALLBACK_DISPATCHES = [
  {
    guid: 'dispatch-01',
    title: 'The Cartography of Computational Memory',
    pubDate: '2025-10-14',
    link: 'https://jasontseng.substack.com/',
    description: 'Reflections on diaspora geography, neural network storage degradation, and the preservation of ephemeral cultural rituals.'
  },
  {
    guid: 'dispatch-02',
    title: 'Dramaturgy in the Age of Synthetic Voices',
    pubDate: '2025-08-22',
    link: 'https://jasontseng.substack.com/',
    description: 'What stage actors and directors teach software architects about rhythm, presence, and embodied storytelling.'
  },
  {
    guid: 'dispatch-03',
    title: 'Against the Flatness of Modern Interfaces',
    pubDate: '2025-06-11',
    link: 'https://jasontseng.substack.com/',
    description: 'Why the elimination of mechanical depth, texture, and physical metaphor made our software forgettable.'
  }
];

onMounted(async () => {
  try {
    const rssApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(props.substackUrl)}`;
    const res = await fetch(rssApi);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      posts.value = data.items.slice(0, props.maxPosts);
    } else {
      posts.value = FALLBACK_DISPATCHES;
    }
  } catch (err) {
    posts.value = FALLBACK_DISPATCHES;
  } finally {
    loading.value = false;
  }
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}
</script>
