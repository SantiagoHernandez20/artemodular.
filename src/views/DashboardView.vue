<template>
  <div class="dashboard min-h-screen bg-gray-50">
    <!-- Header del dashboard -->
    <div class="bg-white shadow-sm border-b">
      <div class="container-custom py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
            <p class="text-gray-600 mt-2">Bienvenido, {{ authStore.user?.displayName || 'Usuario' }}</p>
          </div>
          
          <!-- Información del usuario -->
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="font-medium text-gray-900">{{ authStore.user?.displayName || 'Usuario' }}</div>
              <div class="text-sm text-gray-500">{{ authStore.user?.email }}</div>
            </div>
            <div class="w-10 h-10 bg-8D5524 rounded-full flex items-center justify-center text-white font-semibold">
              {{ getInitials(authStore.user?.displayName || 'U') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="container-custom py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card de bienvenida -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">¡Bienvenido!</h3>
          </div>
          <p class="text-gray-600">
            Gracias por confiar en ArteModular. Aquí puedes gestionar tu cuenta y ver el estado de tus proyectos.
          </p>
        </div>

        <!-- Card de proyectos -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">Mis Proyectos</h3>
          </div>
          <p class="text-gray-600 mb-4">
            No tienes proyectos activos en este momento.
          </p>
          <router-link to="/" class="btn-primary">
            Solicitar Presupuesto
          </router-link>
        </div>

        <!-- Card de contacto -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 ml-3">Contacto</h3>
          </div>
          <p class="text-gray-600 mb-4">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>
          <div class="space-y-2">
            <p class="text-sm text-gray-500">
              <strong>Teléfono:</strong> 313 358-9795
            </p>
            <p class="text-sm text-gray-500">
              <strong>Email:</strong> info@artemodular.com
            </p>
          </div>
        </div>
      </div>

      <!-- Sección de acciones rápidas -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link to="/" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-8D5524 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Nuevo Proyecto</h3>
                <p class="text-gray-600">Solicita un presupuesto para tu proyecto</p>
              </div>
            </div>
          </router-link>

          <router-link to="/contacto" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-8D5524 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Contactar</h3>
                <p class="text-gray-600">Habla directamente con nuestro equipo</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardView',
  setup() {
    
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

.btn-primary {
  background: linear-gradient(135deg, #8D5524, #6B3F1A);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
