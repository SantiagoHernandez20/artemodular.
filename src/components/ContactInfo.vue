<template>
  <div class="contact-info-item group" :class="{ 'clickable': href }">
    <!-- Enlace principal que cubre toda la tarjeta -->
    <a v-if="href" :href="href" class="full-link" :aria-label="`${title} - ${content}`" target="_blank" rel="noopener noreferrer">
      <span class="sr-only">{{ title }} - {{ content }}</span>
    </a>
    
    <!-- Icono principal con fondo -->
    <div class="icon-container">
      <!-- Icono de teléfono -->
      <svg v-if="icon === 'PhoneIcon'" class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      
      <!-- Icono de email -->
      <svg v-else-if="icon === 'EmailIcon'" class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      
      <!-- Icono de ubicación -->
      <svg v-else-if="icon === 'LocationIcon'" class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      
      <!-- Icono de WhatsApp -->
      <svg v-else-if="icon === 'WhatsAppIcon'" class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M9 7h6m-6 4h6m-6 4h6"/>
      </svg>
      
      <!-- Icono por defecto (teléfono) -->
      <svg v-else class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    </div>
    
    <!-- Contenido de información -->
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="main-content">{{ content }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    
    <!-- Enlace de acción (flecha) -->
    <div v-if="href" class="action-link">
      <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Enlace que cubre toda la tarjeta */
.full-link {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  cursor: pointer;
}

/* Texto oculto para accesibilidad */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Estilo para tarjetas clickeables */
.contact-info-item.clickable {
  cursor: pointer;
}

.contact-info-item.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.contact-info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-info-item:hover::before {
  opacity: 1;
}

/* Contenedor del icono */
.icon-container {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #F5E9DA, #E6D4C1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(141, 85, 36, 0.25);
  transition: all 0.4s ease;
}

.icon-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 16px;
}

/* Iconos SVG */
.icon-container :deep(.contact-icon) {
  width: 32px !important;
  height: 32px !important;
  color: #8D5524 !important;
  z-index: 2;
  position: relative;
  filter: none !important;
}

/* Contenido */
.content {
  flex: 1;
  min-width: 0;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #F5E9DA;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.main-content {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.subtitle {
  font-size: 0.875rem;
  color: rgba(245, 233, 218, 0.8);
  margin: 0;
  line-height: 1.4;
}

/* Enlace de acción (flecha) */
.action-link {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: none; /* No intercepta clicks */
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #F5E9DA;
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-info-item {
    padding: 1.25rem;
    gap: 0.875rem;
  }
  
  .icon-container {
    width: 52px;
    height: 52px;
  }
  
  .icon-container :deep(.contact-icon) {
    width: 28px !important;
    height: 28px !important;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .main-content {
    font-size: 1.125rem;
  }
  
  .action-link {
    width: 40px;
    height: 40px;
  }
  
  .arrow-icon {
    width: 18px;
    height: 18px;
  }
}

/* Animaciones de entrada */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-info-item {
  animation: slideInUp 0.6s ease-out;
}

.contact-info-item:nth-child(1) { animation-delay: 0.1s; }
.contact-info-item:nth-child(2) { animation-delay: 0.2s; }
.contact-info-item:nth-child(3) { animation-delay: 0.3s; }
</style>
