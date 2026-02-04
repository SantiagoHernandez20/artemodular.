<template>
  <section id="servicios" class="bg-white section-padding">
    <div class="container-custom">
      <!-- Encabezado de la sección -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ofrecemos una amplia gama de servicios
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Especializados en carpintería a medida, transformamos tus ideas en realidad con la más alta calidad y atención
          al detalle.
        </p>
      </div>

      <!-- Grid de servicios -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" @click="selectService(service)" />
      </div>

      <!-- Servicio seleccionado - detalles para DESKTOP -->
      <div v-if="selectedService && !isMobile" class="rounded-2xl p-8 transition-all duration-300"
        style="background-color: #F9F7F4;">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedService.title }}</h3>
            <p class="text-gray-600 mb-6">{{ selectedService.fullDescription }}</p>

            <div class="space-y-3">
              <h4 class="font-semibold text-gray-900">Incluye:</h4>
              <ul class="space-y-2">
                <li v-for="feature in selectedService.features" :key="feature" class="flex items-center gap-2">
                  <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style="color: #8D5524;">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group" style="height:450px;">
            <img 
              :src="selectedService.image" 
              :alt="selectedService.title"
              class="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
            />
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Modal para MÓVIL - Fuera del contenedor principal -->
  <Teleport to="body">
    <div v-if="showMobileModal && isMobile" class="mobile-modal-overlay" @click="closeMobileModal">
      <div class="mobile-modal-content" @click.stop>
        <!-- Header del modal -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-900">{{ selectedService?.title }}</h3>
          <button @click="closeMobileModal" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Icono -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style="background-color: #F5E9DA;">
            <svg v-if="selectedService?.icon === 'BuildingIcon'" class="w-8 h-8" style="color: #8D5524;" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <svg v-else-if="selectedService?.icon === 'HomeIcon'" class="w-8 h-8" style="color: #8D5524;" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21l0-12" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21l0-12" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21l0-12" />
            </svg>
            <svg v-else-if="selectedService?.icon === 'SparklesIcon'" class="w-8 h-8" style="color: #8D5524;"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>


        <!-- Contenido -->
        <div class="space-y-4">
          <p class="text-gray-600 text-sm leading-relaxed">{{ selectedService?.fullDescription }}</p>

          <div>
            <h4 class="font-semibold text-gray-900 mb-3 text-base">Incluye:</h4>
            <ul class="space-y-2">
              <li v-for="feature in selectedService?.features" :key="feature" class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style="color: #8D5524;">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 text-sm">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <br>


          <!-- CTA del modal -->
          <div class="pt-4 border-t border-gray-200">
            <button @click="scrollToContact" class="w-full btn-primary text-center text-sm font-medium py-3">
              Solicitar cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ServiceCard from './ServiceCard.vue'

export default {
  name: 'ServicesSection',
  components: {
    ServiceCard
  },
  setup() {
    const selectedService = ref(null)
    const showMobileModal = ref(false)
    const windowWidth = ref(0)

    const services = ref([
      {
        id: 1,
        title: 'Carpintería de Obra',
        description: 'Puertas, ventanas, marcos y estructuras',
        fullDescription: 'Especialistas en carpintería de obra para construcción y renovación. Fabricamos e instalamos puertas, ventanas, marcos, escaleras y todo tipo de estructuras de madera con acabados de primera calidad.',
        icon: 'BuildingIcon',
        image: '/images/bibliotecas/valencia_1.png',
        features: [
          'Puertas interiores y exteriores',
          'Ventanas de madera',
          'Marcos y molduras',
          'Escaleras personalizadas',
          'Estructuras de soporte'
        ]
      },
      {
        id: 2,
        title: 'Carpintería de Mobiliario',
        description: 'Cocinas, baños, dormitorios y espacios personalizados',
        fullDescription: 'Diseñamos y fabricamos muebles a medida para cada espacio de tu hogar. Desde cocinas integrales hasta closets, cada pieza está pensada para maximizar funcionalidad y estética.',
        icon: 'HomeIcon',
        image: '/images/centro_entretenimiento/centro_chimenea_1.jpg',
        features: [
          'Cocinas integrales',
          'Closets y vestidores',
          'Muebles de baño',
          'Dormitorios completos',
          'Espacios de almacenamiento'
        ]
      },
      {
        id: 3,
        title: 'Carpintería Decorativa',
        description: 'Muebles únicos, ensamblaje y renovaciones',
        fullDescription: 'Creamos piezas únicas que reflejan tu personalidad y estilo. Desde muebles artesanales hasta renovación de piezas existentes, cada proyecto es una obra de arte funcional.',
        icon: 'SparklesIcon',
        image: '/images/bibliotecas/valencia_1.png',
        features: [
          'Muebles artesanales únicos',
          'Renovación de muebles',
          'Ensamblaje especializado',
          'Acabados decorativos',
          'Piezas personalizadas'
        ]
      },



    ])

    // Computed para detectar si estamos en móvil
    const isMobile = computed(() => windowWidth.value < 768)

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth
    }

    const selectService = (service) => {
      selectedService.value = service

      // En móvil, mostrar modal
      if (isMobile.value) {
        showMobileModal.value = true
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden'
      }
    }

    const closeMobileModal = () => {
      showMobileModal.value = false
      // Restaurar scroll del body
      document.body.style.overflow = 'auto'
    }

    const scrollToContact = () => {
      // Cerrar el modal
      closeMobileModal()
      // Scroll suave a la sección de contacto
      const contactSection = document.getElementById('contacto')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Seleccionar el primer servicio por defecto (solo en desktop)
    onMounted(() => {
      updateWindowWidth()
      window.addEventListener('resize', updateWindowWidth)

      if (services.value.length > 0 && !isMobile.value) {
        selectedService.value = services.value[0]
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth)
      // Restaurar scroll del body si el componente se desmonta con modal abierto
      document.body.style.overflow = 'auto'
    })

    return {
      services,
      selectedService,
      showMobileModal,
      isMobile,
      selectService,
      closeMobileModal,
      scrollToContact
    }
  }
}
</script>

<style scoped>
/* Modal overlay que cubre toda la pantalla */
.mobile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(2px);
}

/* Contenido del modal */
.mobile-modal-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: scale(0.95);
  animation: modalAppear 0.2s ease-out forwards;
}

/* Animación de aparición */
@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Evitar scroll del body cuando el modal está abierto */
.mobile-modal-overlay {
  overscroll-behavior: contain;
}

/* Scroll suave en el contenido del modal */
.mobile-modal-content {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.mobile-modal-content::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}
</style>
