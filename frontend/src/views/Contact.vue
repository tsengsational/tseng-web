<template>
  <section class="contact-page">
    <!-- Hero -->
    <div class="hero relative pt-32 pb-24 sm:pb-32 lg:pb-48 rounded-xl shadow-2xl mx-4 sm:mx-0 mt-4 sm:mt-8 bg-slate-950">
      <div class="absolute inset-0 z-0 rounded-xl" aria-hidden="true">
        <AnimatedMeshGradient />
      </div>
      <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-5xl font-extrabold tracking-tight text-white mb-4 sm:text-6xl drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
            Say <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-violet-400">Hello</span>
          </h1>
          <p class="mt-4 text-xl tracking-tight text-slate-300 font-medium leading-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            Have a project, collaboration, or just want to connect? I'd love to hear from you.
          </p>
        </div>
      </div>
    </div>

    <!-- Form Card -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32 -mt-16 sm:-mt-24 relative z-10">
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-12 md:p-16 border border-white/60 dark:border-slate-700 transition-colors duration-300">
        <ContactForm />
      </div>
    </main>
  </section>
</template>

<script setup>
import AnimatedMeshGradient from '../components/AnimatedMeshGradient.vue';
import ContactForm from '../components/ContactForm.vue';
</script>
