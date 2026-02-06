// 🎯 Configuración centralizada para ArteModular
// Todas las variables de entorno y configuraciones en un solo lugar

const config = {
  // 🌐 URLs del Backend
  backend: {
    // URL del backend (desarrollo vs producción)
    url: import.meta.env.VITE_APP_BACKEND_URL || 
      (import.meta.env.MODE === 'development' 
        ? 'http://localhost:3001' 
        : 'https://artemodular.onrender.com'),
    
    // Endpoints del backend
    endpoints: {
      contact: '/api/contact',
      health: '/api/health',
      testEmail: '/api/test-email',
      
      // ✅ Agregar endpoints de testimonios
      testimonials: '/api/testimonials',
      testimonialsStats: '/api/testimonials/stats',
      testimonialsApprove: '/api/testimonials/:id/approve',
      testimonialsReject: '/api/testimonials/:id/reject',
      testimonialsDelete: '/api/testimonials/:id'
    },
    
    // Configuración de requests
    request: {
      timeout: 30000, // 30 segundos
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  },

  // 🎨 URLs del Frontend
  frontend: {
    // URL del frontend (desarrollo vs producción)
    url: import.meta.env.VITE_APP_FRONTEND_URL || 
      (import.meta.env.MODE === 'development' 
        ? 'http://localhost:9001' 
        : 'https://artemodular.site'),
    
    // Configuración del servidor de desarrollo
    devServer: {
      port: 9001
    }
  },

  // 🌍 Entorno y Configuración
  environment: {
    // Tipo de entorno
    isDevelopment: import.meta.env.MODE === 'development',
    isProduction: import.meta.env.MODE === 'production',
    
    // Nombre del entorno
    name: import.meta.env.MODE || 'development',
    
    // Configuración de debug
    debug: import.meta.env.MODE === 'development'
  },

  // 🛡️ Configuración de Seguridad
  security: {
    // CORS
    cors: {
      origins: [
        'http://localhost:9001',  // Desarrollo
        'http://localhost:9000',  // Alternativo
        'https://artemodular.vercel.app'  // Producción
      ]
    }
  },

  // 🔍 Métodos de Utilidad
  utils: {
    // Debug: mostrar toda la configuración
    debug: () => {
      if (!config.environment.debug) return
      
      console.log('🔧 Configuración centralizada de ArteModular:', {
        backend: {
          url: config.backend.url,
          endpoints: config.backend.endpoints
        },
        frontend: {
          url: config.frontend.url,
          devServer: config.frontend.devServer
        },
        environment: {
          name: config.environment.name,
          isDevelopment: config.environment.isDevelopment,
          isProduction: config.environment.isProduction
        },
        security: {
          cors: config.security.cors
        },
        'VITE_APP_BACKEND_URL': import.meta.env.VITE_APP_BACKEND_URL,
        'VITE_APP_FRONTEND_URL': import.meta.env.VITE_APP_FRONTEND_URL,
        MODE: import.meta.env.MODE
      })
    },

    // Validar configuración
    validate: () => {
      const errors = []
      
      if (!config.backend.url) {
        errors.push('Backend URL no configurada')
      }
      
      if (!config.frontend.url) {
        errors.push('Frontend URL no configurada')
      }
      
      if (errors.length > 0) {
        console.error('❌ Errores de configuración:', errors)
        return false
      }
      
      //console.log('✅ Configuración válida')
      return true
    },

    // Obtener URL completa del backend
    getBackendUrl: (endpoint = '') => {
      // Eliminar slash inicial del endpoint si existe
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
      // Construir URL sin doble slash
      return `${config.backend.url}${cleanEndpoint ? '/' + cleanEndpoint : ''}`
    },

    // Obtener URL completa del frontend
    getFrontendUrl: (path = '') => {
      return `${config.frontend.url}${path}`
    }
  }
}

// Mostrar configuración al cargar (solo en desarrollo)
if (config.environment.debug) {
  config.utils.debug()
  config.utils.validate()
}

export default config
