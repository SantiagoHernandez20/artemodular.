<template>
  <div class="legal-page">
    
    <main class="legal-content">
      <div class="container-custom py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {{ currentDate }}
            </p>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Información que recopilamos</h2>
              <p class="text-gray-700 mb-4">
                En ArteModular, respetamos su privacidad y nos comprometemos a proteger sus datos personales. 
                Esta política de privacidad establece cómo recopilamos, usamos y protegemos su información.
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Información de contacto:</strong> Nombre, correo electrónico, número de teléfono y dirección cuando nos contacta directamente.</li>
                <li><strong>Datos de uso:</strong> Información sobre cómo interactúa con nuestro sitio web.</li>
                <li><strong>Cookies:</strong> Utilizamos cookies para mejorar su experiencia de navegación.</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Cómo usamos su información</h2>
              <p class="text-gray-700 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Responder a sus consultas y solicitudes de cotización</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Enviar comunicaciones relacionadas con proyectos solicitados</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Protección de datos</h2>
              <p class="text-gray-700 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales 
                contra accesos no autorizados, alteraciones, divulgaciones o destrucciones.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Compartir información</h2>
              <p class="text-gray-700 mb-4">
                No vendemos, intercambiamos ni transferimos sus datos personales a terceros sin su consentimiento, 
                excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos.
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Derechos del usuario</h2>
              <p class="text-gray-700 mb-4">
                Usted tiene derecho a:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al tratamiento de sus datos</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Contacto</h2>
              <p class="text-gray-700 mb-4">
                Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en:
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
  name: 'PrivacyPolicy',
 
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

.prose ul {
  margin-top: 0.5rem;
}
</style>
