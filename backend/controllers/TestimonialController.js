const { admin } = require('../config/firebase');

class TestimonialController {
  // Obtener el siguiente ID secuencial
  static async getNextSequentialId() {
    try {
      const db = admin.database();
      const testimonialsRef = db.ref('testimonials');
      const snapshot = await testimonialsRef.once('value');
      
      if (!snapshot.exists()) {
        return 1; // Primer testimonio
      }
      
      let maxId = 0;
      snapshot.forEach((childSnapshot) => {
        const id = parseInt(childSnapshot.key);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      });
      
      return maxId + 1;
    } catch (error) {
      console.error('❌ Error obteniendo siguiente ID:', error);
      throw error;
    }
  }

  static async getAllTestimonials(req, res) {
    try {
      const db = admin.database();
      const testimonialsRef = db.ref('testimonials');
      const snapshot = await testimonialsRef.once('value');
      
      let testimonials = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          testimonials.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por ID (secuencial)
        testimonials.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      }
      
      res.json(testimonials);
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

      // Obtener siguiente ID secuencial
      const nextId = await TestimonialController.getNextSequentialId();
      console.log('🔢 Siguiente ID secuencial:', nextId);

      // Crear objeto del testimonio
      const testimonialData = {
        name,
        role,
        service,
        content,
        rating,
        avatar: TestimonialController.generateAvatar(name),
        is_approved: false, // Por defecto pendiente
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Guardar en Firebase usando Admin SDK con ID secuencial
      const db = admin.database();
      const testimonialsRef = db.ref('testimonials');
      const newTestimonialRef = testimonialsRef.child(nextId.toString());
      await newTestimonialRef.set(testimonialData);
      
      console.log('✅ Testimonio guardado en Firebase con ID secuencial:', nextId);

      // Retornar respuesta exitosa
      res.status(201).json({
        success: true,
        message: 'Testimonio enviado exitosamente. Será revisado antes de ser publicado.',
        data: {
          id: nextId.toString(),
          ...testimonialData
        }
      });
    } catch (error) {
      console.error('❌ Error creando testimonio:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error interno del servidor' 
      });
    }
  }

  // Métodos para administración
  static async approveTestimonial(req, res) {
    try {
      const { id } = req.params;
      const db = admin.database();
      const testimonialRef = db.ref(`testimonials/${id}`);
      
      await testimonialRef.update({
        is_approved: true,
        updated_at: new Date().toISOString()
      });

      res.json({
        success: true,
        message: 'Testimonio aprobado exitosamente'
      });
    } catch (error) {
      console.error('❌ Error al aprobar testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al aprobar testimonio'
      });
    }
  }

  static async rejectTestimonial(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const db = admin.database();
      const testimonialRef = db.ref(`testimonials/${id}`);
      
      await testimonialRef.update({
        is_approved: false,
        rejection_reason: reason || '',
        updated_at: new Date().toISOString()
      });

      res.json({
        success: true,
        message: 'Testimonio rechazado exitosamente'
      });
    } catch (error) {
      console.error('❌ Error al rechazar testimonio:', error);
      res.status(500).json({
        success: false,
        message: 'Error al rechazar testimonio'
      });
    }
  }

  static async deleteTestimonial(req, res) {
    try {
      const { id } = req.params;
      const db = admin.database();
      const testimonialRef = db.ref(`testimonials/${id}`);
      
      await testimonialRef.remove();

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

  // Método para obtener estadísticas con IDs secuenciales
  static async getTestimonialsStats(req, res) {
    try {
      const allTestimonials = await TestimonialController.getAllTestimonials(req, res);
      
      const stats = {
        total: allTestimonials.length,
        pending: allTestimonials.filter(t => !t.is_approved).length,
        approved: allTestimonials.filter(t => t.is_approved).length,
        rejected: 0, // Tu backend no tiene estado "rejected" separado
        nextId: await TestimonialController.getNextSequentialId()
      };
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas'
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
