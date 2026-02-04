<template>
  <section id="proceso" style="background-color: #F5E9DA;" class="section-padding">
    <div class="container-custom">
      <!-- Encabezado -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nuestro proceso de trabajo
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Si tienes un proyecto específico en mente o necesitas orientación sobre por dónde empezar, 
          nuestro equipo está aquí para ayudarte en cada paso del proceso.
        </p>
      </div>

      <!-- Proceso paso a paso -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <ProcessStep
          v-for="(step, index) in processSteps"
          :key="step.id"
          :step="step"
          :stepNumber="index + 1"
          :isLast="index === processSteps.length - 1"
        />
      </div>

      <!-- Timeline interactivo -->
      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Conoce el paso a paso</h3>
        
        <div class="space-y-6">
          <div 
            v-for="(phase, index) in detailedPhases" 
            :key="phase.id"
            class="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            @click="togglePhase(index)"
          >
            <div class="flex-shrink-0">
              <div class="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold" style="background-color: #8D5524;">
                {{ index + 1 }}
              </div>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="text-lg font-semibold text-gray-900">{{ phase.title }}</h4>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': expandedPhases.includes(index) }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
              
              <p class="text-gray-600 mt-1">{{ phase.summary }}</p>
              
              <!-- Contenido expandible -->
              <div 
                v-if="expandedPhases.includes(index)" 
                class="mt-4 space-y-3 animate-fadeIn"
              >
                <ul class="space-y-2">
                  <li v-for="detail in phase.details" :key="detail" class="flex items-start gap-2">
                    <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style="color: #8D5524;">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-gray-700">{{ detail }}</span>
                  </li>
                </ul>
                
                <div class="p-3 rounded-lg" style="background-color: #F5E9DA;">
                  <p class="text-sm" style="color: #8D5524;">
                    <strong>Duración:</strong> {{ phase.duration }}
                  </p>
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
import ProcessStep from './ProcessStep.vue'

export default {
  name: 'ProcessSection',
  components: {
    ProcessStep
  },
  setup() {
    const expandedPhases = ref([])

    const processSteps = ref([
      {
        id: 1,
        title: 'Diseño Personalizado',
        description: 'Creamos el diseño perfecto según tus necesidades y espacio',
        icon: 'DesignIcon'
      },
      {
        id: 2,
        title: 'Fabricación',
        description: 'Construimos con materiales de primera calidad y técnicas especializadas',
        icon: 'BuildIcon'
      },
      {
        id: 3,
        title: 'Montaje Profesional',
        description: 'Instalamos y entregamos tu proyecto listo para usar',
        icon: 'InstallIcon'
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

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
