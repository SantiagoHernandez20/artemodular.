<template>
  <div class="admin-panel min-h-screen bg-gray-50">
    <!-- Header del panel -->
    <div class="bg-white shadow-sm border-b">
      <div class="container-custom py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p class="text-gray-600 mt-2">Gestiona testimonios y contenido del sitio</p>
          </div>
          
          <!-- Información del usuario -->
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="font-medium text-gray-900">{{ authStore.user?.displayName || 'Administrador' }}</div>
              <div class="text-sm text-gray-500">{{ authStore.user?.email }}</div>
            </div>
            <div class="w-10 h-10 bg-8D5524 rounded-full flex items-center justify-center text-white font-semibold">
              {{ getInitials(authStore.user?.displayName || 'A') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="container-custom py-8">
      <!-- Estadísticas rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Testimonios Pendientes</h3>
              <p class="text-3xl font-bold text-blue-600">{{ pendingTestimonials }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Testimonios Aprobados</h3>
              <p class="text-3xl font-bold text-green-600">{{ approvedTestimonials }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Testimonios Rechazados</h3>
              <p class="text-3xl font-bold text-red-600">{{ rejectedTestimonials }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tablero de aprobación de testimonios -->
      <div class="bg-white rounded-lg shadow-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Aprobación de Testimonios</h2>
          <p class="text-gray-600 mt-1">Revisa y aprueba los testimonios enviados por los clientes</p>
        </div>

        <div class="p-6">
          <!-- Filtros -->
          <div class="flex flex-wrap gap-4 mb-6">
            <button 
              @click="filterStatus = 'all'"
              :class="filterStatus === 'all' ? 'bg-8D5524 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Todos ({{ allTestimonials }})
            </button>
            <button 
              @click="filterStatus = 'pending'"
              :class="filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Pendientes ({{ pendingTestimonials }})
            </button>
            <button 
              @click="filterStatus = 'approved'"
              :class="filterStatus === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Aprobados ({{ approvedTestimonials }})
            </button>
          </div>

          <!-- Lista de testimonios -->
          <div class="space-y-4">
            <div v-if="filteredTestimonials.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay testimonios</h3>
              <p class="mt-1 text-sm text-gray-500">No se encontraron testimonios con el filtro seleccionado.</p>
            </div>

            <div 
              v-for="testimonial in filteredTestimonials" 
              :key="testimonial.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                    <span 
                      :class="getStatusClass(testimonial.status)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ getStatusText(testimonial.status) }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-2">{{ testimonial.message }}</p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{{ testimonial.email }}</span>
                    <span>{{ formatDate(testimonial.createdAt) }}</span>
                  </div>
                </div>
                
                <div v-if="testimonial.status === 'pending'" class="flex space-x-2 ml-4">
                  <button 
                    @click="approveTestimonial(testimonial.id)"
                    class="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Aprobar
                  </button>
                  <button 
                    @click="rejectTestimonial(testimonial.id)"
                    class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'AdminPanel',
  setup() {
    const authStore = useAuthStore()
    const filterStatus = ref('all')
    
    // Datos de ejemplo - en producción vendrían de una API
    const testimonials = ref([
      {
        id: 1,
        name: 'María González',
        email: 'maria@email.com',
        message: 'Excelente trabajo, muy profesional y puntual. Recomiendo totalmente sus servicios.',
        status: 'pending',
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: 'Carlos Rodríguez',
        email: 'carlos@email.com',
        message: 'La calidad del trabajo superó mis expectativas. Definitivamente volveré a contratarlos.',
        status: 'approved',
        createdAt: new Date('2024-01-14')
      },
      {
        id: 3,
        name: 'Ana Martínez',
        email: 'ana@email.com',
        message: 'Muy contenta con el resultado final. El equipo fue muy atento y profesional.',
        status: 'approved',
        createdAt: new Date('2024-01-13')
      },
      {
        id: 4,
        name: 'Luis Pérez',
        email: 'luis@email.com',
        message: 'Trabajo de mala calidad, no cumplieron con lo acordado.',
        status: 'rejected',
        createdAt: new Date('2024-01-12')
      }
    ])
    
    const getInitials = (name) => {
      if (!name) return 'A'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const allTestimonials = computed(() => testimonials.value.length)
    const pendingTestimonials = computed(() => testimonials.value.filter(t => t.status === 'pending').length)
    const approvedTestimonials = computed(() => testimonials.value.filter(t => t.status === 'approved').length)
    const rejectedTestimonials = computed(() => testimonials.value.filter(t => t.status === 'rejected').length)

    const filteredTestimonials = computed(() => {
      if (filterStatus.value === 'all') {
        return testimonials.value
      }
      return testimonials.value.filter(t => t.status === filterStatus.value)
    })

    const getStatusClass = (status) => {
      switch (status) {
        case 'pending':
          return 'bg-blue-100 text-blue-800'
        case 'approved':
          return 'bg-green-100 text-green-800'
        case 'rejected':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'pending':
          return 'Pendiente'
        case 'approved':
          return 'Aprobado'
        case 'rejected':
          return 'Rechazado'
        default:
          return 'Desconocido'
      }
    }

    const formatDate = (date) => {
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date)
    }

    const approveTestimonial = (id) => {
      const testimonial = testimonials.value.find(t => t.id === id)
      if (testimonial) {
        testimonial.status = 'approved'
      }
    }

    const rejectTestimonial = (id) => {
      const testimonial = testimonials.value.find(t => t.id === id)
      if (testimonial) {
        testimonial.status = 'rejected'
      }
    }

    return {
      authStore,
      filterStatus,
      testimonials,
      allTestimonials,
      pendingTestimonials,
      approvedTestimonials,
      rejectedTestimonials,
      filteredTestimonials,
      getInitials,
      getStatusClass,
      getStatusText,
      formatDate,
      approveTestimonial,
      rejectTestimonial
    }
  }
}
</script>

<style scoped>
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.bg-8D5524 {
  background-color: #8D5524;
}
</style>
