import config from '../config/index.js'

export const testimonialService = {
  async getAllTestimonials() {
    const apiUrl = `${config.backend.url}/api/testimonials`
    
    try {
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }
      
      const data = await response.json()
      
      // Log centralizado con toda la información
      console.log('📊 API Testimonios - GET:', {
        url: apiUrl,
        status: response.status,
        success: data.success,
        count: data.count || (Array.isArray(data) ? data.length : 'N/A'),
        data: data
      })
      
      // Verificar estructura de respuesta
      if (data && typeof data === 'object') {
        if (data.success !== undefined) {
          return data.data || data
        } else {
          return data
        }
      } else {
        return data
      }
      
    } catch (error) {
      console.error('❌ Error API Testimonios - GET:', {
        url: apiUrl,
        error: error.message
      })
      throw error
    }
  },

  async createTestimonial(testimonialData) {
    const apiUrl = `${config.backend.url}/api/testimonials`
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData)
      });

      const data = await response.json();

      // Log centralizado con toda la información
      console.log('📝 API Testimonios - POST:', {
        url: apiUrl,
        status: response.status,
        success: data.success,
        message: data.message,
        data: data
      })

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('❌ Error API Testimonios - POST:', {
        url: apiUrl,
        error: error.message
      });
      throw error;
    }
  }
};
