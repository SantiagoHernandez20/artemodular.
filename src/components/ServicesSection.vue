<template>
  <section id="servicios" class="py-20 bg-white">
    <br><br>
    <div class="container-custom">
      <!-- Header limpio -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Ofrecemos una amplia gama de servicios 
        </h2><BR></BR>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Especializados en carpintería a medida, transformamos tus ideas en realidad con la más alta calidad y atención al detalle. 
        </p>
      </div>

      <!-- Grid de servicios -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article v-for="service in services" :key="service.id"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
          <!-- Imagen -->
          <div class="relative h-64 overflow-hidden bg-gray-100">
            <img :src="service.image" :alt="service.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <component :is="service.icon" class="w-6 h-6" :style="{ color: service.color }" />
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-6">
              {{ service.description }}
            </p>

            <!-- Features -->
            <ul class="space-y-2 mb-6">
              <li v-for="(feature, idx) in service.features.slice(0, 4)" :key="idx"
                class="flex items-start gap-2 text-sm text-gray-700">
                <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :style="{ color: service.color }" fill="currentColor"
                  viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <button @click="scrollToContact"
              class="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              :style="{ backgroundColor: service.color }">
              Solicitar cotización
            </button>
          </div>
        </article>
      </div>
      <br><br><br>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

const BuildingIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  `
}

const HomeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  `
}

const SparklesIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  `
}

export default {
  name: 'ServicesSection',
  components: {
    BuildingIcon,
    HomeIcon,
    SparklesIcon
  },
  setup() {
    const services = ref([
      {
        id: 1,
        title: 'Carpintería de Obra',
        description: 'Soluciones estructurales en madera para proyectos de construcción y remodelación con acabados de alta calidad.',
        icon: 'BuildingIcon',
        image: '/images/puerta/puerta_2.jpg',
        color: '#8D5524',
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
        description: 'Diseño y fabricación de muebles funcionales adaptados perfectamente a las necesidades de cada espacio.',
        icon: 'HomeIcon',
        image: '/images/closets/closet.jpeg',
        color: '#8D5524',
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
        description: 'Creación de piezas exclusivas que aportan carácter y personalidad a cualquier ambiente del hogar.',
        icon: 'SparklesIcon',
        image: '/images/centro_entretenimiento/centro_chimenea_1.jpg',
        color: '#8D5524',
        features: [
          'Muebles artesanales únicos',
          'Renovación de muebles',
          'Ensamblaje especializado',
          'Acabados decorativos',
          'Piezas personalizadas'
        ]
      }
    ])

    const scrollToContact = () => {
      const contactSection = document.getElementById('contacto')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      services,
      scrollToContact
    }
  }
}
</script>