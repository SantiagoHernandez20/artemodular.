<template>
  <div class="image-comparison-container" :style="containerStyle" @click="handleContainerClick">
    
    <!-- IMAGEN 1 (Fondo completo) -->
    <div class="before-image">
      <img 
        src="/images/decorativos/despues.jpg" 
        alt="Diseño 3D en SketchUp" 
        style="width: 100%; height: 100%; object-fit: cover;"
      />
    </div>

    <!-- IMAGEN 2 (Con máscara que se mueve) -->
    <div 
      class="after-image" 
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
    >
      <img 
        src="/images/decorativos/antes.jpg" 
        width="10px"
        height="100px"
        alt="Mueble terminado real" 
        style="width: 100%; height: 100%; object-fit: cover;"
      />
    </div>

    <!-- Labels -->
    <div class="comparison-labels">
      <div class="label-left">
        <span style="background-color: rgba(141, 85, 36, 0.9); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
          DISEÑO 3D
        </span>
      </div>
      <div class="label-right">
        <span style="background-color: rgba(107, 63, 26, 0.9); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
          RESULTADO FINAL  
        </span>
      </div>
    </div>

    <!-- Slider handle -->
    <div 
      class="slider-handle"
      :style="{ left: `${sliderPosition}%` }"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="slider-line"></div>
      <div class="slider-button">
        <svg style="width: 1rem; height: 1rem; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
        </svg>
      </div>
    </div>

    <!-- Instructions -->
    <div class="instructions" v-if="showInstructions">
      <div style="background-color: rgba(0, 0, 0, 0.7); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; text-align: center;">
        <span>↔ Arrastra para comparar</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ImageComparison',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    designType: {
      type: String,
      default: 'kitchen' // kitchen, closet, office, decorative
    }
  },
  setup(props) {
    const sliderPosition = ref(50)
    const isDragging = ref(false)
    const showInstructions = ref(true)

    const containerStyle = {
      width: props.width,
      height: props.height,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '0.75rem',
      cursor: 'ew-resize',
      userSelect: 'none'
    }

    const designImageStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const startDrag = (event) => {
      isDragging.value = true
      showInstructions.value = false
      event.preventDefault()
      
      document.addEventListener('mousemove', handleDrag)
      document.addEventListener('mouseup', stopDrag)
      document.addEventListener('touchmove', handleDrag)
      document.addEventListener('touchend', stopDrag)
    }

    const handleDrag = (event) => {
      if (!isDragging.value) return
      
      const container = event.currentTarget?.closest?.('.image-comparison-container') || 
                       document.querySelector('.image-comparison-container')
      if (!container) return

      const rect = container.getBoundingClientRect()
      const clientX = event.clientX || (event.touches && event.touches[0]?.clientX)
      
      if (clientX) {
        const x = clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        sliderPosition.value = percentage
      }
    }

    const stopDrag = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('touchmove', handleDrag)
      document.removeEventListener('touchend', stopDrag)
    }

    const handleContainerClick = (event) => {
      const container = event.currentTarget
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const percentage = (x / rect.width) * 100
      sliderPosition.value = Math.max(0, Math.min(100, percentage))
      showInstructions.value = false
    }

    // Auto-animation on mount
    onMounted(() => {
      setTimeout(() => {
        // Animate from left to right to show the comparison
        let start = 10
        const end = 90
        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

          sliderPosition.value = start + (end - start) * easeInOut

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            // Return to center after animation
            setTimeout(() => {
              sliderPosition.value = 50
            }, 500)
          }
        }

        animate()
      }, 1000)

      // Hide instructions after a while
      setTimeout(() => {
        showInstructions.value = false
      }, 4000)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('touchmove', handleDrag)
      document.removeEventListener('touchend', stopDrag)
    })

    return {
      sliderPosition,
      isDragging,
      showInstructions,
      containerStyle,
      designImageStyle,
      startDrag,
      handleContainerClick
    }
  }
}
</script>

<style scoped>
.image-comparison-container {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

.image-comparison-container:hover {
  transform: scale(1.02);
}

.before-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.after-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.after-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-handle {
  position: absolute;
  top: 0;
  height: 100%;
  transform: translateX(-50%);
  cursor: ew-resize;
  z-index: 10;
  pointer-events: all;
}

.slider-line {
  width: 2px;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.slider-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  height: 3rem;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.slider-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background-color: #8D5524;
}

.comparison-labels {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.instructions {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  animation: pulse 2s infinite;
  z-index: 5;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slider-button {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .comparison-labels {
    font-size: 0.7rem;
  }
}
</style>
