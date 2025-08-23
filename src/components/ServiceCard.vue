<template>
  <div 
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-opacity-50 p-6 service-card"
    @click="$emit('click')"
  >
    <div class="text-center">
      <!-- Icono -->
      <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #F5E9DA;">
        <!-- Icono de Carpintería de Obra -->
        <svg v-if="service.icon === 'BuildingIcon'" class="w-8 h-8" style="color: #8D5524;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        
        <!-- Icono de Carpintería de Mobiliario -->
        <svg v-else-if="service.icon === 'HomeIcon'" class="w-8 h-8" style="color: #8D5524;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21l0-12"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21l0-12"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21l0-12"/>
        </svg>
        
        <!-- Icono de Carpintería Decorativa -->
        <svg v-else-if="service.icon === 'SparklesIcon'" class="w-8 h-8" style="color: #8D5524;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
        
        <!-- Icono por defecto -->
        <svg v-else class="w-8 h-8" style="color: #8D5524;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      
      <!-- Título -->
      <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
      
      <!-- Descripción -->
      <p class="text-gray-600 mb-4">{{ service.description }}</p>
      
      <!-- CTA -->
      <div class="inline-flex items-center font-medium transition-colors" style="color: #8D5524;">
        Conocer más
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup() {
    // Los iconos se manejan directamente en el template
    return {}
  }
}
</script>

<style scoped>
.service-card:hover {
  border-color: #E6D4C1;
}
</style>
