<template>
  <div class="relative">
    <!-- Conexión entre pasos -->
    <div v-if="!isLast" class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-amber-200 transform translate-x-1/2"></div>
    
    <div class="bg-white rounded-xl shadow-lg p-6 relative z-10 text-center">
      <!-- Número del paso -->
      <div class="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {{ stepNumber }}
      </div>
      
      <!-- Icono -->
      <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <component :is="getIcon(step.icon)" class="w-6 h-6 text-amber-600" />
      </div>
      
      <!-- Contenido -->
      <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
      <p class="text-gray-600">{{ step.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessStep',
  props: {
    step: {
      type: Object,
      required: true
    },
    stepNumber: {
      type: Number,
      required: true
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const getIcon = (iconName) => {
      const icons = {
        'DesignIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
              </svg>
            `
          }
        },
        'BuildIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
            `
          }
        },
        'InstallIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
            `
          }
        }
      }
      
      return icons[iconName] ? icons[iconName]() : icons['DesignIcon']()
    }

    return {
      getIcon
    }
  }
}
</script>
