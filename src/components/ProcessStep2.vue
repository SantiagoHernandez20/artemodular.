<template>
  <div class="process-card-container">
    <div 
      class="process-card"
      @click="toggleMobileExpand"
      :class="{ 'is-expanded': isMobileExpanded }"
    >
      <!-- Imagen de fondo -->
      <img 
        :src="step.image" 
        :alt="step.title"
        class="process-card-image"
        loading="lazy"
      />
      
      <!-- Overlay oscuro -->
      <div class="process-card-overlay"></div>

      <!-- Contenido principal (visible siempre) -->
      <div class="process-card-header">
        <p class="process-card-tag">
          {{ step.category }}
        </p>
        <h3 class="process-card-title">{{ step.title }}</h3>
      </div>

      <!-- Contenido expandible (hover en desktop, tap en mobile) -->
      <div class="process-card-content">
        <p class="process-card-description">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProcessStep2',
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isMobileExpanded = ref(false)

    const toggleMobileExpand = () => {
      // Solo hacer toggle en mobile
      if (window.innerWidth < 1024) {
        isMobileExpanded.value = !isMobileExpanded.value
      }
    }

    return {
      isMobileExpanded,
      toggleMobileExpand
    }
  }
}
</script>

<style scoped>
/* ============================================
   PROCESS CARD CONTAINER
   ============================================ */

.process-card-container {
  width: 100%;
  height: 100%;
}

/* ============================================
   PROCESS CARD - IMAGEN CON OVERLAY
   ============================================ */

.process-card {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #000;
  border-radius: 23px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* ============================================
   IMAGEN DE FONDO
   ============================================ */

.process-card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* ============================================
   OVERLAY OSCURO
   ============================================ */

.process-card-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  transition: background-color 0.3s ease;
  z-index: 1;
}

/* ============================================
   CONTENIDO - POSICIONAMIENTO
   ============================================ */

.process-card-header {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  z-index: 2;
  pointer-events: none;
}

.process-card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  z-index: 2;
  pointer-events: none;
}

/* ============================================
   TEXTOS - VISIBILIDAD
   ============================================ */

.process-card-tag {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
  transition: opacity 0.3s ease;
  color: #8D5524;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  width: fit-content;
}

.process-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0.5rem 0 0 0;
  transition: opacity 0.3s ease;
  line-height: 1.3;
}

.process-card-description {
  font-size: 0.875rem;
  color: white;
  margin: 0;
  line-height: 1.6;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}

/* ============================================
   DESKTOP (1024px+) - HOVER REVEAL
   ============================================ */

@media (min-width: 1024px) {
  .process-card:hover .process-card-image {
    opacity: 0.6;
  }

  .process-card:hover .process-card-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .process-card:hover .process-card-description {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   MOBILE (hasta 1024px) - TAP EXPAND
   ============================================ */

@media (max-width: 1023px) {
  .process-card {
    aspect-ratio: 3 / 4;
  }

  /* Estado expandido en mobile */
  .process-card.is-expanded .process-card-image {
    opacity: 0.6;
  }

  .process-card.is-expanded .process-card-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .process-card.is-expanded .process-card-description {
    opacity: 1;
    transform: translateY(0);
  }

  /* Mejorar header visibility en mobile */
  .process-card-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }

  .process-card-title {
    font-size: 1.125rem;
  }
}

/* ============================================
   TABLET (640px - 1023px)
   ============================================ */

@media (min-width: 640px) and (max-width: 1023px) {
  .process-card {
    aspect-ratio: 1 / 1.2;
  }

  .process-card-title {
    font-size: 1.375rem;
  }
}

/* ============================================
   LARGE MOBILE (hasta 640px)
   ============================================ */

@media (max-width: 639px) {
  .process-card {
    aspect-ratio: 3 / 4;
  }

  .process-card-header {
    padding: 1rem;
  }

  .process-card-content {
    padding: 1rem;
  }

  .process-card-tag {
    font-size: 0.7rem;
  }

  .process-card-title {
    font-size: 1rem;
  }

  .process-card-description {
    font-size: 0.8125rem;
  }
}
</style>
