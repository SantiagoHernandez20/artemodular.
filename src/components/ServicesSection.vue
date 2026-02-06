<template>
  <section id="servicios" class="py-20 bg-white">
    <br><br>
    <div class="container-custom">
      <!-- Header limpio -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ofrecemos una amplia gama de servicios 
        </h2><BR></BR>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Especializados en carpintería a medida, transformamos tus ideas en realidad con la más alta calidad y atención al detalle. 
        </p>
      </div>

      <!-- Grid de servicios -->
      <div class="services-grid">
        <article v-for="service in services" :key="service.id" class="service-card">
          <!-- Imagen: Wrapper con aspect-ratio determinístico -->
          <div class="service-image-container">
            <img 
              :src="service.image" 
              :alt="service.title"
              class="service-image" 
              loading="lazy"
            />
          </div>

          <!-- Contenido: Flujo vertical flexbox -->
          <div class="service-content">
           

            <!-- Textos -->
            <h3 class="service-title">
              {{ service.title }}
            </h3>
            <p class="service-description">
              {{ service.description }}
            </p>

            <!-- Features -->
            <ul class="service-features">
              <li v-for="(feature, idx) in service.features.slice(0, 4)" :key="idx" class="feature-item">
                <svg class="feature-check" :style="{ color: service.color }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA: Siempre al final gracias a flexbox -->
            <button 
              @click="scrollToContact"
              class="service-button"
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
      },
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

<style scoped>
/* ============================================
   SERVICES GRID - LAYOUT DETERMINÍSTICO
   ============================================ */

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
}

/* ============================================
   SERVICE CARD - ESTRUCTURA SIN POSITION ABSOLUTE
   ============================================ */

.service-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* ============================================
   IMAGEN - ASPECT RATIO SIN VH
   ============================================ */

.service-image-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f3f4f6;
  flex-shrink: 0;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}

.service-card:hover .service-image {
  transform: scale(1.05);
}

/* ============================================
   CONTENIDO - FLEXBOX VERTICAL
   ============================================ */

.service-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  flex-grow: 1;
}

/* ============================================
   ICON BADGE - EN FLUJO NORMAL
   ============================================ */

.service-icon-badge {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke: white;
  fill: none;
  flex-shrink: 0;
}

/* ============================================
   TEXTOS
   ============================================ */

.service-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.service-description {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}

/* ============================================
   FEATURES LIST
   ============================================ */

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
}

.feature-check {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

/* ============================================
   BUTTON CTA
   ============================================ */

.service-button {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.service-button:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.service-button:active {
  transform: translateY(0);
}

/* ============================================
   TABLET (640px+)
   ============================================ */

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .service-content {
    padding: 2rem;
  }

  .service-title {
    font-size: 1.375rem;
  }
}

/* ============================================
   DESKTOP (1024px+) - 3 COLUMNAS
   ============================================ */

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .service-image-container {
    aspect-ratio: 16 / 12;
  }

  .service-content {
    padding: 2rem;
  }

  .service-icon-badge {
    width: 3.5rem;
    height: 3.5rem;
  }

  .service-icon {
    width: 1.75rem;
    height: 1.75rem;
  }

  .service-card:hover {
    transform: translateY(-4px);
  }
}

/* ============================================
   LARGE DESKTOP (1440px+)
   ============================================ */

@media (min-width: 1440px) {
  .services-grid {
    gap: 2rem;
  }

  .service-content {
    padding: 2.5rem;
  }

  .service-title {
    font-size: 1.5rem;
  }
}
</style>