const express = require('express');
const { z } = require('zod');
const TestimonialController = require('../controllers/TestimonialController');
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
// ruta para actualizar SSE
// GET /api/testimonials/stats - Obtener estadísticas
router.get('/:id', TestimonialController.getTestimonialsID);

// PUT /api/testimonials/:id/approve - Aprobar testimonio
router.put('/:id/approve', TestimonialController.approveTestimonial);

// PUT /api/testimonials/:id/reject - Rechazar testimonio
router.put('/:id/reject', TestimonialController.rejectTestimonial);

// DELETE /api/testimonials/:id - Eliminar testimonio
router.delete('/:id', TestimonialController.deleteTestimonial);


//export default router
module.exports = router;