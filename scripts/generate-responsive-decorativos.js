/**
 * Genera variantes responsivas (400w, 640w, 800w) de las imágenes
 * del comparador en public/images/decorativos/ (antes.webp, despues.webp).
 * Uso: node scripts/generate-responsive-decorativos.js
 */
const path = require('path');
const fs = require('fs');

const Sharp = require('sharp');

const DECORATIVOS_DIR = path.join(__dirname, '..', 'public', 'images', 'decorativos');
const WIDTHS = [400, 640, 800];
const SOURCES = ['antes.webp', 'despues.webp'];

async function generateVariants() {
  for (const filename of SOURCES) {
    const inputPath = path.join(DECORATIVOS_DIR, filename);
    if (!fs.existsSync(inputPath)) {
      console.warn(`No existe ${inputPath}, omitiendo.`);
      continue;
    }
    const pipeline = Sharp(inputPath);
    const metadata = await pipeline.metadata();
    const maxWidth = metadata.width || 800;
    for (const w of WIDTHS) {
      const outWidth = Math.min(w, maxWidth);
      const outputPath = path.join(DECORATIVOS_DIR, filename.replace('.webp', `-${outWidth}w.webp`));
      await Sharp(inputPath)
        .resize(outWidth, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`Generado: ${path.basename(outputPath)}`);
    }
  }
}

generateVariants().catch((err) => {
  console.error(err);
  process.exit(1);
});
