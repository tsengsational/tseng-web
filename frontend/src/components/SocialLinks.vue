<template>
  <div class="social-links flex flex-wrap justify-center gap-y-4 gap-x-6 items-center">
    <!-- Instagram -->
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" :class="linkClass" aria-label="Instagram">
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/>
      </svg>
      <span class="hidden sm:inline ml-2 text-sm font-medium">Instagram</span>
    </a>

    <!-- TikTok -->
    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" :class="linkClass" aria-label="TikTok">
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.88-.64-1.6-1.47-2.12-2.43v10.15c-.13 5.48-6.4 8.74-10.45 5.54-3.47-2.48-3.77-7.81-.6-10.63 1.95-1.92 4.95-2.21 7.23-.74.15.1.28.2.42.3v3.74c-.1-.07-.2-.14-.3-.21-1.37-.8-3.21-.49-4.24.68-.9 1.05-.73 2.72.39 3.55 1.15.89 2.94.75 3.93-.32.22-.24.37-.53.41-.84.05-1 .02-1.99.03-2.99V.02z"/>
      </svg>
      <span class="hidden sm:inline ml-2 text-sm font-medium">TikTok</span>
    </a>

    <!-- New Play Exchange (Drama Masks) -->
    <a href="#" target="_blank" rel="noopener noreferrer" :class="linkClass" aria-label="New Play Exchange">
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.58,11.38c.84,0,1.36-.91.94-1.63L16,5.5H8L5.48,9.75c-.42.72.1,1.63.94,1.63l.58,0c.1,0,.2,0,.29,0,1.3-.2,2.5,0,3.7.8,1,2,3,2,4,0,1-.6,2-.9,3-.8.2,0,.4,0,.59,0h.1Zm-9.08-2.38c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm7,0c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Z M12.5,14c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5,1.5.67,1.5,1.5S13.33,14,12.5,14Zm-4.5,7c-3.13,0-5.69-2.39-5.97-5.46L2,15.5l0-7.5c0-1.1.9-2,2-2h1c-.13-.33-.2-.67-.2-1,0-1.66,1.34-3,3-3s3,1.34,3,3c0,.33-.07.67-.2,1h2.4c-.13-.33-.2-.67-.2-1,0-1.66,1.34-3,3-3s3,1.34,3,3c0,.33-.07.67-.2,1h1c1.1,0,2,.9,2,2v7.5l0,.04c-.28,3.07-2.84,5.46-5.97,5.46Z"/>
      </svg>
      <span class="hidden sm:inline ml-2 text-sm font-medium">New Play Exchange</span>
    </a>

    <!-- Substack -->
    <a href="https://jasontseng.substack.com/" target="_blank" rel="noopener noreferrer" :class="linkClass" aria-label="Substack">
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.539 8.242H1.46V5.405h21.079v2.837zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
      <span class="hidden sm:inline ml-2 text-sm font-medium">Substack</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'light'
  }
});

const linkClass = computed(() => {
  const base = "social-links__link flex items-center transition-all transform hover:scale-105 duration-200 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10";
  return props.theme === 'dark' 
    ? `${base} text-slate-300 hover:text-white`
    : `${base} text-brand-600 hover:text-brand-900 border-brand-100 bg-brand-50/50`;
});
</script>
