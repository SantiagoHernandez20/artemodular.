<template>
  <div class="bg-gray-50 p-8 mx-4">
    <div class="max-w-3xl mx-auto text-center">
      <!-- Comillas decorativas -->
      <div style="font-size: 4rem; color: #8D5524; margin-bottom: 1.5rem; opacity: 0.2;">"</div>
      
      <!-- Contenido del testimonial -->
      <blockquote class="text-xl text-gray-700 leading-relaxed mb-8">
        {{ testimonial.content }}
      </blockquote>
      
      <!-- Estrellas de rating -->
      <div v-if="testimonial.rating" class="flex justify-center mb-6">
        <div class="flex space-x-1">
          <svg 
            v-for="star in 5" 
            :key="star"
            class="w-5 h-5"
            :style="{ color: star <= testimonial.rating ? '#8D5524' : '#D1D5DB' }"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>
      
      <!-- Información del cliente -->
      <div class="flex items-center justify-center space-x-4">
        <!-- Avatar -->
        <div style="width: 3rem; height: 3rem; background-color: #8D5524; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">
          {{ testimonial.avatar || getInitials(testimonial.name) }}
        </div>
        
        <!-- Datos del cliente -->
        <div style="text-align: left;">
          <div style="font-weight: 600; color: #111827;">{{ testimonial.name }}</div>
          <div v-if="testimonial.role" style="font-size: 0.875rem; color: #4B5563;">{{ testimonial.role }}</div>
          <div v-if="testimonial.service" style="font-size: 0.875rem; color: #8D5524; font-weight: 500;">{{ testimonial.service }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialCard',
  props: {
    testimonial: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const getInitials = (name) => {
      if (!name) return 'U'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return {
      getInitials
    }
  }
}
</script>
