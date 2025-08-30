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
import { ref } from 'vue'
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

    const handleTestimonialCreated = () => {
      console.log('Testimonio creado correctamente')
    }

    return {
      testimonialsSection,
      handleTestimonialCreated
    }
  }
}
</script>