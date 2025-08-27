<template>
  <div class="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      Comparte tu experiencia con ArteModular
    </h3>
    
    <form @submit.prevent="submitTestimonial" class="space-y-6">
      <!-- Nombre -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Nombre completo *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-colors"
          placeholder="Tu nombre completo"
        />
      </div>

      <!-- Profesión/Rol -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
          Profesión o rol *
        </label>
        <input
          id="role"
          v-model="form.role"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-colors"
          placeholder="Ej: Arquitecto, Propietario, Diseñador"
        />
      </div>

      <!-- Servicio -->
      <div>
        <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
          Servicio contratado *
        </label>
        <select
          id="service"
          v-model="form.service"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-colors"
        >
          <option value="">Selecciona un servicio</option>
          <option value="Cocina integral">Cocina integral</option>
          <option value="Carpintería de obra">Carpintería de obra</option>
          <option value="Muebles decorativos">Muebles decorativos</option>
          <option value="Oficina completa">Oficina completa</option>
          <option value="Closet">Closet</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <!-- Calificación -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Calificación *
        </label>
        <div class="flex space-x-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="form.rating = star"
            class="text-3xl transition-all duration-200 hover:scale-110"
            :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'"
          >
            ★
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          {{ form.rating > 0 ? `${form.rating} estrella${form.rating > 1 ? 's' : ''} seleccionada${form.rating > 1 ? 's' : ''}` : 'Selecciona una calificación' }}
        </p>
      </div>

      <!-- Comentario -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
          Tu experiencia *
        </label>
        <textarea
          id="content"
          v-model="form.content"
          rows="4"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-colors resize-none"
          placeholder="Cuéntanos sobre tu experiencia trabajando con ArteModular..."
        ></textarea>
        <p class="text-sm text-gray-500 mt-1">
          {{ form.content.length }}/1000 caracteres
        </p>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        class="w-full bg-brown-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-brown-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span v-if="isSubmitting">Enviando...</span>
        <span v-else>Enviar testimonio</span>
      </button>
    </form>

    <!-- Mensaje de éxito/error -->
    <div v-if="message" class="mt-6 p-4 rounded-lg border" :class="messageType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'">
      <div class="flex items-center">
        <svg v-if="messageType === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { testimonialService } from '@/services/testimonialService'

export default {
  name: 'TestimonialForm',
  emits: ['testimonial-created'],
  setup(props, { emit }) {
    const form = reactive({
      name: '',
      role: '',
      service: '',
      content: '',
      rating: 0
    })

    const isSubmitting = ref(false)
    const message = ref('')
    const messageType = ref('')

    const isFormValid = computed(() => {
      return form.name.trim() && 
             form.role.trim() && 
             form.service && 
             form.content.trim().length >= 10 && 
             form.rating > 0
    })

    const clearMessage = () => {
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }

    const submitTestimonial = async () => {
      if (!isFormValid.value) {
        message.value = 'Por favor completa todos los campos correctamente'
        messageType.value = 'error'
        clearMessage()
        return
      }

      isSubmitting.value = true
      message.value = ''

      try {
        const result = await testimonialService.createTestimonial(form)
        
        message.value = result.message
        messageType.value = 'success'
        
        // Limpiar formulario
        Object.assign(form, {
          name: '',
          role: '',
          service: '',
          content: '',
          rating: 0
        })

        // Emitir evento para que el padre sepa que se creó un testimonio
        emit('testimonial-created')
        
        clearMessage()
      } catch (error) {
        message.value = error.message || 'Error al enviar el testimonio'
        messageType.value = 'error'
        clearMessage()
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      isSubmitting,
      message,
      messageType,
      isFormValid,
      submitTestimonial
    }
  }
}
</script>

<style scoped>
.bg-brown-600 {
  background-color: #8D5524;
}

.bg-brown-700 {
  background-color: #7A4A1F;
}

.focus\:ring-brown-500:focus {
  --tw-ring-color: #8D5524;
}
</style>
