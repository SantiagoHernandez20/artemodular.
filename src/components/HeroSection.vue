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

        <!-- Imagen principal -->
        <div class="relative">
          <div style="background: linear-gradient(to bottom right, #8D5524, #6B3F1A); border-radius: 1rem; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
            <!-- Simulación de imagen - aquí irían las fotos reales -->
            <div style="background-color: white; border-radius: 0.75rem; padding: 1.5rem; min-height: 400px; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center;">
                <svg style="width: 6rem; height: 6rem; color: #8D5524; margin: 0 auto 1rem;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"/>
                </svg>
                <p style="color: #4B5563;">Muebles de alta calidad</p>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem;">Diseñados especialmente para ti</p>
              </div>
            </div>
          </div>

          <!-- Elementos decorativos -->
          <div style="position: absolute; top: -1rem; right: -1rem; width: 2rem; height: 2rem; background-color: #8D5524; border-radius: 50%; opacity: 0.6;"></div>
          <div style="position: absolute; bottom: -1rem; left: -1rem; width: 3rem; height: 3rem; background-color: #6B3F1A; border-radius: 50%; opacity: 0.4;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>
