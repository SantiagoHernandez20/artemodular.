// backend/controllers/TestimonialController.js
const { supabase } = require('../middleware/supabase-auth');

class TestimonialController {
  // Obtener todos los testimonios
  static async getAllTestimonials(req, res) {
    try {
      const { approved_only } = req.query;
      
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (approved_only === 'true') {
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error obteniendo testimonios:', error);
        return res.status(500).json({
          success: false,
          message: 'Error interno del servidor'
        });
      }

      res.json({
        success: true,
        data: data || []
      });
    } catch (error) {
      console.error('❌ Error obteniendo testimonios:', error);
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
        rating: parseInt(rating),
        avatar: TestimonialController.generateAvatar(name),
        is_approved: false,
        is_reject: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonialData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error creando testimonio:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al crear el testimonio'
        });
      }

      console.log('✅ Testimonio guardado en Supabase:', data.id);

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

      const { data, error } = await supabase
        .from('testimonials')
        .update({
          is_approved: true,
          is_reject: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al aprobar testimonio:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al aprobar testimonio'
        });
      }

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

      const { data, error } = await supabase
        .from('testimonials')
        .update({
          is_approved: false,
          is_reject: 'rejected',
          rejection_reason: reason || 'Rechazado por administrador',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al rechazar testimonio:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al rechazar testimonio'
        });
      }

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

      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Error al eliminar testimonio:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar testimonio'
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

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
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

  // Generar avatar a partir del nombre
  static generateAvatar(name) {
    const words = name.split(' ');
    let initials = '';

    words.slice(0, 2).forEach(word => {
      initials += word.charAt(0).toUpperCase();
    });

    return initials;
  }

  // Obtener estadísticas de testimonios
  static async getTestimonialsStats(req, res) {
    try {
      const { count: total } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true });

      const { count: approved } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', true);

      const { count: pending } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false);

      res.json({
        success: true,
        data: {
          total: total || 0,
          approved: approved || 0,
          pending: pending || 0,
          rejected: (total || 0) - (approved || 0)
        }
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
      const { name, role, service, content, rating, is_approved } = req.body;

      const updateData = {};
      
      if (name) updateData.name = name;
      if (role) updateData.role = role;
      if (service) updateData.service = service;
      if (content) updateData.content = content;
      if (rating) updateData.rating = parseInt(rating);
      if (is_approved !== undefined) updateData.is_approved = is_approved;

      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error actualizando testimonio:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar testimonio'
        });
      }

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