<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
    <nav class="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-100">
      <div class="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <router-link to="/" class="text-2xl font-serif italic tracking-tight text-slate-900">Jason Tseng</router-link>
        <div class="hidden md:flex items-center space-x-8">
          <router-link :to="{ name: 'Category', params: { role: 'Writer' } }" class="text-slate-600 hover:text-brand-600 transition-colors font-medium text-sm uppercase tracking-wider">Writer</router-link>
          <router-link :to="{ name: 'Category', params: { role: 'Artist' } }" class="text-slate-600 hover:text-brand-600 transition-colors font-medium text-sm uppercase tracking-wider">Artist</router-link>
          <router-link :to="{ name: 'Category', params: { role: 'Coder' } }" class="text-slate-600 hover:text-brand-600 transition-colors font-medium text-sm uppercase tracking-wider">Coder</router-link>
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
        <component :is="Component" />
      </transition>
    </router-view>

    <footer class="bg-white border-t border-slate-200 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-6 sm:flex-row lg:px-8">
        <p class="text-slate-500 font-medium text-sm">© {{ new Date().getFullYear() }} Jason Tseng. Crafted for Railway.</p>
        <div class="flex space-x-6">
          <a href="#" class="text-brand-600 hover:text-brand-900 transition-colors">Twitter</a>
          <a href="#" class="text-brand-600 hover:text-brand-900 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>
