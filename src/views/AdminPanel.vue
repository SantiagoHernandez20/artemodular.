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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
            <button @click="filterStatus = 'all'"
              :class="filterStatus === 'all' ? 'bg-8D5524 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors">
              Todos ({{ allTestimonials }})
            </button>
            <button @click="filterStatus = 'pending'"
              :class="filterStatus === 'pending' ? 'bg-8D5524 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors">
              Pendientes ({{ pendingTestimonials }})
            </button>
            <button @click="filterStatus = 'approved'"
              :class="filterStatus === 'approved' ? 'bg-8D5524 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors">
              Aprobados ({{ approvedTestimonials }})
            </button>
            <button @click="filterStatus = 'rejected'"
              :class="filterStatus === 'rejected' ? 'bg-8D5524 text-white' : 'bg-gray-200 text-gray-700'"
              class="px-4 py-2 rounded-lg font-medium transition-colors">
              Rechazados ({{ rejectedTestimonials }})
            </button>
          </div>

          <!-- Lista de testimonios -->
          <div class="space-y-4">
            <div v-if="filteredTestimonials.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay testimonios</h3>
              <p class="mt-1 text-sm text-gray-500">No se encontraron testimonios con el filtro seleccionado.</p>
            </div>

            <div v-for="testimonial in filteredTestimonials" :key="testimonial.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                  

                  </div>
                  <p class="text-gray-600 mb-2">{{ testimonial.message }}</p>
                  <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span>{{ testimonial.email }}</span>
                    <span>{{ formatDate(testimonial.createdAt) }}</span>
                  </div>
                </div>

                <div v-if="testimonial.status === 'pending'" class="">
                  <button @click="approveTestimonial(testimonial.id)"
                    class="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-full sm:w-auto">
                    Aprobar
                  </button>
                  <button @click="rejectTestimonial(testimonial.id)"
                    class="px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors w-full sm:w-auto"
                    id="btn_reject">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import config from '../config/index.js'

export default {
  name: 'AdminPanel',
  setup() {
    const authStore = useAuthStore()
    const filterStatus = ref('all')
    const testimonials = ref([])

    // Función para mapear testimonios del backend al formato de UI
    const mapTestimonials = (data) => {
      return data.map(t => {
        let status = 'pending'
        if (typeof t.is_reject === 'string') {
          status = t.is_reject
        } else if (typeof t.is_reject === 'boolean') {
          if (t.is_reject === true) {
            status = 'rejected'
          } else if (t.is_approved === true) {
            status = 'approved'
          } else {
            status = 'pending'
          }
        } else {
          if (t.is_approved === true) {
            status = 'approved'
          } else {
            status = 'pending'
          }
        }
        return {
          id: t.id,
          name: t.name ?? '',
          email: t.email ?? '',
          message: t.content ?? '',
          status,
          createdAt: t.created_at ? new Date(t.created_at) : null,
          avatar: t.avatar ?? '',
          rating: t.rating ?? null,
          role: t.role ?? '',
          service: t.service ?? '',
          updatedAt: t.updated_at ? new Date(t.updated_at) : null
        }
      })
    }

    onMounted(() => {
      // Configurar el EventSource con el endpoint SSE
      const sseUrl = config.utils.getBackendUrl('api/testimonials/stream')
      const eventSource = new EventSource(sseUrl)

      eventSource.onmessage = (event) => {
        // Evitar el mensaje inicial de conexión
        if(event.data.trim() === 'Conexión establecida') return

        const data = JSON.parse(event.data)
        testimonials.value = mapTestimonials(data)
      }

      eventSource.onerror = (err) => {
        console.error('Error en SSE:', err)
        eventSource.close()
      }

      // Opcional: limpiar la conexión al desmontar
      onUnmounted(() => {
        eventSource.close()
      })
    })

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
      if (filterStatus.value === 'all') return testimonials.value
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

    const approveTestimonial = async (id) => {
      try {
        const apiUrl = config.utils.getBackendUrl(`/api/testimonials/${id}/approve`)
        //console.log('🌐 Aprobando testimonio:', apiUrl)
        const response = await fetch(apiUrl, { method: 'PUT' })

        if (response.ok) {
          await loadTestimonials() // Recargar datos
          console.log('✅ Testimonio aprobado')
        } else {
          const errorData = await response.json()
          console.error('❌ Error al aprobar testimonio:', errorData.message)
        }
      } catch (error) {
        console.error('❌ Error al aprobar testimonio:', error)
      }
    }

    const rejectTestimonial = async (id) => {
      try {
        const apiUrl = config.utils.getBackendUrl(`api/testimonials/${id}/reject`)
        
        // Agregamos los headers correctos y aseguramos el formato del body
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            reason: 'Testimonio rechazado por el administrador'
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al rechazar el testimonio');
        }

        const data = await response.json();
        console.log('✅ Testimonio rechazado exitosamente:', data);
        
        // Actualizar el estado del testimonio en la UI
        const testimonialIndex = testimonials.value.findIndex(t => t.id === id);
        if (testimonialIndex !== -1) {
          testimonials.value[testimonialIndex].status = 'rejected';
        }

      } catch (error) {
        console.error('❌ Error al rechazar testimonio:', error);
        // Aquí podrías agregar una notificación al usuario
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

#btn_reject {
  background-color: #F52727;
}

#btn_reject {
  color: beige;
}
</style>
