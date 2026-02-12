#!/usr/bin/env node
/**
 * Script para actualizar gallery.json con rutas de imágenes WebP
 * Convierte todas las rutas de .jpg, .jpeg, .png a .webp
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../../public/data/gallery.json');

function updateGalleryJson() {
  try {
    // Leer el archivo JSON
    const data = JSON.parse(fs.readFileSync(galleryPath, 'utf-8'));

    // Contador de actualizaciones
    let totalImages = 0;
    let updatedImages = 0;

    // Iterar sobre todas las categorías
    Object.keys(data).forEach(category => {
      if (Array.isArray(data[category])) {
        data[category].forEach(project => {
          if (project.images && Array.isArray(project.images)) {
            project.images = project.images.map(imagePath => {
              totalImages++;
              // Reemplazar extensión a .webp
              const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
              if (newPath !== imagePath) {
                updatedImages++;
                console.log(`✅ ${imagePath} → ${newPath}`);
              }
              return newPath;
            });
          }
        });
      }
    });

    // Guardar el archivo actualizado
    fs.writeFileSync(galleryPath, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📝 Resumen de actualización:`);
    console.log(`   Total de imágenes procesadas: ${totalImages}`);
    console.log(`   Imágenes actualizadas: ${updatedImages}`);
    console.log(`   Archivo guardado: ${galleryPath}`);
    console.log(`${'='.repeat(60)}\n`);

    console.log('✅ gallery.json actualizado exitosamente');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateGalleryJson();
