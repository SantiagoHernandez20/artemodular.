<template>
  <div class="home-page">
    <HeroSection />
    <ServicesSection />
    <ProcessSection />
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
import ProcessSection from '../components/ProcessSection.vue'
import GallerySection from '../components/GallerySection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import TestimonialForm from '../components/TestimonialForm.vue'
import ContactSection from '../components/ContactSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    ServicesSection,
    ProcessSection,
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

    const scrollToSection = (sectionId) => {
      //console.log('🔍 Intentando scroll a:', sectionId)
      
      // Método 1: Usar scrollIntoView directamente
      const element = document.getElementById(sectionId)
      if (element) {
        //console.log('✅ Elemento encontrado, haciendo scroll...')
        
        // Scroll inmediato a la posición
        const headerHeight = 80
        const elementPosition = element.offsetTop - headerHeight
        
        // Forzar scroll inmediato
        document.documentElement.scrollTop = elementPosition
        document.body.scrollTop = elementPosition
        
        // Luego scroll suave
        setTimeout(() => {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }, 50)
      } else {
        //console.log('❌ Elemento no encontrado:', sectionId)
      }
    }

    // Escuchar cambios en la ruta para hacer scroll automático
    watch(() => route.meta.scrollTo, (newScrollTo) => {
      if (newScrollTo) {
        // Usar múltiples intentos para asegurar que funcione
        nextTick(() => {
          scrollToSection(newScrollTo)
        })
        
        // Segundo intento después de un pequeño delay
        setTimeout(() => {
          scrollToSection(newScrollTo)
        }, 100)
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

    return {
      testimonialsSection,
      handleTestimonialCreated
    }
  }
}
</script>