<template>
  <section id="contacto" style="background: linear-gradient(to bottom right, #8D5524, #6B3F1A);"
    class="section-padding text-white">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Información de contacto -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu hogar?
          </h2>

          <p style="font-size: 1.25rem; color: #F5E9DA; margin-bottom: 2rem; line-height: 1.75;">
            Contáctanos para una consulta gratuita. Estamos disponibles 24/7 para atender tu proyecto
            y hacer realidad la casa de tus sueños.
          </p>

          <!-- Información de contacto -->
          <div class="space-y-6 mb-8">
            <ContactInfo icon="PhoneIcon" title="Llámanos ahora" content="313 358-9795"
              subtitle="Disponible 24 horas del día" href="tel:+573133589795" />

            <ContactInfo icon="EmailIcon" title="Envíanos un email" content="info@artemodular.com"
              subtitle="Te respondemos en menos de 24h" href="mailto:info@artemodular.com" />

            <ContactInfo icon="LocationIcon" title="Visítanos" content="Medellín, Colombia"
              subtitle="Servicio a domicilio" />
          </div>

          <!-- Redes sociales -->
          <div class="flex space-x-4">
            <a href="#"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
              </svg>
            </a>
            <a href="#"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Formulario de contacto -->
        <div class="backdrop-blur-sm rounded-2xl p-8"
          style="background: rgba(245, 233, 218, 0.95); backdrop-filter: blur(10px);">
          <h3 class="text-2xl font-bold mb-6" style="color: #8D5524;">Solicita tu presupuesto gratuito</h3>

          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2" style="color: #8D5524;">Nombre</label>
                <input v-model="form.name" type="text" required
                  class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors form-input"
                  placeholder="Tu nombre completo">
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" style="color: #8D5524;">Teléfono</label>
                <input v-model="form.phone" type="tel" required
                  class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors form-input"
                  placeholder="313 000 0000">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" style="color: #8D5524;">Email</label>
              <input v-model="form.email" type="email" required
                class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors form-input"
                placeholder="tu@email.com">
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" style="color: #8D5524;">Tipo de proyecto</label>
              <select v-model="form.projectType" required
                class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors form-input">
                <option value="" disabled class="text-gray-900">Selecciona una opción</option>
                <option value="cocina" class="text-gray-900">Cocina integral</option>
                <option value="closet" class="text-gray-900">Closet o vestidor</option>
                <option value="muebles" class="text-gray-900">Muebles decorativos</option>
                <option value="oficina" class="text-gray-900">Muebles de oficina</option>
                <option value="obra" class="text-gray-900">Carpintería de obra</option>
                <option value="otro" class="text-gray-900">Otro proyecto</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2" style="color: #8D5524;">Describe tu proyecto</label>
              <textarea v-model="form.message" rows="4" required
                class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-colors form-input resize-none"
                placeholder="Cuéntanos qué tienes en mente, medidas aproximadas, presupuesto, etc."></textarea>
            </div>

            <button type="submit" :disabled="isSubmitting"
              class="w-full btn-primary font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="!isSubmitting">Enviar solicitud</span>
              <span v-else>Enviando...</span>
            </button>

            <p class="text-sm text-center" style="color: #8D5524;">
              Te contactaremos en menos de 24 horas para programar una visita gratuita.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue'
import ContactInfo from './ContactInfo.vue'

export default {
  name: 'ContactSection',
  components: {
    ContactInfo
  },
  setup() {

    const isSubmitting = ref(false)

    const form = reactive({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      message: ''
    })

    const submitForm = async () => {
      isSubmitting.value = true

      try {
        // Validar campos requeridos
        if (!form.name || !form.email || !form.phone || !form.projectType || !form.message) {
          alert('Por favor completa todos los campos.')
          return
        }

        // URL del backend (configurable via variable de entorno)
        const backendURL = 'http://localhost:3001'



        // Enviar al backend Express + Nodemailer
        const response = await fetch(`${backendURL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            projectType: form.projectType,
            message: form.message
          })
        })

        const result = await response.json()
        if (!response.ok) {
          if (result.errors) {
            alert(result.errors.map(e => e.msg).join('\\n'))
          }
          throw new Error(result.message || 'Error al enviar el formulario')
        }

        console.log('Email enviado exitosamente:', result)

        // Limpiar formulario
        Object.keys(form).forEach(key => {
          form[key] = ''
        })

        alert('¡Gracias por tu solicitud! Hemos enviado una confirmación a tu email. Te contactaremos en menos de 24 horas.')
      } catch (error) {
        console.error('Error al enviar email:', error)

        // Mensaje de error específico
        let errorMessage = 'Hubo un error al enviar tu solicitud. '

        if (error.message.includes('Failed to fetch')) {
          errorMessage += 'No pudimos conectar con el servidor. '
        } else if (error.message.includes('Demasiados emails')) {
          errorMessage += 'Has enviado demasiados emails recientemente. Espera un momento. '
        } else {
          errorMessage += 'Intenta de nuevo en unos minutos. '
        }

        errorMessage += 'O contáctanos directamente al 313 358-9795.'

        alert(errorMessage)
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      form,
      isSubmitting,
      submitForm
    }
  }
}
</script>

<style scoped>
/* Estilos para inputs del formulario */
.form-input {
  background-color: white;
  border-color: #E6D4C1;
  color: #8D5524;
}

.form-input::placeholder {
  color: #B8956F;
  opacity: 0.7;
}

.form-input:focus {
  border-color: #8D5524;
  box-shadow: 0 0 0 3px rgba(141, 85, 36, 0.1);
}

.form-input:hover {
  border-color: #A66B2E;
}

/* Estilos específicos para select */
select.form-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238D5524' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem 1.25rem;
  padding-right: 2.5rem;
}

select.form-input option {
  color: #8D5524;
  background-color: white;
}

/* Mejora la legibilidad del placeholder en select */
select.form-input:invalid {
  color: #B8956F;
}
</style>
