<template>
  <section id="testimonios" class="bg-white section-padding">
    <div class="container-custom">
      <!-- Encabezado -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Lo que dicen nuestros clientes sobre nosotros
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          La satisfacción de nuestros clientes es nuestro mayor logro. Conoce sus experiencias trabajando con
          ArteModular.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
        
      </div>

      <!-- Carousel de testimonios -->
      <div v-else-if="testimonials.length > 0" class="relative max-w-4xl mx-auto">
        <div class="overflow-hidden rounded-2xl">
          <div class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="w-full flex-shrink-0">
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </div>
        </div>

        <!-- Controles de navegación -->
        <button @click="previousTestimonial"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === 0" :class="{ 'opacity-50 cursor-not-allowed': currentTestimonial === 0 }">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button @click="nextTestimonial"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === testimonials.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentTestimonial === testimonials.length - 1 }">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicadores -->
        <div class="flex justify-center mt-8 space-x-2">
          <button v-for="(testimonial, index) in testimonials" :key="`indicator-${testimonial.id}`"
            @click="goToTestimonial(index)" class="w-3 h-3 rounded-full transition-colors duration-200"
            :style="{ backgroundColor: currentTestimonial === index ? '#8D5524' : '#D1D5DB' }"></button>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-else class="text-center py-16">
        <div class="text-gray-500 text-lg">
          No hay testimonios disponibles en este momento.
        </div>
      </div>

      <!-- Estadísticas de satisfacción -->
      <div style="margin-top: 4rem; background-color: #F5E9DA; border-radius: 1rem; padding: 2rem;">
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
          <div>
            <div style="font-size: 2.25rem; font-weight: 700; color: #8D5524; margin-bottom: 0.5rem;">98%</div>
            <div style="color: #4B5563;">Clientes satisfechos</div>
          </div>
          <div>
            <div style="font-size: 2.25rem; font-weight: 700; color: #8D5524; margin-bottom: 0.5rem;">100%</div>
            <div style="color: #4B5563;">Proyectos entregados a tiempo</div>
          </div>
          <div>
            <div style="font-size: 2.25rem; font-weight: 700; color: #8D5524; margin-bottom: 0.5rem;">300+</div>
            <div style="color: #4B5563;">Familias felices</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import TestimonialCard from './TestimonialCard.vue'
import config from '../config/index.js'

export default {
  name: 'TestimonialsSection',
  components: {
    TestimonialCard
  },
  setup() {
    const currentTestimonial = ref(0)
    const testimonials = ref([])
    const isLoading = ref(true)
    let autoplayInterval = null

    // Cargar testimonios aprobados desde tu backend
    const loadApprovedTestimonials = async () => {
      try {
        console.log('🔄 Iniciando carga de testimonios aprobados...')
        isLoading.value = true

        // ✅ Usar configuración centralizada
        // El endpoint ya incluye el / inicial, así que lo pasamos directamente
        const endpoint = config.backend.endpoints.testimonials + '?approved_only=true'
        const apiUrl = config.utils.getBackendUrl(endpoint)
        //console.log('🌐 URL del backend:', config.backend.url)
        //console.log('🌐 Endpoint:', endpoint)
        //console.log('🌐 URL completa:', apiUrl)

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })



        if (!response.ok) {
          const errorText = await response.text()
          console.error('❌ Error en respuesta HTTP:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const result = await response.json()
        //console.log('✅ Respuesta del backend completa:', result)

        // El backend devuelve { success: true, data: [...] }
        if (!result.success) {
          console.warn('⚠️ Backend devolvió success: false', result)
        }

        const allTestimonials = result.data || []
        console.log('📋 Testimonios recibidos (sin filtrar):', allTestimonials.length, allTestimonials)

        // Filtrar solo los aprobados usando status (el backend ya filtra, pero por seguridad)
        const approvedTestimonials = allTestimonials.filter(t => t.status === 'approved')
        console.log('✅ Testimonios aprobados (después de filtrar):', approvedTestimonials.length, approvedTestimonials)

        // Ordenar por fecha de creación (más recientes primero)
        testimonials.value = approvedTestimonials.sort((a, b) => {
          const dateA = new Date(a.created_at || 0)
          const dateB = new Date(b.created_at || 0)
          return dateB - dateA
        })

        console.log('📊 Total testimonios aprobados cargados:', testimonials.value.length)
        //console.log('📊 Testimonios finales:', testimonials.value)
        isLoading.value = false

        // Iniciar autoplay si hay más de un testimonio
        if (testimonials.value.length > 1) {
          startAutoplay()
        }
      } catch (error) {
        console.error('❌ Error al cargar testimonios:', error)
        console.error('❌ Stack trace:', error.stack)
        testimonials.value = [] // Asegurar array vacío
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadApprovedTestimonials()
    })

    onUnmounted(() => {
      stopAutoplay()
    })

    const nextTestimonial = () => {
      if (currentTestimonial.value < testimonials.value.length - 1) {
        currentTestimonial.value++
      }
    }

    const previousTestimonial = () => {
      if (currentTestimonial.value > 0) {
        currentTestimonial.value--
      }
    }

    const goToTestimonial = (index) => {
      currentTestimonial.value = index
    }

    const startAutoplay = () => {
      if (testimonials.value.length > 1) {
        autoplayInterval = setInterval(() => {
          if (currentTestimonial.value === testimonials.value.length - 1) {
            currentTestimonial.value = 0
          } else {
            nextTestimonial()
          }
        }, 8000)
      }
    }

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
    }

    return {
      testimonials,
      currentTestimonial,
      isLoading,
      nextTestimonial,
      previousTestimonial,
      goToTestimonial
    }
  }
}
</script>
