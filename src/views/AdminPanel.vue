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

    <!-- Contenido principal - Solo el componente de gestión de testimonios -->
    <div class="container-custom py-8">
      <TestimonialsManagement />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'
import TestimonialsManagement from '../components/TestimonialsManagement.vue'

export default {
  name: 'AdminPanel',
  components: {
    TestimonialsManagement
  },
  setup() {
    const authStore = useAuthStore()
    
    const getInitials = (name) => {
      if (!name) return 'A'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return {
      authStore,
      getInitials
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
