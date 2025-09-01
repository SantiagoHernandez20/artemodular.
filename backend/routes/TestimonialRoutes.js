const express = require('express');
const { body } = require('express-validator');
const TestimonialController = require('../controllers/TestimonialController');

const router = express.Router();

// Validaciones para testimonios
const testimonialValidation = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .trim()
    .escape(),
  
  body('role')
    .notEmpty()
    .withMessage('El rol/profesión es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El rol debe tener entre 2 y 50 caracteres')
    .trim()
    .escape(),
  
  body('service')
    .notEmpty()
    .withMessage('El servicio es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El servicio debe tener entre 2 y 100 caracteres')
    .trim()
    .escape(),
  
  body('content')
    .notEmpty()
    .withMessage('El comentario es requerido')
    .isLength({ min: 10, max: 1000 })
    .withMessage('El comentario debe tener entre 10 y 1000 caracteres')
    .trim()
    .escape(),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe ser un número entre 1 y 5')
];

// GET /api/testimonials - Obtener todos los testimonios aprobados
router.get('/', TestimonialController.getAllTestimonials);

// POST /api/testimonials - Crear nuevo testimonio
router.post('/', testimonialValidation, TestimonialController.createTestimonial);

// GET /api/testimonials/stats - Obtener estadísticas
router.get('/stats', TestimonialController.getTestimonialsStats);

// PUT /api/testimonials/:id/approve - Aprobar testimonio
router.put('/:id/approve', TestimonialController.approveTestimonial);

// PUT /api/testimonials/:id/reject - Rechazar testimonio
router.put('/:id/reject', TestimonialController.rejectTestimonial);

// DELETE /api/testimonials/:id - Eliminar testimonio
router.delete('/:id', TestimonialController.deleteTestimonial);

module.exports = router;