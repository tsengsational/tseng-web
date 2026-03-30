<template>
  <div class="hero relative overflow-hidden pt-32 pb-24 sm:pb-32 lg:pb-48 rounded-xl shadow-2xl mx-4 sm:mx-0 mt-4 sm:mt-8 bg-slate-950">
    <div class="hero__background absolute inset-0 z-0 overflow-hidden rounded-xl" aria-hidden="true">
      <AnimatedMeshGradient />
    </div>
    <div class="hero__container relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      <div class="hero__content mx-auto max-w-2xl text-center flex flex-col items-center">
        
        <div class="hero__avatar-wrapper mb-8 relative rounded-full p-1 bg-gradient-to-tr from-[#a20da0] to-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.15)] animate-in fade-in zoom-in duration-1000">
          <img src="/headshot.png" alt="Jason Tseng" class="hero__headshot w-32 h-32 md:w-56 md:h-56 rounded-full object-cover border-[4px] border-slate-900 shadow-inner" onerror="this.src='https://ui-avatars.com/api/?name=Jason+Tseng&background=slate-800&color=fff&size=300&font-size=0.33'" />
          <div class="hero__avatar-ring absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></div>
        </div>

        <h1 class="hero__title text-5xl font-extrabold tracking-tight text-white mb-8 sm:text-7xl drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
          Jason <span class="hero__name-accent text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-violet-400">Tseng</span>
        </h1>
        <p class="hero__description mt-6 text-xl tracking-tight text-slate-300 font-medium leading-8 mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Writer, Artist, and Coder creating experiences that blend technology with imagination.
        </p>
        <SocialLinks theme="dark" class="justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedMeshGradient from './AnimatedMeshGradient.vue';
import SocialLinks from './SocialLinks.vue';
</script>
