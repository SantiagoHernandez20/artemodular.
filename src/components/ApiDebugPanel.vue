<template>
  <div v-if="showDebug" class="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold">🐛 Debug API Testimonios</h3>
      <button @click="showDebug = false" class="text-gray-400 hover:text-white">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <div class="space-y-2 text-xs">
      <!-- Estado de la API -->
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 rounded-full" :class="apiStatus === 'success' ? 'bg-green-400' : apiStatus === 'error' ? 'bg-red-400' : 'bg-yellow-400'"></span>
        <span>API: {{ apiStatus === 'success' ? '✅ Funcionando' : apiStatus === 'error' ? '❌ Error' : '⏳ Cargando...' }}</span>
      </div>
      
      <!-- URL de la API -->
      <div class="text-gray-300">
        <span class="font-mono">{{ apiUrl }}</span>
      </div>
      
      <!-- Contador de testimonios -->
      <div>
        Testimonios: <span class="font-semibold">{{ testimonialsCount }}</span>
      </div>
      
      <!-- Última respuesta -->
      <div v-if="lastResponse" class="bg-gray-800 p-2 rounded text-xs">
        <div class="font-semibold mb-1">Última respuesta:</div>
        <pre class="text-xs overflow-x-auto">{{ JSON.stringify(lastResponse, null, 2) }}</pre>
      </div>
      
      <!-- Botones de acción -->
      <div class="flex space-x-2 pt-2">
        <button @click="testApi" class="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs">
          Test API
        </button>
        <button @click="clearLogs" class="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded text-xs">
          Limpiar
        </button>
      </div>
    </div>
  </div>
  
  <!-- Botón para mostrar debug -->
  <button 
    v-else 
    @click="showDebug = true" 
    class="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full shadow-lg z-50"
    title="Mostrar Debug API"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import config from '../config/index.js'
import { testimonialService } from '../services/testimonialService.js'

export default {
  name: 'ApiDebugPanel',
  setup() {
    const showDebug = ref(false)
    const apiStatus = ref('idle')
    const lastResponse = ref(null)
    const testimonialsCount = ref(0)
    
    const apiUrl = computed(() => `${config.backend.url}/api/testimonials`)
    
    const testApi = async () => {
      try {
        apiStatus.value = 'loading'
        console.log('🧪 Iniciando test de API...')
        
        const response = await testimonialService.getAllTestimonials()
        lastResponse.value = response
        testimonialsCount.value = Array.isArray(response) ? response.length : 0
        apiStatus.value = 'success'
        
        console.log('✅ Test de API exitoso:', response)
      } catch (error) {
        apiStatus.value = 'error'
        lastResponse.value = { error: error.message }
        console.error('❌ Test de API falló:', error)
      }
    }
    
    const clearLogs = () => {
      lastResponse.value = null
      console.clear()
      console.log('🧹 Logs limpiados')
    }
    
    onMounted(() => {
      // Solo mostrar en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('🐛 Panel de debug API montado')
        console.log('🔧 Configuración actual:', {
          backendUrl: config.backend.url,
          apiUrl: apiUrl.value,
          environment: process.env.NODE_ENV
        })
      }
    })
    
    return {
      showDebug,
      apiStatus,
      lastResponse,
      testimonialsCount,
      apiUrl,
      testApi,
      clearLogs
    }
  }
}
</script>
