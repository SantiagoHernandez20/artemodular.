// 🚀 ArteModular Backend - Express + Nodemailer
// Servidor para manejar envío de emails de contacto
const { authenticateUser, optionalAuth } = require('./middleware/auth');

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const path = require('path')

// Cargar variables de entorno desde la raíz del proyecto
require('dotenv').config({ 
  path: path.join(__dirname, '..', '.env.local') 
})

// Fallback a .env si .env.local no existe
if (!process.env.EMAIL_USER) {
  require('dotenv').config({ 
    path: path.join(__dirname, '..', '.env') 
  })
}

const emailService = require('./services/emailService')
const testimonialRoutes = require('./routes/TestimonialRoutes')
const app = express()
const PORT = process.env.PORT || 3001
// 🛡️ Middlewares de seguridad
app.use(helmet())
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman)
    if (!origin) return callback(null, true)
    
    // Lista de orígenes permitidos
    const allowedOrigins = [
      'https://artemodular.site',
      'http://localhost:9001',
      'http://localhost:9000',
      'http://localhost:9002'
    ]
    
    // Verificar si el origen está permitido
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origen permitido por CORS:', origin)
      callback(null, true)
    } else {
      console.log('🚫 Origen bloqueado por CORS:', origin)
      console.log('📋 Orígenes permitidos:', allowedOrigins)
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 🌐 Middleware para manejar preflight CORS
app.options('*', cors())

// 🚦 Rate limiting - máximo 5 emails por IP cada 15 minutos
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 requests por IP
  message: {
    error: 'Demasiados emails enviados. Intenta de nuevo en 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// 📝 Validaciones para el formulario de contacto
const contactValidation = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  
  body('phone')
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .isMobilePhone('es-CO')
    .withMessage('Formato de teléfono inválido para Colombia'),
  
  body('projectType')
    .notEmpty()
    .withMessage('El tipo de proyecto es requerido')
    .isIn(['cocina', 'closet', 'muebles', 'oficina', 'obra', 'otro'])
    .withMessage('Tipo de proyecto inválido'),
  
  body('message')
    .notEmpty()
    .withMessage('El mensaje es requerido')
    .isLength({ min: 10, max: 1000 })
    .withMessage('El mensaje debe tener entre 10 y 1000 caracteres')
    .trim()
    .escape()
]

// 🏠 Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🏡 ArteModular Backend funcionando correctamente',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    frontendUrl: process.env.FRONTEND_URL || 'https://artemodular.site',
    cors: {
      enabled: true,
      allowedOrigins: [
        'https://artemodular.site',
        'https://www.artemodular.site',
        'http://localhost:9001',
        'http://localhost:9000',
        'http://localhost:9002'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    },
    endpoints: {
      contact: 'POST /api/contact',
      health: 'GET /api/health',
      testEmail: 'GET /api/test-email'
    }
  })
})

// 💊 Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    frontendUrl: process.env.FRONTEND_URL || 'https://artemodular.site',
    cors: {
      enabled: true,
      allowedOrigins: [
        'https://artemodular.site',
        'https://www.artemodular.site',
        'http://localhost:9001',
        'http://localhost:9000',
        'http://localhost:9002'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    backend: {
      url: `https://artemodular.onrender.com`,
      endpoints: {
        contact: `/api/contact`,
        health: `/api/health`,
        testEmail: `/api/test-email`
      }
    }
  })
})

// 📧 Endpoint principal para envío de emails
app.post('/api/contact', emailLimiter, contactValidation, async (req, res) => {
  console.log('📧 BODY RECIBIDO:', req.body)
  try {
    // Verificar errores de validación
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      })
    }

    const { name, email, phone, projectType, message } = req.body

    // Log para debugging (sin datos sensibles)
    console.log(`📧 Nueva solicitud de contacto de: ${name} (${projectType})`)

    // Enviar email
    const emailResult = await emailService.sendContactEmail({
      name,
      email,
      phone,
      projectType,
      message
    })

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Email enviado exitosamente',
      messageId: emailResult.messageId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error al enviar email:', error)

    // Respuesta de error
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al enviar el email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    })
  }
})

// 🔧 Endpoint para probar configuración de email
app.get('/api/test-email', async (req, res) => {
  try {
    const testResult = await emailService.testEmailConfiguration()
    res.json({
      success: true,
      message: 'Configuración de email válida',
      details: testResult
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la configuración de email',
      error: error.message
    })
  }
})

app.use('/api/testimonials', testimonialRoutes)

// 🔐 RUTAS DE AUTENTICACIÓN (MOVER AQUÍ, ANTES del 404 handler)

// Verificar estado de autenticación
app.get('/api/auth/status', optionalAuth, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      authenticated: true,
      user: {
        uid: req.user.uid,
        email: req.user.email,
        emailVerified: req.user.emailVerified,
        name: req.user.name,
        picture: req.user.picture,
        provider: req.user.provider
      }
    });
  } else {
    res.json({
      success: true,
      authenticated: false,
      message: 'Usuario no autenticado'
    });
  }
});

// Endpoint protegido para verificar token
app.post('/api/auth/verify', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    user: {
      uid: req.user.uid,
      email: req.user.email,
      emailVerified: req.user.emailVerified,
      name: req.user.name,
      picture: req.user.picture,
      provider: req.user.provider
    },
    timestamp: new Date().toISOString()
  });
});

// Endpoint para obtener información del usuario actual
app.get('/api/auth/me', authenticateUser, (req, res) => {
  res.json({
    success: true,
    user: {
      uid: req.user.uid,
      email: req.user.email,
      emailVerified: req.user.emailVerified,
      name: req.user.name,
      picture: req.user.picture,
      provider: req.user.provider
    }
  });
});

// ❌ Manejo de rutas no encontradas (MOVER AL FINAL)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/contact',
      'GET /api/test-email',
      'GET /api/auth/status',
      'POST /api/auth/verify',
      'GET /api/auth/me'
    ]
  })
})

// 🔥 Manejo global de errores
app.use((error, req, res, next) => {
  console.error('💥 Error no manejado:', error)
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  })
})

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🏡 ArteModular Backend iniciado exitosamente!

🌐 Servidor: http://localhost:${PORT}
📧 API Email: http://localhost:${PORT}/api/contact
💊 Health: http://localhost:${PORT}/api/health
🔧 Test Email: http://localhost:${PORT}/api/test-email
 Testimonials: http://localhost:${PORT}/api/testimonials

📝 Environment: ${process.env.NODE_ENV || 'development'}
🔐 CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:9001'}
🌍 Puertos configurados:
   - Backend: ${PORT}
   - Frontend (dev): 9001
   - Frontend (alt): 9000, 9002
   - Frontend (prod): artemodular.site
  `)
})

// 🛑 Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recibido, cerrando servidor...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recibido, cerrando servidor...')
  process.exit(0)
})

// Agregar headers de seguridad para COOP
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
