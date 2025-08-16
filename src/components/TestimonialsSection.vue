<template>
  <section id="testimonios" class="bg-white section-padding">
    <div class="container-custom">
      <!-- Encabezado -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Lo que dicen nuestros clientes sobre nosotros
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          La satisfacción de nuestros clientes es nuestro mayor logro. Conoce sus experiencias trabajando con ArteModular.
        </p>
      </div>

      <!-- Carousel de testimonios -->
      <div class="relative max-w-4xl mx-auto">
        <div class="overflow-hidden rounded-2xl">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
          >
            <div 
              v-for="testimonial in testimonials" 
              :key="testimonial.id"
              class="w-full flex-shrink-0"
            >
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </div>
        </div>

        <!-- Controles de navegación -->
        <button 
          @click="previousTestimonial"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentTestimonial === 0 }"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button 
          @click="nextTestimonial"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === testimonials.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentTestimonial === testimonials.length - 1 }"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Indicadores -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="(testimonial, index) in testimonials"
            :key="`indicator-${testimonial.id}`"
            @click="goToTestimonial(index)"
            class="w-3 h-3 rounded-full transition-colors duration-200"
                         :style="{ backgroundColor: currentTestimonial === index ? '#8D5524' : '#D1D5DB' }"
          ></button>
        </div>
      </div>

             <!-- Estadísticas de satisfacción -->
       <div style="margin-top: 4rem; background-color: #F5E9DA; border-radius: 1rem; padding: 2rem;">
         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
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

export default {
  name: 'TestimonialsSection',
  components: {
    TestimonialCard
  },
  setup() {
    const currentTestimonial = ref(0)
    let autoplayInterval = null

    const testimonials = ref([
      {
        id: 1,
        name: 'María González',
        role: 'Propietaria',
        service: 'Cocina integral',
        content: 'ArteModular transformó completamente mi cocina. El diseño es perfecto para mi espacio y la calidad de los materiales es excepcional. Todo el proceso fue muy profesional y el resultado superó mis expectativas.',
        rating: 5,
        avatar: 'M.G.'
      },
      {
        id: 2,
        name: 'Carlos Rodríguez',
        role: 'Arquitecto',
        service: 'Carpintería de obra',
        content: 'Como arquitecto, valoro mucho la precisión y la calidad. ArteModular demostró un nivel de craftsmanship impresionante. Las puertas y marcos que fabricaron para mi proyecto quedaron perfectos.',
        rating: 5,
        avatar: 'C.R.'
      },
      {
        id: 3,
        name: 'Ana Martínez',
        role: 'Diseñadora de interiores',
        service: 'Muebles decorativos',
        content: 'La atención al detalle y la capacidad de materializar ideas creativas es lo que más me gusta de trabajar con ArteModular. Cada pieza que crean es única y de altísima calidad.',
        rating: 5,
        avatar: 'A.M.'
      },
      {
        id: 4,
        name: 'Roberto Silva',
        role: 'Empresario',
        service: 'Oficina completa',
        content: 'Necesitaba amueblar mi oficina con un diseño moderno y funcional. El equipo de ArteModular entendió perfectamente mi visión y entregó un espacio de trabajo excepcional.',
        rating: 5,
        avatar: 'R.S.'
      }
    ])

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
      autoplayInterval = setInterval(() => {
        if (currentTestimonial.value === testimonials.value.length - 1) {
          currentTestimonial.value = 0
        } else {
          nextTestimonial()
        }
      }, 5000) // Cambiar cada 5 segundos
    }

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
    }

    onMounted(() => {
      startAutoplay()
    })

    onUnmounted(() => {
      stopAutoplay()
    })

    return {
      testimonials,
      currentTestimonial,
      nextTestimonial,
      previousTestimonial,
      goToTestimonial
    }
  }
}
</script>
