<template>
  <section id="servicios" class="bg-white section-padding">
    <div class="container-custom">
      <!-- Encabezado de la sección -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ofrecemos una amplia gama de servicios
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Especializados en carpintería a medida, transformamos tus ideas en realidad con la más alta calidad y atención al detalle.
        </p>
      </div>

      <!-- Grid de servicios -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
          @click="selectService(service)"
        />
      </div>

      <!-- Servicio seleccionado - detalles -->
      <div v-if="selectedService" class="bg-gray-50 rounded-2xl p-8 transition-all duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedService.title }}</h3>
            <p class="text-gray-600 mb-6">{{ selectedService.fullDescription }}</p>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-900">Incluye:</h4>
              <ul class="space-y-2">
                <li v-for="feature in selectedService.features" :key="feature" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="text-center">
              <component :is="selectedService.icon" class="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <p class="text-gray-600">{{ selectedService.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import ServiceCard from './ServiceCard.vue'

export default {
  name: 'ServicesSection',
  components: {
    ServiceCard
  },
  setup() {
    const selectedService = ref(null)
    
    const services = ref([
      {
        id: 1,
        title: 'Carpintería de Obra',
        description: 'Puertas, ventanas, marcos y estructuras',
        fullDescription: 'Especialistas en carpintería de obra para construcción y renovación. Fabricamos e instalamos puertas, ventanas, marcos, escaleras y todo tipo de estructuras de madera con acabados de primera calidad.',
        icon: 'BuildingIcon',
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
        features: [
          'Muebles artesanales únicos',
          'Renovación de muebles',
          'Ensamblaje especializado',
          'Acabados decorativos',
          'Piezas personalizadas'
        ]
      },
    
      
      
    ])

    const selectService = (service) => {
      selectedService.value = service
    }

    // Seleccionar el primer servicio por defecto
    onMounted(() => {
      if (services.value.length > 0) {
        selectedService.value = services.value[0]
      }
    })

    return {
      services,
      selectedService,
      selectService
    }
  }
}
</script>
