<template>
  <div class="social-links flex space-x-6 items-center">
    <a href="#" target="_blank" rel="noopener noreferrer" :class="linkClass">Instagram</a>
    <a href="#" target="_blank" rel="noopener noreferrer" :class="linkClass">TikTok</a>
    <a href="#" target="_blank" rel="noopener noreferrer" :class="linkClass">New Play Exchange</a>
    <a href="https://jasontseng.substack.com/" target="_blank" rel="noopener noreferrer" :class="linkClass">Substack</a>
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
  return props.theme === 'dark' 
    ? "social-links__link text-slate-300 hover:text-white dark:hover:text-white transition-colors font-medium text-sm"
    : "social-links__link text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-brand-200 transition-colors font-medium text-sm";
});
</script>
