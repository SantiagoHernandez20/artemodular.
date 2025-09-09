<template>
  <section id="inicio" style="background: linear-gradient(to bottom right, #F5E9DA, #E6D4C1);" class="section-padding">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Contenido principal -->
        <div class="text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Tu aliado en
            <span style="color: #8D5524;">diseño <span style="color: black;">y</span> fabricación</span>
            de muebles a medida
          </h1>
          
          <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Creamos muebles únicos que se adaptan perfectamente a tu espacio y estilo de vida. 
            Desde la idea inicial hasta la instalación final.
          </p>

          <!-- Botones con mejor espaciado -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-8 sm:mb-12">
            <a href="#contacto" class="btn-primary text-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
              <span class="hidden sm:inline">Solicitar Presupuesto Gratuito</span>
              <span class="sm:hidden">Presupuesto Gratuito</span>
            </a>
            <a href="tel:+573133589795" class="btn-secondary flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold border-2 transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span class="truncate">313 358-9795</span>
            </a>
          </div>

          <!-- Estadísticas simplificadas para móvil -->
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-8D5524 mb-2">25+</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Años de experiencia</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-8D5524 mb-2">300+</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Proyectos realizados</div>
            </div>
            <!-- Ocultar tercera estadística en móvil -->
            <div class="text-center lg:text-left hidden lg:block">
              <div class="text-2xl sm:text-3xl font-bold text-8D5524 mb-2">24/7</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Disponibilidad</div>
            </div>
          </div>
        </div>

        <!-- Showcase 3D Completo -->
        <div class="relative order-first lg:order-last mb-8 lg:mb-0">
          <ThreeDShowcase />
          
          <!-- Elementos decorativos -->
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-8D5524 rounded-full opacity-60"></div>
          <div class="absolute -bottom-2 -left-2 w-12 h-12 bg-6B3F1A rounded-full opacity-40"></div>
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
