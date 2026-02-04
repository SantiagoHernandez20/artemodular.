<template>
  <div class="floating-whatsapp-container">
    <!-- Botón flotante principal -->
    <a 
      href="https://wa.me/573133589795?text=Hola%20ArteModular%2C%20me%20gustaría%20conocer%20más%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-whatsapp-button group"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <svg 
        class="w-7 h-7" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
      
      <!-- Tooltip -->
      <div v-if="showTooltip" class="floating-whatsapp-tooltip">
        ¿Necesitas ayuda?<br>Contactanos por WhatsApp
      </div>
    </a>

    <!-- Indicador de pulse (animación) -->
    <div class="floating-whatsapp-pulse"></div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FloatingWhatsAppButton',
  setup() {
    const showTooltip = ref(false)

    return {
      showTooltip
    }
  }
}
</script>

<style scoped>
.floating-whatsapp-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 40;
  animation: slideInUp 0.5s ease-out forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-whatsapp-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #25D366;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;
  cursor: pointer;
}

.floating-whatsapp-button:hover {
  background-color: #20ba5a;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
  transform: scale(1.1);
}

.floating-whatsapp-button:active {
  transform: scale(0.95);
}

.floating-whatsapp-tooltip {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  background-color: #2A1B11;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-out;
  pointer-events: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.floating-whatsapp-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #25D366;
  opacity: 0;
  animation: pulse 2s ease-out infinite;
  top: 0;
  left: 0;
  pointer-events: none;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Responsividad */
@media (max-width: 640px) {
  .floating-whatsapp-container {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .floating-whatsapp-button {
    width: 3.5rem;
    height: 3.5rem;
  }

  .floating-whatsapp-button svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .floating-whatsapp-tooltip {
    right: auto;
    left: 100%;
    margin-right: 0;
    margin-left: 1rem;
  }
}
</style>
