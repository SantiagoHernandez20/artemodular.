<template>
  <section id="galeria" style="background-color: white;" class="section-padding">
    <div class="container-custom">
      <!-- Encabezado de la sección -->
      <div style="text-align: center; margin-bottom: 4rem;">
        <h2 style="font-size: 2.25rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">
          Nuestra Galería de Proyectos
        </h2>
        <p style="font-size: 1.25rem; color: #4B5563; max-width: 48rem; margin: 0 auto;">
          Descubre la calidad y belleza de nuestros trabajos. Cada proyecto refleja nuestro compromiso con la excelencia y el diseño personalizado.
        </p>
      </div>

      <!-- Filtros de categoría -->
      <div style="display: flex; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap; gap: 0.5rem;">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="filterGallery(category.id)"
          :style="getFilterButtonStyle(category.id)"
          class="filter-btn"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Grid de galería con animaciones -->
      <div 
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;"
        class="gallery-grid"
      >
        <div 
          v-for="(image, index) in filteredImages" 
          :key="image.id"
          @click="openLightbox(index)"
          :style="getImageCardStyle()"
          class="gallery-item"
          :data-aos="getAnimationType(index)"
          :data-aos-delay="index * 100"
        >
          <div style="position: relative; overflow: hidden; border-radius: 0.75rem; height: 300px; cursor: pointer; group;">
            <!-- Imagen simulada - aquí irían las fotos reales -->
            <div :style="getImageStyle(image)" class="image-placeholder">
              <div style="position: absolute; inset: 0; background: linear-gradient(45deg, #8D5524, #6B3F1A); opacity: 0.8;"></div>
              <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; text-align: center; padding: 1rem;">
                <svg style="width: 3rem; height: 3rem; margin-bottom: 0.75rem;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v1.816a.994.994 0 00.064.316l6.636 13.271c.204.408.804.408 1.008 0l6.636-13.271A.994.994 0 0016 6.816V5a2 2 0 00-2-2H4z"/>
                  <path d="M6 7a1 1 0 112 0v4a1 1 0 11-2 0V7zM10 7a1 1 0 112 0v4a1 1 0 11-2 0V7z"/>
                </svg>
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">{{ image.title }}</h3>
                <p style="font-size: 0.875rem; opacity: 0.9;">{{ image.category }}</p>
              </div>
            </div>
            
            <!-- Overlay hover -->
            <div class="image-overlay">
              <div style="position: absolute; inset: 0; background-color: rgba(141, 85, 36, 0.9); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                <div style="text-align: center; color: white;">
                  <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <p style="font-size: 0.875rem;">Ver detalles</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Información del proyecto -->
          <div style="padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">{{ image.title }}</h3>
            <p style="color: #8D5524; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">{{ image.category }}</p>
            <p style="color: #6B7280; font-size: 0.875rem; line-height: 1.4;">{{ image.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal Lightbox -->
      <div 
        v-if="showLightbox" 
        @click="closeLightbox"
        style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem;"
        class="lightbox-overlay"
      >
        <div 
          @click.stop
          style="background-color: white; border-radius: 1rem; max-width: 90vw; max-height: 90vh; overflow: hidden; position: relative;"
          class="lightbox-content"
        >
          <!-- Botón cerrar -->
          <button 
            @click="closeLightbox"
            style="position: absolute; top: 1rem; right: 1rem; background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;"
          >
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Imagen del lightbox -->
          <div style="height: 60vh; background: linear-gradient(45deg, #F5E9DA, #8D5524); display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center; color: white;">
              <svg style="width: 4rem; height: 4rem; margin-bottom: 1rem;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v1.816a.994.994 0 00.064.316l6.636 13.271c.204.408.804.408 1.008 0l6.636-13.271A.994.994 0 0016 6.816V5a2 2 0 00-2-2H4z"/>
              </svg>
              <h3 style="font-size: 1.5rem; font-weight: 600;">{{ currentImage?.title }}</h3>
            </div>
          </div>

          <!-- Información detallada -->
          <div style="padding: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">{{ currentImage?.title }}</h3>
            <p style="color: #8D5524; font-weight: 600; margin-bottom: 1rem;">{{ currentImage?.category }}</p>
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 1.5rem;">{{ currentImage?.fullDescription }}</p>
            
            <!-- Características del proyecto -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div v-for="feature in currentImage?.features" :key="feature" style="display: flex; align-items: center; gap: 0.5rem;">
                <svg style="width: 1rem; height: 1rem; color: #8D5524;" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span style="font-size: 0.875rem; color: #374151;">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Navegación del lightbox -->
          <div style="position: absolute; top: 50%; transform: translateY(-50%); left: 1rem;">
            <button 
              @click="previousImage" 
              :disabled="currentImageIndex === 0"
              style="background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              :style="{ opacity: currentImageIndex === 0 ? 0.5 : 1 }"
            >
              <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>
          
          <div style="position: absolute; top: 50%; transform: translateY(-50%); right: 1rem;">
            <button 
              @click="nextImage" 
              :disabled="currentImageIndex === filteredImages.length - 1"
              style="background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              :style="{ opacity: currentImageIndex === filteredImages.length - 1 ? 0.5 : 1 }"
            >
              <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'GallerySection',
  setup() {
    const selectedCategory = ref('all')
    const showLightbox = ref(false)
    const currentImageIndex = ref(0)

    const categories = ref([
      { id: 'all', name: 'Todos los Proyectos' },
      { id: 'cocinas', name: 'Cocinas' },
      { id: 'closets', name: 'Closets' },
      { id: 'oficinas', name: 'Oficinas' },
      { id: 'decorativos', name: 'Decorativos' }
    ])

    const galleryImages = ref([
      {
        id: 1,
        title: 'Cocina Integral Moderna',
        category: 'Cocinas',
        categoryId: 'cocinas',
        description: 'Diseño contemporáneo con acabados en madera y detalles en acero.',
        fullDescription: 'Cocina integral de diseño contemporáneo que combina funcionalidad y estética. Fabricada con materiales de primera calidad, incluye isla central, electrodomésticos empotrados y sistema de iluminación LED. El diseño maximiza el espacio de almacenamiento mientras mantiene líneas limpias y modernas.',
        features: ['Isla central funcional', 'Electrodomésticos empotrados', 'Iluminación LED', 'Materiales premium', 'Diseño ergonómico']
      },
      {
        id: 2,
        title: 'Closet Vestidor Luxury',
        category: 'Closets',
        categoryId: 'closets',
        description: 'Vestidor completo con sistema organizador personalizado.',
        fullDescription: 'Vestidor de lujo diseñado para optimizar el espacio y facilitar la organización. Incluye sistema modular de cajones, barras telescópicas, zapatero giratorio y espejo de cuerpo completo. Acabados en madera natural con herrajes de alta calidad.',
        features: ['Sistema modular', 'Zapatero giratorio', 'Barras telescópicas', 'Espejo integrado', 'Cajones soft-close']
      },
      {
        id: 3,
        title: 'Oficina Ejecutiva',
        category: 'Oficinas',
        categoryId: 'oficinas',
        description: 'Mobiliario ejecutivo con diseño ergonómico y funcional.',
        fullDescription: 'Conjunto de mobiliario para oficina ejecutiva que incluye escritorio en L, librería integrada, archivadores y mesa de reuniones. Diseñado para maximizar la productividad con espacios organizados y ergonomía avanzada.',
        features: ['Escritorio en L', 'Librería integrada', 'Sistema de cables', 'Mesa de reuniones', 'Archivadores modulares']
      },
      {
        id: 4,
        title: 'Mueble TV Flotante',
        category: 'Decorativos',
        categoryId: 'decorativos',
        description: 'Centro de entretenimiento minimalista con almacenamiento oculto.',
        fullDescription: 'Mueble de TV suspendido que combina diseño minimalista con funcionalidad. Incluye compartimentos ocultos para equipos, sistema de gestión de cables y estantes flotantes complementarios. Perfecto para espacios modernos.',
        features: ['Montaje flotante', 'Gestión de cables', 'Almacenamiento oculto', 'Diseño minimalista', 'Estantes complementarios']
      },
      {
        id: 5,
        title: 'Cocina Rústica Campestre',
        category: 'Cocinas',
        categoryId: 'cocinas',
        description: 'Estilo campestre con maderas naturales y detalles artesanales.',
        fullDescription: 'Cocina de estilo rústico campestre fabricada con maderas nobles y acabados artesanales. Incluye alacena tradicional, mesa de trabajo central en madera maciza y detalles en herrajes de hierro forjado. Perfecta para espacios con personalidad.',
        features: ['Maderas nobles', 'Herrajes artesanales', 'Mesa central maciza', 'Alacena tradicional', 'Acabados naturales']
      },
      {
        id: 6,
        title: 'Walk-in Closet Moderno',
        category: 'Closets',
        categoryId: 'closets',
        description: 'Vestidor abierto con iluminación integrada y acabados premium.',
        fullDescription: 'Walk-in closet de diseño moderno con sistema abierto que facilita la visualización de todas las prendas. Iluminación LED perimetral, espejo panorámico y isla central con cajones para accesorios. Acabados en laminado de alta presión.',
        features: ['Sistema abierto', 'Iluminación LED perimetral', 'Isla central', 'Espejo panorámico', 'Laminados premium']
      }
    ])

    const filteredImages = computed(() => {
      if (selectedCategory.value === 'all') {
        return galleryImages.value
      }
      return galleryImages.value.filter(image => image.categoryId === selectedCategory.value)
    })

    const currentImage = computed(() => {
      return filteredImages.value[currentImageIndex.value]
    })

    const filterGallery = (categoryId) => {
      selectedCategory.value = categoryId
    }

    const getFilterButtonStyle = (categoryId) => {
      const isActive = selectedCategory.value === categoryId
      return {
        padding: '0.5rem 1.5rem',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isActive ? '#8D5524' : '#F5E9DA',
        color: isActive ? 'white' : '#8D5524',
        fontWeight: '500'
      }
    }

    const getImageCardStyle = () => {
      return {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }
    }

    const getImageStyle = (image) => {
      return {
        width: '100%',
        height: '300px',
        position: 'relative',
        background: `linear-gradient(135deg, #F5E9DA 0%, #8D5524 100%)`
      }
    }

    const getAnimationType = (index) => {
      const animations = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in']
      return animations[index % animations.length]
    }

    const openLightbox = (index) => {
      currentImageIndex.value = index
      showLightbox.value = true
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      showLightbox.value = false
      document.body.style.overflow = 'auto'
    }

    const nextImage = () => {
      if (currentImageIndex.value < filteredImages.value.length - 1) {
        currentImageIndex.value++
      }
    }

    const previousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--
      }
    }

    // Manejar teclas del teclado
    const handleKeydown = (event) => {
      if (!showLightbox.value) return
      
      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      } else if (event.key === 'ArrowLeft') {
        previousImage()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    return {
      categories,
      selectedCategory,
      galleryImages,
      filteredImages,
      showLightbox,
      currentImageIndex,
      currentImage,
      filterGallery,
      getFilterButtonStyle,
      getImageCardStyle,
      getImageStyle,
      getAnimationType,
      openLightbox,
      closeLightbox,
      nextImage,
      previousImage
    }
  }
}
</script>

<style scoped>
.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gallery-item:hover .image-overlay > div {
  opacity: 1;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(141, 85, 36, 0.3);
}

.lightbox-overlay {
  animation: fadeIn 0.3s ease-out;
}

.lightbox-content {
  animation: scaleIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
