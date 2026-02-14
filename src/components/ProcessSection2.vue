<template>
  <section id="proceso" class="process-section">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro Proceso de trabajo</h2><br>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Tres etapas cuidadosamente diseñadas para garantizar la calidad y tu satisfacción
        </p>
      </div>

      <!-- Grid de pasos -->
      <div class="process-grid">
        <ProcessStep2 
          v-for="(step, index) in processSteps" 
          :key="index"
          :step="step"
        />
      </div>

      <!-- Timeline interactivo -->
      <div class="timeline-container">
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Conoce el paso a paso</h3>
        
        <div class="timeline-content">
          <div 
            v-for="(phase, index) in detailedPhases" 
            :key="phase.id"
            class="timeline-item"
            @click="togglePhase(index)"
          >
            <div class="timeline-number" :style="{ backgroundColor: '#8D5524' }">
              {{ index + 1 }}
            </div>
            
            <div class="timeline-body">
              <div class="timeline-header">
                <h4 class="timeline-phase-title">{{ phase.title }}</h4>
                <svg 
                  class="timeline-chevron"
                  :class="{ 'is-expanded': expandedPhases.includes(index) }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              <p class="timeline-summary">{{ phase.summary }}</p>
              
              <!-- Contenido expandible -->
              <div 
                v-if="expandedPhases.includes(index)" 
                class="timeline-details"
              >
                <ul class="timeline-details-list">
                  <li v-for="detail in phase.details" :key="detail" class="timeline-detail-item">
                    <svg class="timeline-check-icon" fill="currentColor" viewBox="0 0 20 20" style="color: #8D5524;">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ detail }}</span>
                  </li>
                </ul>
                
                <div class="timeline-duration">
                  <p><strong>Duración:</strong> {{ phase.duration }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import ProcessStep2 from './ProcessStep2.vue'

export default {
  name: 'ProcessSection2',
  components: {
    ProcessStep2
  },
  setup() {
    const expandedPhases = ref([])

    const processSteps = ref([
      {
        id: 1,
        category: 'Etapa 1',
        title: 'Diseño Personalizado',
        description: 'Escuchamos tus ideas y transformamos tus sueños en diseños detallados. Utilizamos herramientas avanzadas de modelado 3D para visualizar cada aspecto de tu proyecto antes de iniciar la fabricación.',
        image: '/images/proceso/diseño.webp',
        color: '#8D5524'
      },
      {
        id: 2,
        category: 'Etapa 2',
        title: 'Fabricación Experta',
        description: 'Nuestro equipo de carpinteros especializados utiliza técnicas tradicionales y tecnología moderna para crear muebles de la más alta calidad, con precisión milimétrica en cada detalle.',
        image: '/images/proceso/fabricacion.webp',
        color: '#8D5524'
      },
      {
        id: 3,
        category: 'Etapa 3',
        title: 'Montaje e Instalación',
        description: 'Instalamos tu mueble con el máximo cuidado, asegurando que encaje perfectamente en tu espacio. Te guiamos en el mantenimiento para garantizar que disfrutes de tu inversión por muchos años.',
        image: '/images/proceso/instalacion.webp',
        color: '#8D5524'
      }
    ])

    const detailedPhases = ref([
      {
        id: 1,
        title: 'Consulta inicial y medición',
        summary: 'Visitamos tu espacio para entender tus necesidades',
        duration: '1-2 días',
        details: [
          'Visita al lugar del proyecto - costo de 25.000 COP',
          'Medición precisa del espacio',
          'Análisis de necesidades y preferencias',
          'Evaluación de factibilidad',
          'Presentación de opciones iniciales'
        ]
      },
      {
        id: 2,
        title: 'Diseño y presupuesto',
        summary: 'Desarrollamos el diseño detallado y calculamos costos',
        duration: '3-5 días',
        details: [
          'Creación de diseños 3D',
          'Selección de materiales',
          'Cálculo detallado de costos',
          'Cronograma de trabajo',
          'Presentación de propuesta final'
        ]
      },
      {
        id: 3,
        title: 'Aprobación y planificación',
        summary: 'Finalizamos detalles y organizamos la producción',
        duration: '1-2 días',
        details: [
          'Revisión y aprobación del diseño',
          'Firma de contrato',
          'Programación de fechas',
          'Pedido de materiales',
          'Coordinación del equipo'
        ]
      },
      {
        id: 4,
        title: 'Fabricación en taller',
        summary: 'Construimos tu mueble con precisión artesanal',
        duration: '1-3 semanas',
        details: [
          'Corte y preparación de materiales',
          'Ensamblaje de estructuras',
          'Aplicación de acabados',
          'Control de calidad',
          'Preparación para entrega'
        ]
      },
      {
        id: 5,
        title: 'Instalación y entrega',
        summary: 'Llevamos e instalamos tu mueble en el lugar final',
        duration: '1 día',
        details: [
          'Transporte seguro al lugar',
          'Instalación profesional',
          'Ajustes finales',
          'Limpieza del área',
          'Entrega oficial del proyecto'
        ]
      }
    ])

    const togglePhase = (index) => {
      const currentIndex = expandedPhases.value.indexOf(index)
      if (currentIndex > -1) {
        expandedPhases.value.splice(currentIndex, 1)
      } else {
        expandedPhases.value.push(index)
      }
    }

    return {
      processSteps,
      detailedPhases,
      expandedPhases,
      togglePhase
    }
  }
}
</script>

<style scoped>
/* ============================================
   PROCESS SECTION - LAYOUT BASE
   ============================================ */

.process-section {
  background-color: #F5E9DA;
  padding: 3rem 0;
  width: 100%;
}

.container-custom {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* ============================================
   SECTION HEADER - USANDO TAILWIND
   ============================================ */

/* ============================================
   PROCESS GRID
   ============================================ */

.process-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  margin-bottom: 4rem;
}

/* ============================================
   TIMELINE SECTION
   ============================================ */

.timeline-container {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* .timeline-title - Usando Tailwind text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center */

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ============================================
   TIMELINE ITEM
   ============================================ */

.timeline-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.timeline-item:hover {
  background-color: #f9fafb;
}

/* ============================================
   TIMELINE NUMBER
   ============================================ */

.timeline-number {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  font-size: 1rem;
}

/* ============================================
   TIMELINE BODY
   ============================================ */

.timeline-body {
  flex-grow: 1;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.timeline-phase-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.timeline-chevron {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.timeline-chevron.is-expanded {
  transform: rotate(180deg);
}

.timeline-summary {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0.5rem 0 0;
  line-height: 1.5;
}

/* ============================================
   TIMELINE DETAILS (EXPANDIBLE)
   ============================================ */

.timeline-details {
  margin-top: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.timeline-details-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
}

.timeline-check-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.timeline-duration {
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #F5E9DA;
  font-size: 0.875rem;
  color: #8D5524;
  margin: 0;
}

.timeline-duration p {
  margin: 0;
}

/* ============================================
   ANIMACIÓN
   ============================================ */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   TABLET (640px+)
   ============================================ */

@media (min-width: 640px) {
  .process-section {
    padding: 4rem 0;
  }

  .section-header {
    margin-bottom: 3.5rem;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .timeline-container {
    padding: 2.5rem;
  }

  .timeline-number {
    width: 3rem;
    height: 3rem;
    font-size: 1.125rem;
  }
}

/* ============================================
   DESKTOP (1024px+) - 3 COLUMNAS
   ============================================ */

@media (min-width: 1024px) {
  .process-section {
    padding: 5rem 0;
  }

  .process-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 5rem;
  }

  .timeline-container {
    padding: 3rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .timeline-item {
    padding: 1.5rem;
  }

  .timeline-phase-title {
    font-size: 1.25rem;
  }
}

/* ============================================
   LARGE DESKTOP (1440px+)
   ============================================ */

@media (min-width: 1440px) {
  .process-section {
    padding: 6rem 0;
  }

  .process-grid {
    gap: 2.5rem;
  }

  .timeline-container {
    padding: 3.5rem;
  }
}
</style>
