<template>
  <div class="flex items-start space-x-4">
    <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
      <component :is="getIcon(icon)" class="w-6 h-6" />
    </div>
    
    <div>
      <h4 class="font-semibold text-lg mb-1">{{ title }}</h4>
      <a 
        v-if="href" 
        :href="href"
        class="text-xl text-amber-100 hover:text-white transition-colors block"
      >
        {{ content }}
      </a>
      <p v-else class="text-xl text-amber-100">{{ content }}</p>
      <p class="text-sm text-amber-200 mt-1">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: null
    }
  },
  setup() {
    const getIcon = (iconName) => {
      const icons = {
        'PhoneIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            `
          }
        },
        'EmailIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            `
          }
        },
        'LocationIcon': () => {
          return {
            template: `
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            `
          }
        }
      }
      
      return icons[iconName] ? icons[iconName]() : icons['PhoneIcon']()
    }

    return {
      getIcon
    }
  }
}
</script>
