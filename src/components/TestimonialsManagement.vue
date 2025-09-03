<template>
  <div class="testimonials-management">
    <!-- Header con estadísticas -->
    <div class="stats-header mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Gestión de Testimonios</h2>
      
      <!-- Estadísticas -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ stats.total }}</div>
          <div class="stat-label">Total</div>
        </div>
        <div class="stat-card pending">
          <div class="stat-number">{{ stats.pending }}</div>
          <div class="stat-label">Pendientes</div>
        </div>
        <div class="stat-card approved">
          <div class="stat-number">{{ stats.approved }}</div>
          <div class="stat-label">Aprobados</div>
        </div>
      </div>
    </div>

    <!-- Tabs de filtro -->
    <div class="filter-tabs mb-6">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
      >
        {{ tab.label }}
        <span class="tab-count">{{ getCountForTab(tab.id) }}</span>
      </button>
    </div>

    <!-- Lista de testimonios -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando testimonios...</p>
    </div>

    <div v-else-if="filteredTestimonials.length === 0" class="empty-state">
      <p>No hay testimonios en esta categoría</p>
    </div>

    <div v-else class="testimonials-list">
      <div 
        v-for="testimonial in filteredTestimonials" 
        :key="testimonial.id"
        class="testimonial-card"
        :class="{ 'pending': !testimonial.is_approved, 'approved': testimonial.is_approved }"
      >
        <!-- Header del testimonio -->
        <div class="testimonial-header">
          <div class="testimonial-info">
            <h3 class="testimonial-author">{{ testimonial.name || 'Usuario' }}</h3>
            <div class="testimonial-meta">
              <span v-if="testimonial.role" class="testimonial-role">{{ testimonial.role }}</span>
              <span v-if="testimonial.service" class="testimonial-service">{{ testimonial.service }}</span>
            </div>
          </div>
          
          <!-- Estado del testimonio -->
          <div class="testimonial-status">
            <span :class="['status-badge', testimonial.is_approved ? 'approved' : 'pending']">
              {{ testimonial.is_approved ? 'Aprobado' : 'Pendiente' }}
            </span>
          </div>
        </div>

        <!-- Contenido del testimonio -->
        <div class="testimonial-content">
          <p>{{ testimonial.content }}</p>
        </div>

        <!-- Rating -->
        <div v-if="testimonial.rating" class="testimonial-rating">
          <div class="stars">
            <span 
              v-for="star in 5" 
              :key="star"
              :class="['star', { filled: star <= testimonial.rating }]"
            >
              ★
            </span>
          </div>
        </div>

        <!-- Fechas -->
        <div class="testimonial-dates">
          <span class="date">Creado: {{ formatDate(testimonial.created_at) }}</span>
          <span v-if="testimonial.updated_at" class="date">Actualizado: {{ formatDate(testimonial.updated_at) }}</span>
        </div>

        <!-- Botones de acción -->
        <div v-if="!testimonial.is_approved" class="action-buttons">
          <button 
            @click="approveTestimonial(testimonial.id)"
            :disabled="processing === testimonial.id"
            class="btn-approve"
          >
            {{ processing === testimonial.id ? 'Aprobando...' : 'Aprobar' }}
          </button>
          <button 
            @click="openRejectModal(testimonial)"
            :disabled="processing === testimonial.id"
            class="btn-reject"
          >
            Rechazar
          </button>
        </div>

        <!-- Botón de eliminar -->
        <div class="delete-section">
          <button 
            @click="deleteTestimonial(testimonial.id)"
            :disabled="processing === testimonial.id"
            class="btn-delete"
          >
            {{ processing === testimonial.id ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>

        <!-- Razón del rechazo -->
        <div v-if="!testimonial.is_approved && testimonial.rejection_reason" class="rejection-reason">
          <strong>Razón del rechazo:</strong> {{ testimonial.rejection_reason }}
        </div>
      </div>
    </div>

    <!-- Modal de rechazo -->
    <div v-if="showRejectModal" class="modal-overlay" @click="closeRejectModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Rechazar Testimonio</h3>
        <p class="modal-subtitle">¿Estás seguro de que quieres rechazar este testimonio?</p>
        
        <div class="form-group">
          <label for="rejection-reason">Razón del rechazo (opcional):</label>
          <textarea 
            id="rejection-reason"
            v-model="rejectionReason"
            placeholder="Escribe una razón para el rechazo..."
            rows="3"
          ></textarea>
        </div>
        
        <div class="modal-actions">
          <button @click="closeRejectModal" class="btn-cancel">Cancelar</button>
          <button @click="confirmReject" class="btn-confirm-reject">Rechazar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import config from '../config/index.js'

export default {
  name: 'TestimonialsManagement',
  setup() {
    const testimonials = ref([])
    const isLoading = ref(true)
    const processing = ref(null)
    const activeTab = ref('all')
    const stats = ref({ total: 0, pending: 0, approved: 0 })
    
    // Modal de rechazo
    const showRejectModal = ref(false)
    const selectedTestimonial = ref(null)
    const rejectionReason = ref('')

    const tabs = [
      { id: 'all', label: 'Todos' },
      { id: 'pending', label: 'Pendientes' },
      { id: 'approved', label: 'Aprobados' }
    ]

    // Cargar testimonios
    const loadTestimonials = async () => {
      try {
        isLoading.value = true
        const apiUrl = config.utils.getBackendUrl(config.backend.endpoints.testimonials)
        console.log('🌐 Cargando testimonios desde:', apiUrl)
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const allTestimonials = await response.json()
        testimonials.value = allTestimonials
        await loadStats()
      } catch (error) {
        console.error('Error al cargar testimonios:', error)
      } finally {
        isLoading.value = false
      }
    }

    // Cargar estadísticas
    const loadStats = async () => {
      try {
        const statsData = await config.utils.getBackendUrl(config.backend.endpoints.testimonialsStats)
        const response = await fetch(statsData)
        
        if (response.ok) {
          const result = await response.json()
          stats.value = result.data
        } else {
          // Calcular estadísticas localmente si falla la API
          stats.value = {
            total: testimonials.value.length,
            pending: testimonials.value.filter(t => !t.is_approved).length,
            approved: testimonials.value.filter(t => t.is_approved).length
          }
        }
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
        // Calcular estadísticas localmente
        stats.value = {
          total: testimonials.value.length,
          pending: testimonials.value.filter(t => !t.is_approved).length,
          approved: testimonials.value.filter(t => t.is_approved).length
        }
      }
    }

    // Filtrar testimonios por tab activo
    const filteredTestimonials = computed(() => {
      switch (activeTab.value) {
        case 'pending':
          return testimonials.value.filter(t => !t.is_approved)
        case 'approved':
          return testimonials.value.filter(t => t.is_approved)
        default:
          return testimonials.value
      }
    })

    // Obtener conteo para cada tab
    const getCountForTab = (tabId) => {
      switch (tabId) {
        case 'pending':
          return stats.value.pending
        case 'approved':
          return stats.value.approved
        default:
          return stats.value.total
      }
    }

    // Aprobar testimonio
    const approveTestimonial = async (testimonialId) => {
      try {
        processing.value = testimonialId
        const apiUrl = config.utils.getBackendUrl(config.backend.endpoints.testimonialsApprove.replace(':id', testimonialId))
        
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // Actualizar estado local
        const testimonial = testimonials.value.find(t => t.id === testimonialId)
        if (testimonial) {
          testimonial.is_approved = true
          testimonial.updated_at = new Date().toISOString()
        }
        
        await loadStats()
      } catch (error) {
        console.error('Error al aprobar testimonio:', error)
        alert('Error al aprobar testimonio: ' + error.message)
      } finally {
        processing.value = null
      }
    }

    // Abrir modal de rechazo
    const openRejectModal = (testimonial) => {
      selectedTestimonial.value = testimonial
      rejectionReason.value = ''
      showRejectModal.value = true
    }

    // Cerrar modal de rechazo
    const closeRejectModal = () => {
      showRejectModal.value = false
      selectedTestimonial.value = null
      rejectionReason.value = ''
    }

    // Confirmar rechazo
    const confirmReject = async () => {
      if (!selectedTestimonial.value) return
      
      try {
        processing.value = selectedTestimonial.value.id
        const apiUrl = config.utils.getBackendUrl(config.backend.endpoints.testimonialsReject.replace(':id', selectedTestimonial.value.id))
        
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reason: rejectionReason.value })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // Actualizar estado local
        const testimonial = testimonials.value.find(t => t.id === selectedTestimonial.value.id)
        if (testimonial) {
          testimonial.is_approved = false
          testimonial.rejection_reason = rejectionReason.value
          testimonial.updated_at = new Date().toISOString()
        }
        
        await loadStats()
        closeRejectModal()
      } catch (error) {
        console.error('Error al rechazar testimonio:', error)
        alert('Error al rechazar testimonio: ' + error.message)
      } finally {
        processing.value = null
      }
    }

    // Eliminar testimonio
    const deleteTestimonial = async (testimonialId) => {
      if (!confirm('¿Estás seguro de que quieres eliminar este testimonio?')) return
      
      try {
        processing.value = testimonialId
        const apiUrl = config.utils.getBackendUrl(config.backend.endpoints.testimonialsDelete.replace(':id', testimonialId))
        
        const response = await fetch(apiUrl, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        // Remover del array local
        testimonials.value = testimonials.value.filter(t => t.id !== testimonialId)
        await loadStats()
      } catch (error) {
        console.error('Error al eliminar testimonio:', error)
        alert('Error al eliminar testimonio: ' + error.message)
      } finally {
        processing.value = null
      }
    }

    // Formatear fecha
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    onMounted(() => {
      loadTestimonials()
    })

    return {
      testimonials,
      isLoading,
      processing,
      activeTab,
      stats,
      tabs,
      filteredTestimonials,
      showRejectModal,
      rejectionReason,
      getCountForTab,
      approveTestimonial,
      openRejectModal,
      closeRejectModal,
      confirmReject,
      deleteTestimonial,
      formatDate
    }
  }
}
</script>

<style scoped>
/* ... estilos igual que antes ... */
</style>
