<template>
  <footer class="text-gray-800" style="background: linear-gradient(to bottom, #F5F3F0, #EFEFEB);">
    <!-- Contenido principal del footer -->
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Información de la empresa -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-2 mb-6">
            <div class="logo-container-footer">
              <img 
                src="/logo.png" 
                alt="Logo ArteModular - Carpintería a medida"
                class="logo-image-footer"
              >
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">ArteModular</h3>
              <p class="text-sm text-gray-600">Carpintería a medida</p>
            </div>
          </div>
          
          <p class="text-gray-700 mb-6 leading-relaxed max-w-md">
            Tu destino de referencia para todas tus necesidades de carpintería y muebles a medida. 
            Transformamos espacios con diseños únicos y la más alta calidad.
          </p>
          
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100083188189537" class="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors" target="_blank"> 
              <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
              </svg>
            </a>
         
            <a href="https://www.google.com.co/search?kgmid=/g/11xvrv4x5v&hl=es-CO&q=ArteModular&shndl=30&shem=lcuae,lsptbl1&source=sh/x/loc/osrp/m1/2&kgs=b2aa79673d6769ba"
              class="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all" target="_blank">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
              </svg>
            </a>
          
          </div>
        </div>

        <!-- Enlaces de la empresa -->
        <div>
          <h4 class="text-lg font-semibold mb-6 text-gray-900">Compañía</h4>
          <ul class="space-y-3">
            <li><a href="#inicio" class="text-gray-700 hover:text-gray-900 transition-colors">Inicio</a></li>
            <li><a href="#servicios" class="text-gray-700 hover:text-gray-900 transition-colors">Servicios</a></li>
            <li><a href="#proceso" class="text-gray-700 hover:text-gray-900 transition-colors">Proceso</a></li>
            <li><a href="#galeria" class="text-gray-700 hover:text-gray-900 transition-colors">Galería</a></li>
            <li><a href="#testimonios" class="text-gray-700 hover:text-gray-900 transition-colors">Testimonios</a></li>
            <li><a href="#contacto" class="text-gray-700 hover:text-gray-900 transition-colors">Contacto</a></li>
          </ul>
        </div>

        <!-- Servicios -->
        <div>
          <h4 class="text-lg font-semibold mb-6 text-gray-900">Servicios</h4>
          <ul class="space-y-3">
            <li><span class="text-gray-700">Carpintería de obra</span></li>
            <li><span class="text-gray-700">Muebles de cocina</span></li>
            <li><span class="text-gray-700">Closets y vestidores</span></li>
            <li><span class="text-gray-700">Muebles decorativos</span></li>
            <li><span class="text-gray-700">Renovaciones</span></li>
          </ul>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="border-t mt-12 pt-8" style="border-color: #D1D5DB;">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="text-center md:text-left">
            <h5 class="font-semibold text-gray-900 mb-2">📞 Contacto 24/7</h5>
            <p class="text-gray-700">313-358-9795</p>
          </div>
          <div class="text-center md:text-left">
            <h5 class="font-semibold text-gray-900 mb-2">📧 Email</h5>
            <p class="text-gray-700">aartemodular@gmail.com</p>
          </div>
          <div class="text-center md:text-left">
            <h5 class="font-semibold text-gray-900 mb-2">📍 Ubicación</h5>
            <p class="text-gray-700">Mosquera, Cundinamarca.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="py-6" style="background-color: #EFEFEB; border-top: 1px solid #D1D5DB;">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 text-sm">
            © {{ new Date().getFullYear() }} ArteModular. Todos los derechos reservados.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-600 text-sm hover:text-gray-900 transition-colors">Política de Privacidad</a>
            <a href="#" class="text-gray-600 text-sm hover:text-gray-900 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.logo-container-footer {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.logo-image-footer {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  object-position: center;
  /* Logo en colores originales para mejor visibilidad */
}

/* Responsive adjustments para el footer */
@media (max-width: 640px) {
  .logo-image-footer {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 480px) {
  .logo-image-footer {
    width: 1.75rem;
    height: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .logo-image-footer {
    width: 3rem;
    height: 3rem;
  }
}
</style>
