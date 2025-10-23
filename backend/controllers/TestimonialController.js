const { admin } = require('../config/firebase-admin');

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
        is_reject: 'pending',   // Por defecto no rechazado
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
        is_reject: 'approved',
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
        is_reject: 'rejected',
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

  // Método para obtener un testimonio por ID (antes estaba en getTestimonialsStats)
  static async getTestimonialsID(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El parámetro "id" es requerido'
        });
      }

      const db = admin.database();
      const testimonialRef = db.ref(`testimonials/${id}`);
      const snapshot = await testimonialRef.once('value');

      if (!snapshot.exists()) {
        return res.status(404).json({
          success: false,
          message: 'Testimonio no encontrado'
        });
      }

      const testimonial = {
        id: snapshot.key,
        ...snapshot.val()
      };

      res.json({
        success: true,
        data: testimonial
      });
    } catch (error) {
      console.error('❌ Error obteniendo testimonio:', error);
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

  static async streamTestimonials(req, res) {
    try {
      // Configurar headers CORS específicos para SSE
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // Configurar cabeceras para SSE
      res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      res.flushHeaders();

      // Enviar mensaje inicial
      res.write('data: Conexión establecida\n\n');

      const db = admin.database();
      const testimonialsRef = db.ref('testimonials');

      // Función que se encargará de enviar las actualizaciones
      const onValueChange = (snapshot) => {
        let testimonials = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            testimonials.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          // Ordenar por ID
          testimonials.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        }
        // Enviar datos actualizados vía SSE
        res.write(`data: ${JSON.stringify(testimonials)}\n\n`);
      };

      // Establecer listener para cambios en los testimonios
      testimonialsRef.on('value', onValueChange);

      // Limpiar cuando el cliente se desconecte
      req.on('close', () => {
        testimonialsRef.off('value', onValueChange);
        res.end();
      });
    } catch (error) {
      console.error('❌ Error en streamTestimonials:', error);
      res.status(500).end();
    }
  }

}
module.exports = TestimonialController;
