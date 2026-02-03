// backend/controllers/TestimonialController.js
const Testimonial = require('../models/TestimonialModel');

class TestimonialController {
  // Obtener todos los testimonios
  static async getAllTestimonials(req, res) {
    try {
      const { approved_only } = req.query;
      
      const filterApproved = approved_only === 'true';
      const testimonials = await Testimonial.findAll(filterApproved);
      
      console.log('📊 Testimonios encontrados:', testimonials.length);
      console.log('📋 Testimonios:', JSON.stringify(testimonials, null, 2));

      res.json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      console.error('❌ Error obteniendo testimonios:', error);
      console.error('❌ Stack:', error.stack);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // Crear nuevo testimonio
  static async createTestimonial(req, res) {
    try {
      const { name, role, service, content, rating } = req.body;

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

      const testimonialData = {
        name,
        role,
        service,
        content,
        rating: parseInt(rating)
      };

      const data = await Testimonial.create(testimonialData);

      console.log('✅ Testimonio guardado en Turso:', data.id);

      res.status(201).json({
        success: true,
        message: 'Testimonio enviado exitosamente. Será revisado antes de ser publicado.',
        data
      });
    } catch (error) {
      console.error('❌ Error creando testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // Aprobar testimonio (admin)
  static async approveTestimonial(req, res) {
    try {
      const { id } = req.params;

      const data = await Testimonial.approve(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Testimonio aprobado exitosamente',
        data
      });
    } catch (error) {
      console.error('❌ Error al aprobar testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al aprobar testimonio'
      });
    }
  }

  // Rechazar testimonio (admin)
  static async rejectTestimonial(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const data = await Testimonial.reject(id, reason);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Testimonio rechazado exitosamente',
        data
      });
    } catch (error) {
      console.error('❌ Error al rechazar testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al rechazar testimonio'
      });
    }
  }

  // Eliminar testimonio (admin)
  static async deleteTestimonial(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Testimonial.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Testimonio eliminado exitosamente'
      });
    } catch (error) {
      console.error('❌ Error al eliminar testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar testimonio'
      });
    }
  }

  // Obtener testimonio por ID
  static async getTestimonialsID(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El parámetro "id" es requerido'
        });
      }

      const data = await Testimonial.findById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      console.error('❌ Error obteniendo testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // Obtener estadísticas de testimonios
  static async getTestimonialsStats(req, res) {
    try {
      const stats = await Testimonial.getStats();

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

  // Actualizar testimonio (admin)
  static async updateTestimonial(req, res) {
    try {
      const { id } = req.params;
      const { name, role, service, content, rating, status, is_approved } = req.body;

      const updateData = {};
      
      if (name) updateData.name = name;
      if (role) updateData.role = role;
      if (service) updateData.service = service;
      if (content) updateData.content = content;
      if (rating) updateData.rating = parseInt(rating);
      // Priorizar status si viene, sino usar is_approved para compatibilidad
      if (status !== undefined) {
        updateData.status = status;
      } else if (is_approved !== undefined) {
        updateData.is_approved = is_approved;
      }

      const data = await Testimonial.update(id, updateData);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Testimonio actualizado exitosamente',
        data
      });
    } catch (error) {
      console.error('❌ Error actualizando testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = TestimonialController;