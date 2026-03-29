<template>
  <div class="app min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-brand-200 dark:selection:bg-brand-500 selection:text-brand-900 dark:selection:text-brand-50">
    <nav class="nav fixed top-0 w-full z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div class="nav__container flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <router-link to="/" class="nav__logo text-2xl font-serif italic tracking-tight text-slate-900 dark:text-slate-50">Jason Tseng</router-link>
        <div class="nav__links hidden md:flex items-center space-x-8">
          <router-link :to="{ name: 'Category', params: { role: 'Writer' } }" class="nav__link text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-sm uppercase tracking-wider">Writer</router-link>
          <router-link :to="{ name: 'Category', params: { role: 'Artist' } }" class="nav__link text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-sm uppercase tracking-wider">Artist</router-link>
          <router-link :to="{ name: 'Category', params: { role: 'Coder' } }" class="nav__link text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium text-sm uppercase tracking-wider">Coder</router-link>
        </div>
      </div>
    </nav>
    
    <router-view v-slot="{ Component }">
      <transition 
        enter-active-class="transform transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        mode="out-in"
      >
        <component :is="Component" class="app__content" />
      </transition>
    </router-view>

    <footer class="footer bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 mt-20 transition-colors duration-300">
      <div class="footer__container max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-6 sm:flex-row lg:px-8">
        <p class="footer__copy text-slate-500 dark:text-slate-400 font-medium text-sm">© {{ new Date().getFullYear() }} Jason Tseng. Crafted for Railway.</p>
        <SocialLinks theme="light" class="dark:text-slate-300" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import SocialLinks from './components/SocialLinks.vue';
</script>
