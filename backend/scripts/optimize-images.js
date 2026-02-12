#!/usr/bin/env node
/**
 * Script para optimizar imágenes a WebP
 * Convierte todas las imágenes JPG/PNG en la carpeta public/images a WebP
 * con dimensiones estándar para la galería (800x800 para cuadradas, manteniendo aspecto)
 * 
 * Uso: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Dimensiones estándar para la galería
const GALLERY_WIDTH = 800;
const GALLERY_HEIGHT = 800;

// Ruta a la carpeta de imágenes
const imagesDir = path.join(__dirname, '../../public/images');
const backupDir = path.join(__dirname, '../../public/images-backup');

// Archivos permitidos
const allowedExtensions = ['.jpg', '.jpeg', '.png'];

/**
 * Crear backup de las imágenes originales
 */
function createBackup() {
  if (!fs.existsSync(backupDir)) {
    console.log('📦 Creando backup de imágenes originales...');
    // Crear copia recursiva
    const copyRecursive = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(file => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        if (fs.statSync(srcFile).isDirectory()) {
          copyRecursive(srcFile, destFile);
        } else {
          fs.copyFileSync(srcFile, destFile);
        }
      });
    };
    copyRecursive(imagesDir, backupDir);
    console.log('✅ Backup creado en:', backupDir);
  } else {
    console.log('ℹ️  Backup ya existe, saltando creación de backup');
  }
}

/**
 * Obtener todas las imágenes recursivamente
 */
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (allowedExtensions.includes(path.extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Optimizar una imagen a WebP
 */
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const outputPath = inputPath.replace(ext, '.webp');
    const relativePath = path.relative(imagesDir, inputPath);
    
    // Usar sharp para convertir y optimizar
    // Mantener aspecto con contain y usar background color
    await sharp(inputPath)
      .resize(GALLERY_WIDTH, GALLERY_HEIGHT, {
        fit: 'cover', // Cubre el área completamente manteniendo aspecto
        position: 'center' // Centro la imagen si hay recorte
      })
      .webp({ quality: 85 }) // Calidad 85 para balance entre tamaño y calidad
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const compression = (((originalSize - newSize) / originalSize) * 100).toFixed(2);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${compression}% reducción)`);

    return { success: true, inputPath, outputPath };
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error.message);
    return { success: false, inputPath, error: error.message };
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🖼️  Iniciando optimización de imágenes a WebP...\n');

  try {
    // Crear backup
    createBackup();

    // Obtener todas las imágenes
    const images = getAllImages(imagesDir);
    
    if (images.length === 0) {
      console.log('ℹ️  No se encontraron imágenes para optimizar');
      return;
    }

    console.log(`\n📊 Encontradas ${images.length} imágenes para optimizar\n`);

    // Optimizar cada imagen
    let successCount = 0;
    let failureCount = 0;

    for (const imagePath of images) {
      const result = await optimizeImage(imagePath);
      if (result.success) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📈 Resumen:`);
    console.log(`   ✅ Optimizadas exitosamente: ${successCount}`);
    console.log(`   ❌ Errores: ${failureCount}`);
    console.log(`   📁 Backup: ${backupDir}`);
    console.log(`${'='.repeat(60)}\n`);

    if (failureCount === 0) {
      console.log('🎉 ¡Todas las imágenes se optimizaron correctamente!');
      console.log('📝 Próximo paso: Actualizar gallery.json para usar los archivos .webp\n');
    }

  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
