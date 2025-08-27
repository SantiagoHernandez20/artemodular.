const Testimonial = require('../models/TestimonialModel');

class TestimonialController {
  static async getAllTestimonials(req, res) {
    try {
      const testimonials = await Testimonial.findAll();
      res.json({
        success: true,
        data: testimonials,
        count: testimonials.length
      });
    } catch (error) {
      console.error('❌ Error obteniendo testimonios:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error interno del servidor' 
      });
    }
  }

  static async createTestimonial(req, res) {
    try {
      const { name, role, service, content, rating } = req.body;

      // Validaciones básicas
      if (!name || !role || !service || !content || !rating) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos'
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'La calificación debe estar entre 1 y 5'
        });
      }

      if (content.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'El comentario debe tener al menos 10 caracteres'
        });
      }

      const testimonial = await Testimonial.create({
        name,
        role,
        service,
        content,
        rating,
        avatar: TestimonialController.generateAvatar(name)
      });

      res.status(201).json({
        success: true,
        message: 'Testimonio enviado exitosamente. Será revisado antes de ser publicado.',
        data: testimonial
      });
    } catch (error) {
      console.error('❌ Error creando testimonio:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error interno del servidor' 
      });
    }
  }

  static generateAvatar(name) {
    const words = name.split(' ');
    let initials = '';
    
    words.slice(0, 2).forEach(word => {
      initials += word.charAt(0).toUpperCase();
    });
    
    return initials;
  }
}

module.exports = TestimonialController;
