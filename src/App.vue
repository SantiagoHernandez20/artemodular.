<template>
  <div id="app" class="min-h-screen bg-white">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
    
    <!-- Botón flotante de WhatsApp -->
    <FloatingWhatsAppButton />

    <!-- Panel de debug (solo en desarrollo) -->
  </div>


</template>

<script>

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    FloatingWhatsAppButton
  },
  setup() {

  }
}
</script>

<style>
/* Fuentes y estilos globales */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Estilos personalizados */
.section-padding {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Utilities responsive */
@media (min-width: 768px) {
  .md\\:flex {
    display: flex !important;
  }

  .md\\:hidden {
    display: none !important;
  }
}

/* Hide by default on mobile */
.md\\:flex {
  display: none;
}

.md\\:hidden {
  display: block;
}
</style>