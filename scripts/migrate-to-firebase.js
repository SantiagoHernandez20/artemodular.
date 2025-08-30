#!/usr/bin/env node

/**
 * Script para migrar testimonios desde testimonials.json a Firebase
 * Uso: node scripts/migrate-to-firebase.js
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import fs from 'fs';
import path from 'path';

// Configuración de Firebase - REEMPLAZA CON TUS DATOS REALES
const firebaseConfig = {
    apiKey: "AIzaSyB-QnjXvhi8VjimX5wVY6VQ0Mas3EBZ5iE",
    authDomain: "artemodular-6954d.firebaseapp.com",
    databaseURL: "https://artemodular-6954d-default-rtdb.firebaseio.com",
    projectId: "artemodular-6954d",
    storageBucket: "artemodular-6954d.firebasestorage.app",
    messagingSenderId: "612236073715",
    appId: "1:612236073715:web:73633cf5f26892229db586"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function migrateTestimonials() {
  try {
    console.log('🚀 Iniciando migración a Firebase...');
    
    // Leer archivo JSON local
    const testimonialsPath = path.join(process.cwd(), 'backend/database/testimonials.json');
    const testimonialsData = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
    
    console.log(`📋 Encontrados ${testimonialsData.length} testimonios para migrar`);
    
    // Migrar cada testimonio
    for (const testimonial of testimonialsData) {
      const testimonialRef = ref(database, `testimonials/${testimonial.id}`);
      
      // Asegurar que los campos requeridos estén presentes
      const testimonialData = {
        name: testimonial.name || 'Sin nombre',
        role: testimonial.role || 'Cliente',
        service: testimonial.service || 'Servicio general',
        content: testimonial.content || 'Sin contenido',
        rating: parseInt(testimonial.rating) || 5,
        avatar: testimonial.avatar || testimonial.name?.charAt(0) || 'U',
        is_approved: testimonial.is_approved || false,
        created_at: testimonial.created_at || new Date().toISOString(),
        updated_at: testimonial.updated_at || new Date().toISOString()
      };
      
      await set(testimonialRef, testimonialData);
      console.log(`✅ Migrado: ${testimonial.name} (${testimonial.id})`);
    }
    
    console.log('🎉 Migración completada exitosamente!');
    console.log('📝 Recuerda:');
    console.log('   - Los testimonios están marcados como no aprobados por defecto');
    console.log('   - Usa el panel de administración para aprobarlos');
    console.log('   - Puedes eliminar el archivo testimonials.json después de verificar');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar migración
migrateTestimonials();