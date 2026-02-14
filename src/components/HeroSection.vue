<template>
  <section id="inicio" style="background: linear-gradient(to bottom right, #F5E9DA, #E6D4C1);" class="section-padding">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Contenido principal -->
        <div class="text-center lg:text-left">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Tu aliado en
            <span style="color: #8D5524;">diseño <span style="color: black;">y</span> fabricación</span>
            de muebles a medida
          </h2>

          <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Creamos muebles únicos que se adaptan perfectamente a tu espacio y estilo de vida.
            Desde la idea inicial hasta la instalación final.
          </p>

          <!-- Botones con mejor espaciado -->
          <div class="w-full max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-12">
            <div class="flex-container">
              <a href="#contacto" class="button button-primary">
                <span>Solicitar Presupuesto</span>
              </a>
              <a href="tel:+573133589795" class="button button-secondary">
                <svg class="phone-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>313-358-9795</span>
              </a>
            </div>
          </div>

        
          
        
          <!-- Estadísticas simplificadas para móvil -->
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold mb-2" style="color: #8D5524;">15+</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Años de experiencia</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold mb-2" style="color: #8D5524;">300+</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Proyectos realizados</div>
            </div>
            <!-- Ocultar tercera estadística en móvil -->
            <div class="text-center lg:text-left hidden lg:block">
              <div class="text-2xl sm:text-3xl font-bold mb-2" style="color: #8D5524;">24/7</div>
              <div class="text-sm sm:text-base text-gray-600 font-medium">Disponibilidad</div>
            </div>
          </div>
        </div>

        <!-- Showcase 3D Completo -->
        <div class="mb-0">
          <ThreeDShowcase />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin: 0 auto 2rem auto;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  white-space: nowrap;
}

.button-primary {
  background-color: #8D5524;
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: auto;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.button-primary:active {
  transform: translateY(0);
}

.button-secondary {
  background-color: transparent;
  color: #1a1a1a;
  border: 2px solid #8D5524;
  height: auto;
}

.button-secondary:hover {
  background-color: rgba(141, 85, 36, 0.1);
  transform: translateY(-2px);
}

.button-secondary:active {
  transform: translateY(0);
}

.phone-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

/* Tablet y superior */
@media (min-width: 768px) { 
  .flex-container {
    flex-direction: row;
    gap: 1rem;
    max-width: 36rem;
  }

  .button {
    width: 50%;
    padding: 1rem;
    font-size: 1.125rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .flex-container {
    margin: 0 0 2rem 0;
  }
}
</style>

<script>
import ThreeDShowcase from './ThreeDShowcase.vue'

export default {
  name: 'HeroSection',
  components: {
    ThreeDShowcase
  }
}
</script>
