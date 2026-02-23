<template>
  <div class="legal-page">
    
    <main class="legal-content">
      <div class="container-custom py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Términos de Servicio</h1>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {{ currentDate }}
            </p>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de términos</h2>
              <p class="text-gray-700 mb-4">
                Al acceder y utilizar el sitio web de ArteModular, usted acepta cumplir con estos Términos de Servicio. 
                Si no está de acuerdo con alguno de estos términos, por favor no utilice nuestro sitio web.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Servicios ofrecidos</h2>
              <p class="text-gray-700 mb-4">
                ArteModular es una empresa de carpintería especializada en soluciones de mobiliario a medida, incluyendo:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cocinas integrales</li>
                <li>Closets y vestidores</li>
                <li>Centros de entretenimiento</li>
                <li>Muebles flotantes</li>
                <li>Bibliotecas y escritorios</li>
                <li>Puertas y elementos decorativos</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Proceso de cotización</h2>
              <p class="text-gray-700 mb-4">
                Las cotizaciones proporcionadas a través de nuestro sitio web son estimaciones basadas en la información 
                proporcionada por el cliente. El precio final puede variar según:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Medidas exactas tomadas en sitio</li>
                <li>Materiales seleccionados</li>
                <li>Complejidad del diseño</li>
                <li>Tiempo de fabricación e instalación</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Proceso de trabajo</h2>
              <p class="text-gray-700 mb-4">
                Nuestro proceso de trabajo incluye las siguientes etapas:
              </p>
              <ol class="list-decimal pl-6 text-gray-700 space-y-2">
                <li><strong>Diseño:</strong> Creación de planos y diseños personalizados según las necesidades del cliente.</li>
                <li><strong>Fabricación:</strong> Producción de muebles con materiales de primera calidad.</li>
                <li><strong>Instalación:</strong> Montaje profesional en el lugar indicado.</li>
              </ol>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Política de pagos</h2>
              <p class="text-gray-700 mb-4">
                Los pagos se estructuran de la siguiente manera:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>60% del valor como anticipo para iniciar la fabricación</li>
                <li>40% restante al finalizar la instalación</li>
                <li>Formas de pago: Efectivo, transferencia, datáfono</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Garantía</h2>
              <p class="text-gray-700 mb-4">
                ArteModular ofrece garantía en todos nuestros productos por defectos de fabricación. 
                La garantía no cubre daños causados por uso inadecuado, modificaciones realizadas por terceros 
                o desgaste natural de los materiales.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Propiedad intelectual</h2>
              <p class="text-gray-700 mb-4">
                Todos los diseños, imágenes, logotipos y contenido de este sitio web son propiedad de ArteModular. 
                Queda prohibida la reproducción total o parcial sin autorización previa por escrito.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Limitación de responsabilidad</h2>
              <p class="text-gray-700 mb-4">
                ArteModular no será responsable por daños indirectos, incidentales o consecuentes derivados 
                del uso de nuestro sitio web o de nuestros servicios. Nuestra responsabilidad total no excederá 
                el monto pagado por el cliente por el servicio específico en cuestión.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones</h2>
              <p class="text-gray-700 mb-4">
                Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. 
                Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">10. Contacto</h2>
              <p class="text-gray-700 mb-4">
                Para preguntas sobre estos Términos de Servicio, puede contactarnos en:
              </p>
              <ul class="list-none pl-6 text-gray-700 space-y-2">
                <li><strong>Email:</strong> artemodular2022@gmail.com</li>
                <li><strong>Teléfono:</strong> 313-358-9795</li>
                <li><strong>Ubicación:</strong> Mosquera, Cundinamarca</li>
              </ul>
            </section>
          </div>

          <div class="mt-12 pt-8 border-t">
            <router-link 
              to="/" 
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </router-link>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script>


export default {
  name: 'TermsOfService',

  computed: {
    currentDate() {
      return new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.legal-content {
  flex: 1;
  background-color: #F5F3F0;
}

.prose h2 {
  margin-top: 1.5rem;
}

.prose ul, .prose ol {
  margin-top: 0.5rem;
}
</style>
