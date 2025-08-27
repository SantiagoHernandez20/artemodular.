const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../database/testimonials.json');

class Testimonial {
  static async findAll() {
    try {
      const data = await fs.readFile(DB_PATH, 'utf8');
      const testimonials = JSON.parse(data);
      return testimonials.filter(t => t.is_approved);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Si el archivo no existe, crear uno vacío
        await this.initializeDB();
        return [];
      }
      throw error;
    }
  }

  static async create(testimonialData) {
    try {
      const testimonials = await this.findAll();
      const newTestimonial = {
        id: uuidv4(),
        ...testimonialData,
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      testimonials.push(newTestimonial);
      await fs.writeFile(DB_PATH, JSON.stringify(testimonials, null, 2));
      
      return newTestimonial;
    } catch (error) {
      throw error;
    }
  }

  static async initializeDB() {
    const initialData = [];
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

module.exports = Testimonial;
