// 🚀 ArteModular Backend - Express + Nodemailer
// Servidor para manejar envío de emails de contacto
const dotenv = require('dotenv')
const path = require('path')

// Cargar variables de entorno ANTES de importar otros módulos
dotenv.config({
  path: path.join(__dirname, '..', '.env.local')
})

// Fallback a .env si .env.local no existe
if (!process.env.EMAIL_USER) {
  dotenv.config({
    path: path.join(__dirname, '..', '.env')
  })
}

// Ahora importar middleware de Supabase (después de cargar variables)
const { authenticateUser, optionalAuth } = require('./middleware/supabase-auth');
const { getMyIP } = require('./middleware/ipconfig');
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { z } = require('zod')
const { sendContactEmail, testEmailConfiguration } = require('./services/emailService');
const testimonialRoutes = require('./routes/TestimonialRoutes');

const app = express()
const PORT = process.env.PORT || 3001

// 🛡️ Headers de seguridad COOP/COEP ANTES de helmet
app.use((req, res, next) => {
  // Headers específicos para Google OAuth y comunicación con frontend
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none'); // Cambiado a unsafe-none para evitar problemas
  
  // Headers adicionales para mejor compatibilidad
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  
  next();
});

// 🛡️ Middlewares de seguridad
app.use(helmet({
  // Configurar helmet para que no interfiera con COOP
  crossOriginOpenerPolicy: false, // Manejado manualmente arriba
  crossOriginEmbedderPolicy: false, // Manejado manualmente arriba
  crossOriginResourcePolicy: false // Manejado manualmente arriba
}))

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman)
    if (!origin) return callback(null, true)

    // Lista de orígenes permitidos
    const allowedOrigins = [
      'https://artemodular.site',
      'https://www.artemodular.site',
      'http://localhost:9001',
      'http://localhost:9000',
      'http://localhost:9002',
      'https://accounts.google.com',
      'https://oauth2.googleapis.com',
      'https://www.googleapis.com',
      'artemodular-git-dev-santiagohernandez20s-projects.vercel.app',
      'https://pre-deploy.artemodular.site',
      'http://localhost:4174'
      
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
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Accept', 
    'Origin', 
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers'
  ],
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

// 📝 Schema de validación con Zod para el formulario de contacto
const contactSchema = z.object({
  name: z.string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  
  email: z.string()
    .email({ message: 'Email inválido' }),
  
  phone: z.string()
    .transform(val => val.trim().replace(/\s|-|\(|\)/g, '')) // Limpiar espacios, guiones, paréntesis
    .pipe(z.string().regex(/^(\+57|57)?3[0-9]{9}$/, { 
      message: 'Formato de teléfono inválido para Colombia. Use: 3195413243 o +573195413243' 
    })),
  
  projectType: z.enum(['cocina', 'closet', 'muebles', 'oficina', 'obra', 'otro'], {
    errorMap: () => ({ message: 'Tipo de proyecto inválido' })
  }),
  
  message: z.string()
    .min(10, { message: 'El mensaje debe tener al menos 10 caracteres' })
    .max(1000, { message: 'El mensaje no puede tener más de 1000 caracteres' })
});

// Middleware de validación
const contactValidation = async (req, res, next) => {
  try {
    await contactSchema.parseAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
}

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
        'http://localhost:9002',
        'https://accounts.google.com',
        'https://oauth2.googleapis.com',
        'https://pre-deploy.artemodular.site'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    },
    security: {
      coop: 'same-origin-allow-popups',
      coep: 'unsafe-none',
      corp: 'cross-origin'
    },
    endpoints: {
      contact: 'POST /api/contact',
      health: 'GET /api/health',
      testEmail: 'GET /api/test-email',
      testimonials: 'GET/POST /api/testimonials',
      auth: {
        status: 'GET /api/auth/status',
        verify: 'POST /api/auth/verify',
        me: 'GET /api/auth/me'
      }
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
        'http://localhost:9002',
        'https://accounts.google.com',
        'https://oauth2.googleapis.com',
        'https://pre-deploy.artemodular.site'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
    },
    security: {
      coop: 'same-origin-allow-popups',
      coep: 'unsafe-none',
      corp: 'cross-origin',
      helmet: 'enabled'
    },
    backend: {
      url: `https://artemodular.onrender.com`,
      endpoints: {
        contact: `/api/contact`,
        health: `/api/health`,
        testEmail: `/api/test-email`,
        testimonials: `/api/testimonials`
      }
    }
  })
})

// 📧 Endpoint principal para envío de emails
app.post('/api/contact', emailLimiter, contactValidation, async (req, res) => {
  //console.log('📧 BODY RECIBIDO:', req.body)
  try {

    const { name, email, phone, projectType, message } = req.body

    // Log para debugging (sin datos sensibles)
   // console.log(`📧 Nueva solicitud de contacto de: ${name} (${projectType})`)

    // Enviar email
    const emailResult = await sendContactEmail({
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
    const testResult = await testEmailConfiguration()
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

// 📝 Rutas de testimonials
app.use('/api/testimonials', testimonialRoutes)

// 🔍 Endpoint para ver tu IP actual (útil para configurar ipconfig.js)
app.get('/api/auth/my-ip', getMyIP);

// 🔐 RUTAS DE AUTENTICACIÓN

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

// ❌ Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/contact',
      'GET /api/test-email',
      'GET /api/testimonials',
      'POST /api/testimonials',
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
📝 Testimonials: http://localhost:${PORT}/api/testimonials
🔐 Auth Status: http://localhost:${PORT}/api/auth/status

📝 Environment: ${process.env.NODE_ENV || 'development'}
🔐 CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:9001'}
🛡️ Seguridad:
   - COOP: same-origin-allow-popups
   - COEP: unsafe-none
   - CORP: cross-origin
   - Helmet: enabled

🌍 Puertos configurados:
   - Backend: ${PORT}
   - Frontend (dev): 9001
   - Frontend (alt): 9000, 9002
   - Frontend (prod): artemodular.site
   - Google OAuth: habilitado
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