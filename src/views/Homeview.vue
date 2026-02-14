<template>
  <div class="home-page">
    <HeroSection />
    <ServicesSection />
    <ProcessSection2 />
    <GallerySection />
    <TestimonialsSection ref="testimonialsSection" />

    <!-- Formulario de testimonio -->
    <section class="bg-white section-padding">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Trabajaste con nosotros?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comparte tu experiencia y ayuda a otros a conocer la calidad de nuestro trabajo
          </p>
        </div>

        <TestimonialForm @testimonial-created="handleTestimonialCreated" />
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ProcessSection2 from '../components/ProcessSection2.vue'
import GallerySection from '../components/GallerySection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import TestimonialForm from '../components/TestimonialForm.vue'
import ContactSection from '../components/ContactSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ServicesSection,
    ProcessSection2,
    GallerySection,
    TestimonialsSection,
    TestimonialForm,
    ContactSection
  },
  setup() {
    const testimonialsSection = ref(null)
    const route = useRoute()

    const handleTestimonialCreated = () => {
      //console.log('Testimonio creado correctamente')
    }

    // Escuchar cambios en la ruta para hacer scroll automático
    watch(() => route.meta.scrollTo, (newScrollTo) => {
      if (newScrollTo) {
        // Usar múltiples intentos para asegurar que funcione
        nextTick(() => {
          scrollToSection(newScrollTo)
        })


      }
    }, { immediate: true })

    // También hacer scroll al montar el componente si hay una sección especificada
    onMounted(() => {
      if (route.meta.scrollTo) {
        // Usar nextTick para asegurar que el DOM esté listo
        nextTick(() => {
          scrollToSection(route.meta.scrollTo)
        })
      }
    })

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 80

      // 🔥 Forzar visibilidad del header
      if (header) {
        header.classList.remove('header-hidden', 'hide', '-translate-y-full')
        header.classList.add('header-visible', 'show', 'translate-y-0')
        header.style.transform = 'translateY(0)'
        header.style.opacity = '1'
      }

      // Calcular posición
      const elementRect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset
      const targetPosition = currentScrollY + elementRect.top - headerHeight - 20

      // ✅ Animación suave personalizada
      const startTime = performance.now()
      const duration = 800
      const distance = targetPosition - currentScrollY

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        const currentPosition = currentScrollY + distance * ease

        window.scrollTo(0, currentPosition)

        // 🔥 Mantener header visible durante la animación
        if (header) {
          header.classList.remove('header-hidden', 'hide', '-translate-y-full')
          header.classList.add('header-visible', 'show', 'translate-y-0')
        }

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          // 🔥 Asegurar visibilidad al finalizar
          setTimeout(() => {
            if (header) {
              header.classList.remove('header-hidden', 'hide', '-translate-y-full')
              header.classList.add('header-visible', 'show', 'translate-y-0')
            }
          }, 100)
        }
      }

      requestAnimationFrame(animateScroll)
    }

    // Watch y onMounted igual que arriba
    watch(() => route.meta.scrollTo, (newScrollTo) => {
      if (newScrollTo) {
        nextTick(() => {
          setTimeout(() => scrollToSection(newScrollTo), 150)
        })
      }
    }, { immediate: true })

    onMounted(() => {
      if (route.meta.scrollTo) {
        nextTick(() => {
          setTimeout(() => scrollToSection(route.meta.scrollTo), 200)
        })
      }
    })

    return {
      testimonialsSection,
      handleTestimonialCreated,
      scrollToSection
    }
  }
}
</script>

<style scoped>
/* Asegurar que el scroll funcione correctamente */
.home-page {
  scroll-behavior: auto;
  /* Deshabilitar scroll-behavior del CSS global */
}

/* Asegurar que el header siempre sea visible */
:global(header) {
  position: sticky !important;
  top: 0 !important;
  z-index: 50 !important;
  background-color: white !important;
}
</style>