<template>
  <section class="blogroll py-12">
    <div class="blogroll__header mb-12 flex items-center justify-between gap-6">
      <h2 class="blogroll__title text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-slate-900 dark:from-slate-100 to-slate-600 dark:to-slate-400">Latest from Substack</h2>
      <div class="blogroll__divider h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent"></div>
      <a :href="substackUrl.replace('/feed', '')" target="_blank" rel="noopener noreferrer" class="blogroll__subscribe text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-200 transition-colors whitespace-nowrap">Subscribe &rarr;</a>
    </div>

    <div v-if="loading" class="blogroll__loading flex items-center justify-center py-12">
      <div class="blogroll__spinner h-8 w-8 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-brand-500"></div>
    </div>
    
    <div v-else-if="error" class="blogroll__error text-center py-12">
      <p class="blogroll__error-message text-red-500 dark:text-red-400 font-medium">{{ error }}</p>
    </div>

    <div v-else class="blogroll__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <a 
        v-for="post in posts" 
        :key="post.guid" 
        :href="post.link" 
        target="_blank"
        rel="noopener noreferrer"
        class="blogroll__card group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-800/80 backdrop-blur-sm shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-brand-500/20 hover:bg-white dark:hover:bg-slate-800 flex flex-col h-full"
      >
        <div v-if="getThumbnail(post)" class="blogroll__thumbnail-container aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
          <img :src="getThumbnail(post)" :alt="post.title" class="blogroll__thumbnail h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div v-else class="blogroll__thumbnail-placeholder aspect-video w-full flex items-center justify-center bg-gradient-to-br from-brand-100 dark:from-brand-900 via-white dark:via-slate-800 to-brand-50 dark:to-slate-800 text-brand-900 dark:text-brand-200 overflow-hidden relative">
          <div class="blogroll__placeholder-overlay absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-300 dark:from-brand-600 to-transparent blur-md"></div>
          <svg class="blogroll__placeholder-icon h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div class="blogroll__content p-6 flex flex-col flex-grow">
          <div class="blogroll__date text-xs font-semibold text-brand-600 dark:text-brand-400 mb-3">{{ formatDate(post.pubDate) }}</div>
          <h3 class="blogroll__post-title text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 leading-tight group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors" v-html="post.title"></h3>
          <p class="blogroll__post-excerpt text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6 flex-grow" v-html="stripHtml(post.description)"></p>
          <div class="blogroll__read-more inline-flex w-fit items-center text-sm font-semibold text-brand-600 dark:text-brand-400 transition-colors group-hover:text-brand-800 dark:group-hover:text-brand-300">
            Read Post
            <svg class="blogroll__arrow ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  // Users can pass their substantial feed URL via this prop
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

onMounted(async () => {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(props.substackUrl)}`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      posts.value = data.items.slice(0, props.maxPosts);
    } else {
      throw new Error('Could not parse feed');
    }
  } catch (err) {
    console.error('Error fetching Substack feed:', err);
    error.value = 'Failed to load recent posts.';
  } finally {
    loading.value = false;
  }
});

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || "";
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
};

const getThumbnail = (post) => {
  // 1. Direct thumbnail property
  if (post.thumbnail && post.thumbnail.trim() !== '') return post.thumbnail;
  // 2. Attached enclosure image
  if (post.enclosure && post.enclosure.link && post.enclosure.type?.startsWith('image/')) return post.enclosure.link;
  // 3. Extract the first img source from HTML content
  const htmlObj = post.content || post.description || '';
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = htmlObj.match(imgRegex);
  return match && match[1] ? match[1] : null;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
