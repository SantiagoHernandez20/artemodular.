import { ref, push, get, remove, update, query, orderByChild, equalTo, set, onValue } from 'firebase/database';
import { database } from '@/config/firebase';

export const testimonialsService = {
  // Crear nuevo testimonio
  async createTestimonial(testimonial) {
    try {
      const testimonialsRef = ref(database, 'testimonials');
      const testimonialsSnapshot = await get(testimonialsRef);
      const testimonialsCount = testimonialsSnapshot.exists() ? Object.keys(testimonialsSnapshot.val()).length : 0;
      const newId = testimonialsCount + 1;

      const newTestimonialRef = ref(database, `testimonials/${newId}`);
      await set(newTestimonialRef, {
        id: newId, // ID secuencial
        ...testimonial,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_approved: false,
        rating: parseInt(testimonial.rating) || 5
      });
      
      return {
        success: true,
        id: newId,
        message: 'Testimonio creado exitosamente y enviado para aprobación'
      };
    } catch (error) {
      console.error('Error creando testimonio:', error);
      return {
        success: false,
        message: 'Error al crear el testimonio: ' + error.message
      };
    }
  },

  // Obtener todos los testimonios aprobados (para mostrar al público)
  async getApprovedTestimonials() {
    try {
      const testimonialsRef = ref(database, 'testimonials');
      const approvedQuery = query(testimonialsRef, orderByChild('is_approved'), equalTo(true));
      const snapshot = await get(approvedQuery);
      
      if (snapshot.exists()) {
        const testimonials = [];
        snapshot.forEach((childSnapshot) => {
          testimonials.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por fecha de creación (más recientes primero)
        return testimonials.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      return [];
    } catch (error) {
      console.error('Error obteniendo testimonios aprobados:', error);
      return [];
    }
  },

  // Obtener todos los testimonios (para admin)
  async getAllTestimonials() {
    try {
      const testimonialsRef = ref(database, 'testimonials');
      const snapshot = await get(testimonialsRef);
      
      if (snapshot.exists()) {
        const testimonials = [];
        snapshot.forEach((childSnapshot) => {
          testimonials.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        return testimonials.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      return [];
    } catch (error) {
      console.error('Error obteniendo todos los testimonios:', error);
      return [];
    }
  },

  // Aprobar testimonio (solo admin)
  async approveTestimonial(testimonialId) {
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await update(testimonialRef, {
        is_approved: true,
        updated_at: new Date().toISOString()
      });
      
      return { 
        success: true, 
        message: 'Testimonio aprobado exitosamente' 
      };
    } catch (error) {
      console.error('Error aprobando testimonio:', error);
      return { 
        success: false, 
        message: 'Error al aprobar: ' + error.message 
      };
    }
  },

  // Rechazar/eliminar testimonio (solo admin)
  async deleteTestimonial(testimonialId) {
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await remove(testimonialRef);
      
      return { 
        success: true, 
        message: 'Testimonio eliminado exitosamente' 
      };
    } catch (error) {
      console.error('Error eliminando testimonio:', error);
      return { 
        success: false, 
        message: 'Error al eliminar: ' + error.message 
      };
    }
  },

  // Actualizar testimonio existente
  async updateTestimonial(testimonialId, updates) {
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await update(testimonialRef, {
        ...updates,
        updated_at: new Date().toISOString()
      });
      
      return { 
        success: true, 
        message: 'Testimonio actualizado exitosamente' 
      };
    } catch (error) {
      console.error('Error actualizando testimonio:', error);
      return { 
        success: false, 
        message: 'Error al actualizar: ' + error.message 
      };
    }
  },

  // Obtener estadísticas
  async getStats() {
    try {
      const testimonials = await this.getAllTestimonials();
      
      const total = testimonials.length;
      const approved = testimonials.filter(t => t.is_approved).length;
      const pending = total - approved;
      const averageRating = testimonials.length > 0 
        ? testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length 
        : 0;
      
      return {
        total,
        approved,
        pending,
        averageRating: Math.round(averageRating * 10) / 10
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return { total: 0, approved: 0, pending: 0, averageRating: 0 };
    }
  },

  // Listener en tiempo real para testimonios aprobados
  // Listener en tiempo real para testimonios aprobados
subscribeToApprovedTestimonials(callback) {
    const testimonialsRef = ref(database, 'testimonials');
    const approvedQuery = query(testimonialsRef, orderByChild('is_approved'), equalTo(true));
    
    console.log('�� Iniciando listener para testimonios aprobados...');
    
    return onValue(approvedQuery, (snapshot) => {
      console.log('📊 Snapshot recibido:', snapshot.exists() ? 'SÍ' : 'NO');
      
      if (snapshot.exists()) {
        const testimonials = [];
        snapshot.forEach((childSnapshot) => {
          const testimonial = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
          console.log('📝 Testimonio encontrado:', testimonial.id, testimonial.is_approved);
          testimonials.push(testimonial);
        });
        
        console.log('📋 Total testimonios aprobados:', testimonials.length);
        
        // Ordenar por fecha de creación (más recientes primero)
        const sortedTestimonials = testimonials.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        
        callback(sortedTestimonials);
      } else {
        console.log('❌ No hay testimonios aprobados');
        callback([]);
      }
    });
  },

  // Listener en tiempo real para todos los testimonios (admin)
  subscribeToAllTestimonials(callback) {
    const testimonialsRef = ref(database, 'testimonials');
    
    return onValue(testimonialsRef, (snapshot) => {
      if (snapshot.exists()) {
        const testimonials = [];
        snapshot.forEach((childSnapshot) => {
          testimonials.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por fecha de creación (más recientes primero)
        const sortedTestimonials = testimonials.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        
        callback(sortedTestimonials);
      } else {
        callback([]);
      }
    });
  }
};
