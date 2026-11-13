<template>
  <div class="app min-h-screen bg-wabi-bg text-wabi-text font-sans flex flex-col justify-between selection:bg-wabi-sand selection:text-wabi-text">
    
    <!-- Warm Tactile Navigation -->
    <nav class="nav fixed top-0 w-full z-50 bg-[#faf6f0]/90 backdrop-blur-md border-b border-wabi-border transition-colors duration-300">
      <div class="nav__container flex justify-between items-center px-4 sm:px-8 py-4 max-w-6xl mx-auto text-sm">
        
        <!-- Logo / Masthead -->
        <router-link to="/" class="flex items-baseline gap-2.5 group">
          <span class="text-xl sm:text-2xl font-serif text-wabi-text group-hover:text-clay-terracotta transition-colors">
            Jason Tseng
          </span>
          <span class="hidden sm:inline-block text-xs font-serif italic text-wabi-subtle">
            writer · artist · coder
          </span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-7 text-xs font-medium tracking-wide text-wabi-muted">
          <router-link 
            :to="{ name: 'Category', params: { role: 'Writer' } }" 
            class="hover:text-clay-terracotta transition-colors"
          >
            Writer
          </router-link>

          <router-link 
            :to="{ name: 'Category', params: { role: 'Artist' } }" 
            class="hover:text-clay-ocher transition-colors"
          >
            Artist
          </router-link>

          <router-link 
            :to="{ name: 'Category', params: { role: 'Coder' } }" 
            class="hover:text-clay-sage transition-colors"
          >
            Coder
          </router-link>

          <a 
            href="#dispatches" 
            class="hover:text-wabi-text transition-colors"
          >
            Essays
          </a>

          <router-link 
            :to="{ name: 'Contact' }" 
            class="px-4 py-1.5 rounded-full border border-wabi-border hover:border-clay-terracotta bg-white hover:text-clay-terracotta text-wabi-text transition-all shadow-sm"
          >
            Contact
          </router-link>
        </div>

        <!-- Mobile Action -->
        <div class="md:hidden flex items-center">
          <router-link 
            :to="{ name: 'Contact' }" 
            class="px-3.5 py-1 rounded-full border border-wabi-border bg-white text-xs font-medium"
          >
            Contact
          </router-link>
        </div>

      </div>
    </nav>
    
    <!-- Main Content Viewport -->
    <div class="flex-grow pt-6">
      <router-view v-slot="{ Component }">
        <transition 
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Warm Colophon & Footer -->
    <footer class="footer border-t border-wabi-border bg-white/60 py-12 mt-20 text-xs text-wabi-muted">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div class="font-serif text-base text-wabi-text">
            Jason Tseng
          </div>
          <div class="hidden sm:block text-wabi-border">•</div>
          <p class="text-xs text-wabi-muted">
            Crafted with Vue, Three.js & unhurried intention.
          </p>
        </div>

        <SocialLinks />
      </div>
    </footer>

  </div>
</template>

<script setup>
import SocialLinks from './components/SocialLinks.vue';
</script>
