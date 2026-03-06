<template>
  <div
    class="flex min-h-[75vh] items-center justify-center px-4 py-20 bg-brand-beige/20 selection:bg-brand-orange selection:text-white">
    <div class="max-w-2xl w-full relative">
      <!-- Decorative background glows -->
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-[100px] animate-pulse"
        style="animation-delay: 1.5s;"></div>

      <div
        class="relative bg-white/70 backdrop-blur-xl border border-white p-8 sm:p-16 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] text-center overflow-hidden group">
        <!-- Brand accent bar -->
        <div class="absolute top-0 left-0 w-full h-1.5 flex">
          <div class="h-full w-1/4 bg-brand-red"></div>
          <div class="h-full w-1/4 bg-brand-orange"></div>
          <div class="h-full w-1/2 bg-brand-blue"></div>
        </div>

        <div class="mb-12 inline-flex items-center justify-center">
          <div class="relative">
            <div class="absolute inset-0 bg-brand-red/10 scale-150 rounded-full animate-ping opacity-20"></div>
            <div class="relative z-10 bg-white p-6 rounded-3xl shadow-xl shadow-brand-red/5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="size-16 text-brand-red">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <h1
          class="text-9xl font-black text-gray-900 tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-br from-brand-red via-brand-orange to-brand-red bg-[size:200%] animate-gradient">
          404
        </h1>

        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 tracking-tight">
          Página no encontrada
        </h2>

        <div class="max-w-md mx-auto mb-12">
          <p class="text-gray-500 text-lg leading-relaxed">
            Parece que te has aventurado fuera de nuestra estructura modular. La ruta
            <span
              class="inline-block mt-2 font-mono text-sm font-semibold text-brand-red bg-brand-red/5 px-3 py-1 rounded-lg border border-brand-red/10 break-all">
              /{{ fullPath }}
            </span>
            no existe en nuestro diseño actual.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
          <router-link to="/"
            class="group w-full sm:w-auto px-12 py-5 bg-brand-red text-white font-bold rounded-2xl shadow-xl shadow-brand-red/20 hover:bg-brand-orange hover:shadow-brand-orange/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2">
            Regresar al Inicio
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>

          <router-link to="/servicios"
            class="w-full sm:w-auto px-12 py-5 bg-transparent text-gray-700 font-bold rounded-2xl border-2 border-brand-blue/20 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-300">
            Nuestros servicios
          </router-link>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase opacity-50">
          Artemodular &bull; Módulos Creativos &bull; {{ new Date().getFullYear() }}
        </p>
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
  const path = route?.params?.pathMatch;
  if (!path) return '';
  return Array.isArray(path) ? path.join('/') : path;
});
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 6s ease infinite;
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
</style>