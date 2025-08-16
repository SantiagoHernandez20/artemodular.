<template>
  <section id="inicio" style="background: linear-gradient(to bottom right, #F5E9DA, #E6D4C1);" class="section-padding">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Contenido principal -->
        <div class="text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Tu aliado en
            <span style="color: #8D5524;">diseño <span style="color: black;">y</span> fabricación</span>
            de muebles a medida
          </h1>
          
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Creamos muebles únicos que se adaptan perfectamente a tu espacio y estilo de vida. 
            Desde la idea inicial hasta la instalación final.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center; width: 100%;" class="sm:flex-row lg:justify-start">
            <a href="#contacto" class="btn-primary" style="text-align: center; min-width: 250px;">
              Solicitar Presupuesto Gratuito
            </a>
            <a href="tel:+573133589795" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; text-align: center; min-width: 200px;">
              <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              313 358-9795
            </a>
          </div>

          <!-- Estadísticas -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div class="text-center lg:text-left">
              <div style="font-size: 1.875rem; font-weight: 700; color: #8D5524;">25+</div>
              <div style="color: #6B5B73;">Años de experiencia</div>
            </div>
            <div class="text-center lg:text-left">
              <div style="font-size: 1.875rem; font-weight: 700; color: #8D5524;">300+</div>
              <div style="color: #6B5B73;">Proyectos realizados</div>
            </div>
            <div class="text-center lg:text-left">
              <div style="font-size: 1.875rem; font-weight: 700; color: #8D5524;">24/7</div>
              <div style="color: #6B5B73;">Disponibilidad</div>
            </div>
          </div>
        </div>

        <!-- Showcase 3D Completo -->
        <div class="relative">
          <ThreeDShowcase />
          
          <!-- Elementos decorativos -->
          <div style="position: absolute; top: -1rem; right: -1rem; width: 2rem; height: 2rem; background-color: #8D5524; border-radius: 50%; opacity: 0.6;"></div>
          <div style="position: absolute; bottom: -1rem; left: -1rem; width: 3rem; height: 3rem; background-color: #6B3F1A; border-radius: 50%; opacity: 0.4;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ThreeDShowcase from './ThreeDShowcase.vue'

export default {
  name: 'HeroSection',
  components: {
    ThreeDShowcase
  }
}
</script>
