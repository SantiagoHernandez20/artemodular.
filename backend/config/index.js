// 🎯 Configuración centralizada para el backend de ArteModular
// Todas las variables de entorno y configuraciones en un solo lugar

const config = {
  // 🌐 Servidor
  server: {
    // Puerto del servidor
    port: process.env.PORT || 3001,
    
    // Entorno
    environment: process.env.NODE_ENV || 'development',
    
    // Configuración de CORS
    cors: {
      origins: [
        process.env.VUE_APP_FRONTEND_URL || 'http://localhost:9001',
        'https://artemodular.vercel.app',
        'http://localhost:9001', // Desarrollo local
        'http://localhost:9000', // Alternativo
        'http://localhost:9002'  // Puerto alternativo
      ],
      credentials: true
    }
  },

  // 📧 Email
  email: {
    // Configuración del negocio
    business: {
      name: process.env.BUSINESS_NAME || 'ArteModular',
      email: process.env.BUSINESS_EMAIL || 'info@artemodular.com'
    },
    
    // Configuración de SMTP
    smtp: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  },

  // 🛡️ Seguridad
  security: {
    // Rate limiting
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 5 // máximo 5 requests por IP
    },
    
    // Headers de seguridad
    helmet: true,
    
    // Límites de request
    limits: {
      json: '10mb',
      urlencoded: true
    }
  },

  // 🔧 Validaciones
  validation: {
    // Límites de campos
    name: {
      minLength: 2,
      maxLength: 50
    },
    
    message: {
      minLength: 10,
      maxLength: 1000
    },
    
    // Tipos de proyecto válidos
    projectTypes: ['cocina', 'closet', 'muebles', 'oficina', 'obra', 'otro']
  },

  // 📝 Logs
  logging: {
    // Nivel de log
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    
    // Formato de logs
    format: 'detailed',
    
    // Colores en consola
    colors: process.env.NODE_ENV === 'development'
  },

  // 🌍 Endpoints
  endpoints: {
    // Rutas principales
    root: '/',
    health: '/api/health',
    contact: '/api/contact',
    testEmail: '/api/test-email',
    
    // ✅ Agregar endpoints de testimonios
    testimonials: '/api/testimonials',
    testimonialsStats: '/api/testimonials/stats',
    testimonialsApprove: '/api/testimonials/:id/approve',
    testimonialsReject: '/api/testimonials/:id/reject',
    testimonialsDelete: '/api/testimonials/:id'
  },

  // 🔍 Métodos de Utilidad
  utils: {
    // Debug: mostrar toda la configuración
    debug: () => {
      if (process.env.NODE_ENV !== 'development') return
      
      console.log('🔧 Configuración del backend:', {
        server: {
          port: config.server.port,
          environment: config.server.environment
        },
        cors: {
          origins: config.server.cors.origins
        },
        email: {
          business: config.email.business
        },
        security: {
          rateLimit: config.security.rateLimit
        },
        'Variables de entorno': {
          PORT: process.env.PORT,
          NODE_ENV: process.env.NODE_ENV,
          VUE_APP_FRONTEND_URLL: process.env.VUE_APP_FRONTEND_URL,
          BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,
          BUSINESS_NAME: process.env.BUSINESS_NAME
        }
      })
    },

    // Validar configuración
    validate: () => {
      const errors = []
      
      if (!config.server.port) {
        errors.push('Puerto del servidor no configurado')
      }
      
      if (!config.email.business.email) {
        errors.push('Email del negocio no configurado')
      }
      
      if (!config.email.smtp.user || !config.email.smtp.pass) {
        errors.push('Credenciales de SMTP no configuradas')
      }
      
      if (errors.length > 0) {
        console.error('❌ Errores de configuración del backend:', errors)
        return false
      }
      
      console.log('✅ Configuración del backend válida')
      return true
    },

    // Obtener URL completa del servidor
    getServerUrl: (endpoint = '') => {
      return `http://localhost:${config.server.port}${endpoint}`
    }
  }
}

// Mostrar configuración al cargar (solo en desarrollo)
if (config.server.environment === 'development') {
  config.utils.debug()
  config.utils.validate()
}

module.exports = config
