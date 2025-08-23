<template>
  <!-- Sección principal de la galería de proyectos -->
  <section id="galeria" style="background-color: white;" class="section-padding">
    <div class="container-custom">
      <!-- Encabezado de la sección con título y descripción -->
      <div style="text-align: center; margin-bottom: 4rem;">
        <h2 style="font-size: 2.25rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">
          Nuestra Galería de Proyectos
        </h2>
        <p style="font-size: 1.25rem; color: #4B5563; max-width: 48rem; margin: 0 auto;">
          Descubre la calidad y belleza de nuestros trabajos. Cada proyecto refleja nuestro compromiso con la excelencia
          y el diseño personalizado.
        </p>
      </div>

      <!-- Filtros de categoría - Botones para filtrar proyectos por tipo -->
      <div style="display: flex; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap; gap: 0.5rem;">
        <button v-for="category in categories" :key="category.id" @click="filterGallery(category.id)"
          :style="getFilterButtonStyle(category.id)" class="filter-btn">
          {{ category.name }}
        </button>
      </div>

      <!-- Grid de galería con animaciones - Muestra las tarjetas de proyectos -->
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;"
        class="gallery-grid">
        <div v-for="(project, index) in filteredImages" :key="project.id" @click="openLightbox(index)"
          :style="getImageCardStyle()" class="gallery-item" :data-aos="getAnimationType(index)"
          :data-aos-delay="index * 100">
          <!-- Contenedor de imagen con múltiples imágenes y paginación interna -->
          <div style="position: relative; overflow: hidden; border-radius: 0.75rem; height: 300px; cursor: pointer;">
            <!-- Imagen principal del proyecto (primera imagen o placeholder) -->
            <template v-if="project.images && project.images.length > 0">
              <img :src="getCurrentProjectImage(project)" :alt="project.title"
                style="width: 100%; height: 300px; object-fit: cover; display: block;" />
            </template>
            <template v-else>
              <!-- Placeholder cuando no hay imágenes -->
              <div :style="getImageStyle(project)" class="image-placeholder">
                <div
                  style="position: absolute; inset: 0; background: linear-gradient(45deg, #8D5524, #6B3F1A); opacity: 0.8;">
                </div>
                <div
                  style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; text-align: center; padding: 1rem;">
                  <svg style="width: 3rem; height: 3rem; margin-bottom: 0.75rem;" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M4 3a2 2 0 00-2 2v1.816a.994.994 0 00.064.316l6.636 13.271c.204.408.804.408 1.008 0l6.636-13.271A.994.994 0 0016 6.816V5a2 2 0 00-2-2H4z" />
                    <path d="M6 7a1 1 0 112 0v4a1 1 0 11-2 0V7zM10 7a1 1 0 112 0v4a1 1 0 11-2 0V7z" />
                  </svg>
                  <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">{{ project.title }}</h3>
                  <p style="font-size: 0.875rem; opacity: 0.9;">{{ project.category }}</p>
                </div>
              </div>
            </template>

            <!-- Controles de paginación para múltiples imágenes del proyecto -->
            <template v-if="project.images && project.images.length > 1">
              <!-- Botón imagen anterior -->
              <button @click.stop="previousProjectImage(project.id)"
                style="position: absolute; left: 0.5rem; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.6); color: white; border: none; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;"
                class="project-nav-btn">
                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Botón imagen siguiente -->
              <button @click.stop="nextProjectImage(project.id)"
                style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.6); color: white; border: none; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;"
                class="project-nav-btn">
                <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Indicadores de página (puntos) -->
              <div
                style="position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.25rem; z-index: 10;">
                <div v-for="(img, imgIndex) in project.images" :key="imgIndex"
                  :style="getImageIndicatorStyle(project.id, imgIndex)" class="image-indicator"></div>
              </div>
            </template>

            <!-- Overlay hover para abrir modal -->
            <div class="image-overlay">
              <div
                style="position: absolute; inset: 0; background-color: rgba(141, 85, 36, 0.9); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                <div style="text-align: center; color: white;">
                  <svg style="width: 2rem; height: 2rem; margin: 0 auto 0.5rem;" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p style="font-size: 0.875rem;">Ver detalles</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Información del proyecto con contador de imágenes -->
          <div style="padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">{{ project.title
              }}</h3>
            <p style="color: #8D5524; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">{{ project.category
              }}</p>
            <p style="color: #6B7280; font-size: 0.875rem; line-height: 1.4; margin-bottom: 0.5rem;">{{
              project.description }}</p>
            <p v-if="project.images && project.images.length > 1" style="color: #9CA3AF; font-size: 0.75rem;">
              {{ project.images.length }} imágenes disponibles
            </p>
          </div>
        </div>
      </div>

      <!-- Modal Lightbox - Vista ampliada del proyecto con todas sus imágenes -->
      <div v-if="showLightbox" @click="closeLightbox"
        style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem; overflow-y: auto;"
        class="lightbox-overlay">
        <div @click.stop
          style="background-color: white; border-radius: 1rem; max-width: 95vw; max-height: 95vh; overflow-y: auto; position: relative; width: 100%; max-width: 1200px; margin: auto;"
          class="lightbox-content">
          <!-- Botón cerrar -->
          <button @click="closeLightbox"
            style="position: absolute; top: 1rem; right: 1rem; background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;">
            <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Imagen principal del lightbox con navegación -->
          <div
            style="height: 70vh; position: relative; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center;">
            <template v-if="currentImage?.images && currentImage.images.length > 0">
              <img :src="getCurrentLightboxImage()" :alt="currentImage.title"
                style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />

              <!-- Navegación de imágenes dentro del lightbox -->
              <template v-if="currentImage.images.length > 1">
                <button @click="previousLightboxImage"
                  style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.7); color: white; border: none; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                  <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button @click="nextLightboxImage"
                  style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.7); color: white; border: none; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                  <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Contador de imágenes -->
                <div
                  style="position: absolute; bottom: 1rem; right: 1rem; background-color: rgba(0, 0, 0, 0.7); color: white; padding: 0.5rem 1rem; border-radius: 1rem; font-size: 0.875rem;">
                  {{ currentLightboxImageIndex + 1 }} / {{ currentImage.images.length }}
                </div>
              </template>
            </template>
            <template v-else>
              <!-- Placeholder en lightbox cuando no hay imágenes -->
              <div style="text-align: center; color: #6B7280;">
                <svg style="width: 4rem; height: 4rem; margin-bottom: 1rem;" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M4 3a2 2 0 00-2 2v1.816a.994.994 0 00.064.316l6.636 13.271c.204.408.804.408 1.008 0l6.636-13.271A.994.994 0 0016 6.816V5a2 2 0 00-2-2H4z" />
                </svg>
                <h3 style="font-size: 1.5rem; font-weight: 600;">{{ currentImage?.title }}</h3>
              </div>
            </template>
          </div>

          <!-- Información detallada -->
          <div style="padding: 1.5rem; padding-bottom: 2rem;">
            <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">{{
              currentImage?.title }}
            </h3>
            <p style="color: #8D5524; font-weight: 600; margin-bottom: 1rem;">{{ currentImage?.category }}</p>
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 1.5rem;">{{ currentImage?.fullDescription ||
              currentImage?.description }}</p>

            <!-- Debug info - mostrar si hay features cargados -->
            <div v-if="!currentImage?.features || currentImage.features.length === 0"
              style="background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem;">
              <p style="color: #92400E; font-size: 0.875rem;">⚠️ No se encontraron características para este proyecto
              </p>
              <p style="color: #92400E; font-size: 0.75rem;">Proyecto ID: {{ currentImage?.id }}</p>
            </div>

            <!-- Características del proyecto -->
            <div v-if="currentImage?.features && currentImage.features.length > 0" style="margin-bottom: 1rem;">
              <h4 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 1rem;">Características
                incluidas:</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.75rem;">
                <div v-for="feature in currentImage.features" :key="feature"
                  style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; background-color: #F9FAFB; border-radius: 0.5rem;">
                  <svg style="width: 1.25rem; height: 1.25rem; color: #8D5524; flex-shrink: 0;" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span style="font-size: 0.875rem; color: #374151; font-weight: 500;">{{ feature }}</span>
                </div>
              </div>
            </div>

           
          </div>

          <!-- Navegación del lightbox -->
          <div style="position: absolute; top: 50%; transform: translateY(-50%); left: 1rem;">
            <button @click="previousImage" :disabled="currentImageIndex === 0"
              style="background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              :style="{ opacity: currentImageIndex === 0 ? 0.5 : 1 }">
              <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div style="position: absolute; top: 50%; transform: translateY(-50%); right: 1rem;">
            <button @click="nextImage" :disabled="currentImageIndex === filteredImages.length - 1"
              style="background-color: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              :style="{ opacity: currentImageIndex === filteredImages.length - 1 ? 0.5 : 1 }">
              <svg style="width: 1.25rem; height: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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
    // Estados principales del componente
    const selectedCategory = ref('all') // Categoría seleccionada para filtrar
    const showLightbox = ref(false) // Control de visibilidad del modal
    const currentImageIndex = ref(0) // Índice del proyecto actualmente mostrado en el lightbox
    const currentLightboxImageIndex = ref(0) // Índice de la imagen actual dentro del proyecto en el lightbox

    // Estados para el control de imágenes por proyecto individual
    const projectImageIndexes = ref({}) // Objeto que almacena el índice de imagen actual para cada proyecto

    // Definición de categorías disponibles
    const categories = ref([
      { id: 'all', name: 'Todos los Proyectos' },
      { id: 'cocinas', name: 'Cocinas' },
      { id: 'closets', name: 'Closets' },
      { id: 'centros', name: 'centros de entretenimiento' },
      { id: 'decorativos', name: 'Decorativos' }
    ])

    // Array que almacena todos los proyectos cargados desde el JSON
    const galleryImages = ref([])

    /**
     * Carga los datos de la galería desde el archivo JSON externo
     * Transforma los datos del JSON en un formato utilizable por el componente
     */
    const loadGalleryImages = async () => {
      try {
        const response = await fetch('/data/gallery.json')
        const data = await response.json()
        let allImages = []
        let id = 1

        // Procesar cada categoría y sus proyectos
        Object.entries(data).forEach(([categoryId, images]) => {
          images.forEach(img => {
            // Crear objeto de proyecto con datos normalizados
            const project = {
              ...img,
              id: id++,
              categoryId,
              category: categories.value.find(c => c.id === categoryId)?.name || categoryId,
              // Asegurar compatibilidad con estructura antigua (image -> images)
              images: img.images || (img.image ? [img.image] : [])
            }
            allImages.push(project)

            // Inicializar índice de imagen para este proyecto
            projectImageIndexes.value[project.id] = 0
          })
        })

        galleryImages.value = allImages
      } catch (error) {
        console.error('Error cargando imágenes:', error)
        galleryImages.value = []
      }
    }

    /**
     * Hook de ciclo de vida - se ejecuta cuando el componente se monta
     */
    onMounted(() => {
      loadGalleryImages()
      document.addEventListener('keydown', handleKeydown)
    })

    /**
     * Computed: Filtra los proyectos según la categoría seleccionada
     */
    const filteredImages = computed(() => {
      if (selectedCategory.value === 'all') {
        return galleryImages.value
      }
      return galleryImages.value.filter(image => image.categoryId === selectedCategory.value)
    })

    /**
     * Computed: Obtiene el proyecto actualmente mostrado en el lightbox
     */
    const currentImage = computed(() => {
      return filteredImages.value[currentImageIndex.value]
    })

    /**
     * Cambia la categoría de filtro seleccionada
     * @param {string} categoryId - ID de la categoría a filtrar
     */
    const filterGallery = (categoryId) => {
      selectedCategory.value = categoryId
    }

    /**
     * Genera los estilos dinámicos para los botones de filtro
     * @param {string} categoryId - ID de la categoría del botón
     * @returns {Object} Objeto con estilos CSS
     */
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

    /**
     * Genera los estilos para las tarjetas de proyecto
     * @returns {Object} Objeto con estilos CSS para las tarjetas
     */
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

    /**
     * Genera los estilos para el placeholder de imagen
     * @param {Object} image - Objeto del proyecto
     * @returns {Object} Objeto con estilos CSS para el placeholder
     */
    const getImageStyle = (image) => {
      return {
        width: '100%',
        height: '300px',
        position: 'relative',
        background: `linear-gradient(135deg, #F5E9DA 0%, #8D5524 100%)`
      }
    }

    /**
     * Obtiene el tipo de animación para una tarjeta según su índice
     * @param {number} index - Índice de la tarjeta
     * @returns {string} Nombre de la animación
     */
    const getAnimationType = (index) => {
      const animations = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in']
      return animations[index % animations.length]
    }

    /**
     * Abre el modal lightbox con el proyecto seleccionado
     * @param {number} index - Índice del proyecto en la lista filtrada
     */
    const openLightbox = (index) => {
      currentImageIndex.value = index
      currentLightboxImageIndex.value = 0 // Resetear a la primera imagen del proyecto
      showLightbox.value = true
      document.body.style.overflow = 'hidden' // Prevenir scroll del body
    }

    /**
     * Cierra el modal lightbox
     */
    const closeLightbox = () => {
      showLightbox.value = false
      document.body.style.overflow = 'auto' // Restaurar scroll del body
    }

    /**
     * Navega al siguiente proyecto en el lightbox
     */
    const nextImage = () => {
      if (currentImageIndex.value < filteredImages.value.length - 1) {
        currentImageIndex.value++
        currentLightboxImageIndex.value = 0 // Resetear a la primera imagen del nuevo proyecto
      }
    }

    /**
     * Navega al proyecto anterior en el lightbox
     */
    const previousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--
        currentLightboxImageIndex.value = 0 // Resetear a la primera imagen del nuevo proyecto
      }
    }

    /**
     * Maneja la navegación por teclado en el lightbox
     * @param {KeyboardEvent} event - Evento de teclado
     */
    const handleKeydown = (event) => {
      if (!showLightbox.value) return

      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowRight') {
        // Navegar entre imágenes del proyecto actual o siguiente proyecto
        if (currentImage.value?.images && currentLightboxImageIndex.value < currentImage.value.images.length - 1) {
          nextLightboxImage()
        } else {
          nextImage()
        }
      } else if (event.key === 'ArrowLeft') {
        // Navegar entre imágenes del proyecto actual o proyecto anterior
        if (currentLightboxImageIndex.value > 0) {
          previousLightboxImage()
        } else {
          previousImage()
        }
      }
    }

    // =======================================
    // FUNCIONES PARA MANEJAR MÚTIPLES IMÁGENES POR PROYECTO
    // =======================================

    /**
     * Obtiene la imagen actual de un proyecto para mostrar en la tarjeta
     * @param {Object} project - Objeto del proyecto
     * @returns {string} URL de la imagen actual
     */
    const getCurrentProjectImage = (project) => {
      if (!project.images || project.images.length === 0) return ''
      const currentIndex = projectImageIndexes.value[project.id] || 0
      return project.images[currentIndex]
    }

    /**
     * Navega a la imagen anterior del proyecto
     * @param {number} projectId - ID del proyecto
     */
    const previousProjectImage = (projectId) => {
      const project = galleryImages.value.find(p => p.id === projectId)
      if (!project || !project.images || project.images.length <= 1) return

      const currentIndex = projectImageIndexes.value[projectId] || 0
      projectImageIndexes.value[projectId] = currentIndex > 0 ? currentIndex - 1 : project.images.length - 1
    }

    /**
     * Navega a la imagen siguiente del proyecto
     * @param {number} projectId - ID del proyecto
     */
    const nextProjectImage = (projectId) => {
      const project = galleryImages.value.find(p => p.id === projectId)
      if (!project || !project.images || project.images.length <= 1) return

      const currentIndex = projectImageIndexes.value[projectId] || 0
      projectImageIndexes.value[projectId] = currentIndex < project.images.length - 1 ? currentIndex + 1 : 0
    }

    /**
     * Genera estilos para los indicadores de imagen (puntos)
     * @param {number} projectId - ID del proyecto
     * @param {number} imageIndex - Índice de la imagen
     * @returns {Object} Estilos CSS para el indicador
     */
    const getImageIndicatorStyle = (projectId, imageIndex) => {
      const currentIndex = projectImageIndexes.value[projectId] || 0
      const isActive = currentIndex === imageIndex
      return {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer'
      }
    }

    // =======================================
    // FUNCIONES PARA EL LIGHTBOX
    // =======================================

    /**
     * Obtiene la imagen actual del lightbox
     * @returns {string} URL de la imagen actual en el lightbox
     */
    const getCurrentLightboxImage = () => {
      if (!currentImage.value?.images || currentImage.value.images.length === 0) return ''
      return currentImage.value.images[currentLightboxImageIndex.value]
    }

    /**
     * Navega a la imagen anterior en el lightbox
     */
    const previousLightboxImage = () => {
      if (!currentImage.value?.images || currentImage.value.images.length <= 1) return

      if (currentLightboxImageIndex.value > 0) {
        currentLightboxImageIndex.value--
      } else {
        currentLightboxImageIndex.value = currentImage.value.images.length - 1
      }
    }

    /**
     * Navega a la imagen siguiente en el lightbox
     */
    const nextLightboxImage = () => {
      if (!currentImage.value?.images || currentImage.value.images.length <= 1) return

      if (currentLightboxImageIndex.value < currentImage.value.images.length - 1) {
        currentLightboxImageIndex.value++
      } else {
        currentLightboxImageIndex.value = 0
      }
    }

    // =======================================
    // RETORNO DE TODAS LAS FUNCIONES Y VARIABLES REACTIVAS
    // =======================================
    return {
      // Estados reactivos
      categories,
      selectedCategory,
      galleryImages,
      filteredImages,
      showLightbox,
      currentImageIndex,
      currentImage,
      currentLightboxImageIndex,
      projectImageIndexes,

      // Funciones principales
      filterGallery,
      openLightbox,
      closeLightbox,
      nextImage,
      previousImage,

      // Funciones de estilo
      getFilterButtonStyle,
      getImageCardStyle,
      getImageStyle,
      getAnimationType,

      // Funciones para múltiples imágenes por proyecto
      getCurrentProjectImage,
      previousProjectImage,
      nextProjectImage,
      getImageIndicatorStyle,

      // Funciones para lightbox
      getCurrentLightboxImage,
      previousLightboxImage,
      nextLightboxImage
    }
  }
}
</script>

<style scoped>
.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.gallery-item:hover .image-overlay>div {
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

/* Mejoras para el lightbox modal */
.lightbox-overlay {
  -webkit-overflow-scrolling: touch;
  /* Scroll suave en iOS */
  overscroll-behavior: contain;
  /* Prevenir scroll en el body */
}

.lightbox-content {
  -webkit-overflow-scrolling: touch;
  /* Scroll suave en iOS */
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: #8D5524 #F5E9DA;
  /* Firefox */
}

/* Estilos para scrollbar en Webkit (Chrome, Safari) */
.lightbox-content::-webkit-scrollbar {
  width: 8px;
}

.lightbox-content::-webkit-scrollbar-track {
  background: #F5E9DA;
  border-radius: 4px;
}

.lightbox-content::-webkit-scrollbar-thumb {
  background: #8D5524;
  border-radius: 4px;
}

.lightbox-content::-webkit-scrollbar-thumb:hover {
  background: #6B3F1A;
}

/* Animaciones para los controles de navegación */
.project-nav-btn {
  transition: all 0.2s ease;
}

.project-nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8) !important;
  transform: scale(1.1);
}

.image-indicator {
  transition: all 0.3s ease;
}

.image-indicator:hover {
  transform: scale(1.2);
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-content {
    max-height: 90vh !important;
    margin: 1rem !important;
    border-radius: 0.5rem !important;
  }

  .lightbox-overlay {
    padding: 0.5rem !important;
    align-items: flex-start !important;
    padding-top: 2rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
