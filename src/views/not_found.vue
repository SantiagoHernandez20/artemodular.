<template>
  <div class="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      
      <div class="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="size-24 text-orange-500 animate-pulse">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
        </svg>
      </div>

      <h2 class="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        404 - Página no encontrada
      </h2>

      <p class="mt-4 text-base text-gray-600 text-pretty">
        Lo sentimos, la ruta 
        <span class="font-mono bg-gray-100 px-2 py-1 rounded text-orange-700 break-all">
          /{{ fullPath }}
        </span> 
        no existe o ha sido movida permanentemente.
      </p>

      <div class="mt-10">
        <router-link 
          to="/" 
          class="inline-flex items-center justify-center w-full sm:w-auto rounded-md bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Regresar al Inicio
        </router-link>
      </div>

      <div class="mt-8 flex justify-center space-x-4 text-sm text-gray-500">
        <router-link to="/contacto" class="hover:text-orange-600 underline decoration-orange-200 underline-offset-4">
          Reportar error
        </router-link>
        <span class="text-gray-300">|</span>
        <router-link to="/servicios" class="hover:text-orange-600 underline decoration-orange-200 underline-offset-4">
          Ver servicios
        </router-link>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Concatenamos el pathMatch para mostrar la URL errónea
const fullPath = computed(() => {
  const path = route.params.pathMatch;
  return Array.isArray(path) ? path.join('/') : path;
});
</script>

<style scoped>
/* Animación suave para el icono */
.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .7; }
}
</style>