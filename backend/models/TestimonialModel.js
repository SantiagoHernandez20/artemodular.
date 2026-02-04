const client = require('../database/turso');

class Testimonial {
  // Convertir fila de BD a objeto con formato compatible
  static mapRowToTestimonial(row) {
    return {
      id: row.id,
      name: row.name,
      avatar: row.avatar,
      content: row.content,
      rating: row.rating,
      role: row.role,
      service: row.service,
      status: row.status,
      rejection_reason: row.rejection_reason,
      created_at: row.created_at,
      updated_at: row.updated_at,
    
    };
  }

  // Obtener todos los testimonios (con filtro opcional)
  static async findAll(filterApproved = false) {
    try {
      let sql = `
        SELECT 
          id, name, avatar, content, rating, role, service, 
          status, rejection_reason, created_at, updated_at
        FROM testimonios
      `;
      
      const args = [];
      
      if (filterApproved) {
        sql += ' WHERE status = ?';
        args.push('approved');
      }
      
      sql += ' ORDER BY created_at DESC';
      
      const result = await client.execute({ sql, args });
      
      return result.rows.map(row => this.mapRowToTestimonial(row));
    } catch (error) {
      console.error('❌ Error obteniendo testimonios:', error);
      throw error;
    }
  }

  // Obtener testimonio por ID
  static async findById(id) {
    try {
      const result = await client.execute({
        sql: `
          SELECT 
            id, name, avatar, content, rating, role, service, 
            status, rejection_reason, created_at, updated_at
          FROM testimonios
          WHERE id = ?
        `,
        args: [parseInt(id)]
      });
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.mapRowToTestimonial(result.rows[0]);
    } catch (error) {
      console.error('❌ Error obteniendo testimonio por ID:', error);
      throw error;
    }
  }

  // Crear nuevo testimonio
  static async create(testimonialData) {
    try {
      const avatar = testimonialData.avatar || this.generateAvatar(testimonialData.name);
      const now = new Date().toISOString();
      
      await client.execute({
        sql: `
          INSERT INTO testimonios (
            name, avatar, content, rating, role, service, 
            status, rejection_reason, created_at, updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          testimonialData.name,
          avatar,
          testimonialData.content,
          parseInt(testimonialData.rating),
          testimonialData.role || null,
          testimonialData.service || null,
          'pending',
          null,
          now,
          now
        ]
      });
      
      // Obtener el ID del último insert usando last_insert_rowid()
      const idResult = await client.execute({
        sql: 'SELECT last_insert_rowid() as id',
        args: []
      });
      
      const newId = idResult.rows[0].id;
      
      // Obtener el testimonio recién creado
      const newTestimonial = await this.findById(newId);
      
      console.log('✅ Testimonio guardado en Turso:', newTestimonial.id);
      
      return newTestimonial;
    } catch (error) {
      console.error('❌ Error creando testimonio:', error);
      throw error;
    }
  }

  // Actualizar testimonio
  static async update(id, updateData) {
    try {
      // Construir la consulta UPDATE dinámicamente
      const fields = [];
      const args = [];
      
      if (updateData.name !== undefined) {
        fields.push('name = ?');
        args.push(updateData.name);
      }
      if (updateData.avatar !== undefined) {
        fields.push('avatar = ?');
        args.push(updateData.avatar);
      }
      if (updateData.content !== undefined) {
        fields.push('content = ?');
        args.push(updateData.content);
      }
      if (updateData.rating !== undefined) {
        fields.push('rating = ?');
        args.push(parseInt(updateData.rating));
      }
      if (updateData.role !== undefined) {
        fields.push('role = ?');
        args.push(updateData.role);
      }
      if (updateData.service !== undefined) {
        fields.push('service = ?');
        args.push(updateData.service);
      }
      if (updateData.status !== undefined) {
        fields.push('status = ?');
        args.push(updateData.status);
      }
      if (updateData.rejection_reason !== undefined) {
        fields.push('rejection_reason = ?');
        args.push(updateData.rejection_reason);
      }
      if (updateData.is_approved !== undefined) {
        // Convertir is_approved a status
        fields.push('status = ?');
        args.push(updateData.is_approved ? 'approved' : 'pending');
      }
      if (updateData.is_reject !== undefined) {
        // Convertir is_reject a status
        fields.push('status = ?');
        args.push(updateData.is_reject);
      }
      
      // Siempre actualizar updated_at
      fields.push('updated_at = ?');
      args.push(new Date().toISOString());
      
      // Agregar el ID al final de los argumentos
      args.push(parseInt(id));
      
      if (fields.length === 1) {
        // Solo updated_at, no hay nada que actualizar
        return await this.findById(id);
      }
      
      const sql = `
        UPDATE testimonios
        SET ${fields.join(', ')}
        WHERE id = ?
      `;
      
      await client.execute({ sql, args });
      
      // Obtener el testimonio actualizado
      return await this.findById(id);
    } catch (error) {
      console.error('❌ Error actualizando testimonio:', error);
      throw error;
    }
  }

  // Aprobar testimonio
  static async approve(id) {
    return await this.update(id, {
      status: 'approved'
    });
  }

  // Rechazar testimonio
  static async reject(id, reason = null) {
    return await this.update(id, {
      status: 'rejected',
      rejection_reason: reason || 'Rechazado por administrador'
    });
  }

  // Eliminar testimonio
  static async delete(id) {
    try {
      // Verificar primero si existe
      const existing = await this.findById(id);
      if (!existing) {
        return false;
      }
      
      await client.execute({
        sql: 'DELETE FROM testimonios WHERE id = ?',
        args: [parseInt(id)]
      });
      
      return true;
    } catch (error) {
      console.error('❌ Error eliminando testimonio:', error);
      throw error;
    }
  }

  // Obtener estadísticas
  static async getStats() {
    try {
      const result = await client.execute({
        sql: `
          SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
          FROM testimonios
        `
      });
      
      const row = result.rows[0];
      
      return {
        total: Number(row.total) || 0,
        approved: Number(row.approved) || 0,
        pending: Number(row.pending) || 0,
        rejected: Number(row.rejected) || 0
      };
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  // Generar avatar a partir del nombre
  static generateAvatar(name) {
    const words = name.split(' ');
    let initials = '';
    
    words.slice(0, 2).forEach(word => {
      if (word.length > 0) {
        initials += word.charAt(0).toUpperCase();
      }
    });
    
    return initials || 'U';
  }
}

module.exports = Testimonial;
