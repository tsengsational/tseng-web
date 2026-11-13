<template>
  <section class="contact-page pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Tactile Header Paper Sheet -->
    <div class="relative rounded-3xl border border-wabi-border bg-white/80 backdrop-blur-md p-8 sm:p-12 mb-10 overflow-hidden shadow-wabi">
      <!-- Background Mesh -->
      <div class="absolute inset-0 z-0 opacity-35 pointer-events-none" aria-hidden="true">
        <AnimatedMeshGradient 
          color1="#f8f2eb"
          color2="#eee4d5"
          color3="#e5d9c8"
        />
      </div>

      <div class="relative z-10 text-center max-w-xl mx-auto">
        <div class="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-clay-terracotta mb-3">
          Get in Touch
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-serif text-wabi-text mb-4">
          Say Hello
        </h1>
        
        <p class="text-base text-wabi-muted font-normal leading-relaxed">
          Open to literary commissions, stage dramaturgy, artistic exhibitions, and creative technology collaborations.
        </p>
      </div>
    </div>

    <!-- Contact Form Container -->
    <div class="rounded-3xl border border-wabi-border bg-white p-8 sm:p-12 shadow-soft">
      <ContactForm />
    </div>
  </section>
</template>

<script setup>
import AnimatedMeshGradient from '../components/AnimatedMeshGradient.vue';
import ContactForm from '../components/ContactForm.vue';
</script>
