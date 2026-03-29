<template>
  <div class="hero relative overflow-hidden bg-slate-900 pt-32 pb-24 sm:pb-32 lg:pb-48 rounded-xl shadow-2xl mx-4 sm:mx-0 mt-4 sm:mt-8">
    <div class="hero__background absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="hero__gradient relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="hero__container mx-auto max-w-7xl px-6 lg:px-8">
      <div class="hero__content mx-auto max-w-2xl text-center flex flex-col items-center">
        
        <div class="hero__avatar-wrapper mb-8 relative rounded-full p-1 bg-gradient-to-tr from-[#a20da0] to-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.15)] animate-in fade-in zoom-in duration-1000">
          <img src="/headshot.png" alt="Jason Tseng" class="hero__headshot w-32 h-32 md:w-56 md:h-56 rounded-full object-cover border-[4px] border-slate-900 shadow-inner" onerror="this.src='https://ui-avatars.com/api/?name=Jason+Tseng&background=slate-800&color=fff&size=300&font-size=0.33'" />
          <div class="hero__avatar-ring absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></div>
        </div>

        <h1 class="hero__title text-5xl font-extrabold tracking-tight text-white mb-8 sm:text-7xl">
          Jason <span class="hero__name-accent text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Tseng</span>
        </h1>
        <p class="hero__description mt-6 text-xl tracking-tight text-slate-300 font-medium leading-8 mb-8">
          Writer, Artist, and Coder creating experiences that blend technology with imagination.
        </p>
        <SocialLinks theme="dark" class="justify-center" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SocialLinks from './SocialLinks.vue';
</script>
