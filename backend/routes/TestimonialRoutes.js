const express = require('express');
const { z } = require('zod');
const TestimonialController = require('../controllers/TestimonialController');
const Testimonial = require('../models/TestimonialModel');
const { verifyIP } = require('../middleware/ipconfig');
const router = express.Router();

// Schema de validación con Zod
const testimonialSchema = z.object({
  name: z.string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  
  role: z.string()
    .min(2, { message: 'El rol debe tener al menos 2 caracteres' })
    .max(50, { message: 'El rol no puede tener más de 50 caracteres' }),
  
  service: z.string()
    .min(2, { message: 'El servicio debe tener al menos 2 caracteres' })
    .max(100, { message: 'El servicio no puede tener más de 100 caracteres' }),
  
  content: z.string()
    .min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
    .max(1000, { message: 'El comentario no puede tener más de 1000 caracteres' }),
  
  rating: z.number()
    .int()
    .min(1, { message: 'La calificación debe ser al menos 1' })
    .max(5, { message: 'La calificación no puede ser mayor a 5' })
});

// Middleware de validación
const testimonialValidation = async (req, res, next) => {
  try {
    await testimonialSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
};

// GET /api/testimonials - Obtener todos los testimonios aprobados
router.get('/', TestimonialController.getAllTestimonials);

// POST /api/testimonials - Crear nuevo testimonio
router.post('/', testimonialValidation, TestimonialController.createTestimonial);

// GET /api/testimonials/stream - Streaming SSE para admin (requiere IP verificada)
router.get('/stream', verifyIP, async (req, res) => {
  console.log('📡 Cliente conectado al SSE stream');
  
  // Configurar headers para Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Enviar mensaje de conexión
  res.write(`data: ${JSON.stringify('Conexión establecida')}\n\n`);
  
  // Función para enviar testimonios actualizados
  const sendTestimonials = async () => {
    try {
      const testimonials = await Testimonial.findAll(false);
      res.write(`data: ${JSON.stringify(testimonials)}\n\n`);
    } catch (err) {
      console.error('❌ Error en SSE:', err);
    }
  };
  
  // Enviar testimonios inmediatamente
  await sendTestimonials();
  
  // Polling cada 5 segundos
  const interval = setInterval(() => {
    sendTestimonials();
  }, 5000);
  
  // Limpiar al cerrar la conexión
  req.on('close', () => {
    console.log('📡 Cliente desconectado del SSE stream');
    clearInterval(interval);
    res.end();
  });
});

// GET /api/testimonials/:id - Obtener testimonio por ID
router.get('/:id', TestimonialController.getTestimonialsID);

// PUT /api/testimonials/:id/approve - Aprobar testimonio (requiere IP verificada)
router.put('/:id/approve', verifyIP, TestimonialController.approveTestimonial);

// PUT /api/testimonials/:id/reject - Rechazar testimonio (requiere IP verificada)
router.put('/:id/reject', verifyIP, TestimonialController.rejectTestimonial);

// DELETE /api/testimonials/:id - Eliminar testimonio (requiere IP verificada)
router.delete('/:id', verifyIP, TestimonialController.deleteTestimonial);


//export default router
module.exports = router;