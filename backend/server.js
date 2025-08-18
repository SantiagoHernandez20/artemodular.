// 🚀 ArteModular Backend - Express + Nodemailer
// Servidor para manejar envío de emails de contacto

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

const emailService = require('./services/emailService')

const app = express()
const PORT = process.env.PORT || 3001

// 🛡️ Middlewares de seguridad
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

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
    endpoints: {
      contact: 'POST /api/contact',
      health: 'GET /api/health'
    }
  })
})

// 💊 Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// 📧 Endpoint principal para envío de emails
app.post('/api/contact', emailLimiter, contactValidation, async (req, res) => {
  console.log('BODY RECIBIDO', req.body)
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

// ❌ Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/contact',
      'GET /api/test-email'
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

📝 Environment: ${process.env.NODE_ENV || 'development'}
🔐 CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
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
