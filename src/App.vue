<template>
  <div id="app" class="min-h-screen bg-white">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />

    <!-- Panel de debug (solo en desarrollo) -->
  </div>


</template>

<script>

import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
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

.btn-primary {
  background-color: #8D5524;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  display: inline-block;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #6B3F1A;
}

.btn-secondary {
  background-color: #F5E9DA;
  color: #8D5524;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  display: inline-block;
  text-decoration: none;
  border: 2px solid #8D5524;
}

.btn-secondary:hover {
  background-color: #E6D4C1;
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
