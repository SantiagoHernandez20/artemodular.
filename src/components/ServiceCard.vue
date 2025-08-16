<template>
  <div 
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-200 p-6"
    @click="$emit('click')"
  >
    <div class="text-center">
      <!-- Icono -->
      <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <component :is="getIcon(service.icon)" class="w-8 h-8 text-amber-600" />
      </div>
      
      <!-- Título -->
      <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
      
      <!-- Descripción -->
      <p class="text-gray-600 mb-4">{{ service.description }}</p>
      
      <!-- CTA -->
      <div class="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
        Conocer más
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup() {
    const getIcon = (iconName) => {
      const icons = {
        'BuildingIcon': () => {
          return {
            template: `
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 8a1 1 0 011-1h4a1 1 0 011 1v4H7v-4z" clip-rule="evenodd"/>
              </svg>
            `
          }
        },
        'HomeIcon': () => {
          return {
            template: `
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            `
          }
        },
        'SparklesIcon': () => {
          return {
            template: `
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0V6H3a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 8.134a1 1 0 010 1.732L14.146 10.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 10.8 6.5 9.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clip-rule="evenodd"/>
              </svg>
            `
          }
        }
      }
      
      return icons[iconName] ? icons[iconName]() : icons['HomeIcon']()
    }

    return {
      getIcon
    }
  }
}
</script>
