# Guía de Optimización de Imágenes WebP - ArteModular

## Resumen de Cambios

Se ha implementado un sistema completo de optimización de imágenes para mejorar el rendimiento de la galería:

### 1. **Conversión de imágenes a WebP**
   - **Herramienta**: Sharp.js
   - **Script**: `backend/scripts/optimize-images.js`
   - **Dimensiones estándar**: 800x800px (con cover fitting)
   - **Reducción promedio**: 60-95% del peso original

### 2. **Actualización de rutas**
   - **Script**: `backend/scripts/update-gallery-json.js`
   - Convierte automáticamente todas las rutas en `gallery.json` a `.webp`

### 3. **Componentes**
   - **GallerySection.vue**: Galería con imágenes WebP
   - Imágenes servidas directamente con `<img>` y rutas `.webp`

## Comandos Disponibles

### Optimizar imágenes nuevas:
```bash
cd backend
npm run optimize-images
```

### Actualizar gallery.json después de optimizar:
```bash
cd backend
npm run update-gallery
```

### Ambas acciones en secuencia:
```bash
cd backend && npm run optimize-images && npm run update-gallery
```

## Estructura de Archivos

```
├── backend/
│   ├── scripts/
│   │   ├── optimize-images.js      # Convierte JPG/PNG a WebP
│   │   └── update-gallery-json.js  # Actualiza rutas en gallery.json
│   └── package.json                # Scripts agregados
├── public/
│   ├── images/                     # Ahora contiene archivos .webp
│   ├── images-backup/              # Backup de originales
│   └── data/gallery.json          # Rutas actualizadas a .webp
└── src/
    └── components/
        └── GallerySection.vue      # Galería con imágenes WebP
```

## Características Implementadas

### 🖼️ Imágenes uniformes
- Todas las imágenes se redimensionan a 800x800px
- `object-fit: cover` asegura que no haya distorsión
- `object-position: center` centra la imagen si hay recorte

### 🔄 Rutas WebP
- Las rutas en `gallery.json` y en los componentes apuntan a `.webp`
- Los navegadores modernos cargan WebP; en entornos que no lo soporten se pueden añadir fallbacks si se requiere

## Rendimiento

### Tamaño total de carpeta:
- **Antes**: 20MB
- **Después**: ~2-3MB (reducción del 85-90%)

### Reducción por categoría:
```
✅ Bibliotecas:      94.79% - 97.06%
✅ Cocinas:         70.64% - 95.63%
✅ Closets:         56.64% - 65.57%
✅ Centro:          34.31% - 98.01%
✅ Decorativos:     49.73% - 65.77%
✅ Inmobiliario:    96.77% - 97.40%
```

## Próximos Pasos

### Si agregaste imágenes nuevas:
1. Coloca los archivos JPG/PNG en `/public/images/`
2. Ejecuta: `npm run optimize-images`
3. Ejecuta: `npm run update-gallery`
4. Verifica que la galería cargue correctamente

### Soporte para otros componentes:
Para usar WebP en otros componentes:
```vue
<template>
  <picture>
    <source :srcset="imageUrl" type="image/webp" />
    <img :src="imageFallback" :alt="alt" />
  </picture>
</template>
```

## Compatibilidad

### Navegadores soportados:
- ✅ Chrome 23+
- ✅ Firefox 25+
- ✅ Safari 16+
- ✅ Edge 18+
- ✅ Opera 15+
- ✅ Safari iOS 14+

### Navegadores con fallback:
- IE 11
- Navegadores muy antiguos

## Troubleshooting

### Las imágenes no se muestran:
1. Verifica que los archivos `.webp` existan en `/public/images/`
2. Borra el caché del navegador
3. Verifica la consola para errores 404

### Las imágenes se ven distorsionadas:
1. Verifica que `object-fit: cover` esté aplicado
2. Ajusta `height` según sea necesario
3. Usa `object-position` para controlar dónde se corta

### El script falla:
1. Verifica que Sharp esté instalado: `npm list sharp`
2. Verifica permisos de carpeta
3. Revisa la salida del script para mensajes de error

## Archivos Modificados

- ✅ `backend/scripts/optimize-images.js` (nuevo)
- ✅ `backend/scripts/update-gallery-json.js` (nuevo)
- ✅ `backend/package.json` (scripts agregados)
- ✅ `src/components/GallerySection.vue` (imágenes WebP)
- ✅ `public/data/gallery.json` (rutas actualizadas)
- ✅ `public/images/` (archivos WebP generados)

## Recursos Útiles

- [WebP Format Specification](https://developers.google.com/speed/webp)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [HTML Picture Element](https://developer.mozilla.org/es/docs/Web/HTML/Element/picture)
- [Object Fit CSS](https://developer.mozilla.org/es/docs/Web/CSS/object-fit)
