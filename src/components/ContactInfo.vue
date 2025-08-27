<template>
  <div class="contact-info-item group">
    <!-- Icono principal con fondo -->
    <div class="icon-container">
      <PhoneIcon v-if="icon === 'PhoneIcon'" />
      <EmailIcon v-else-if="icon === 'EmailIcon'" />
      <LocationIcon v-else-if="icon === 'LocationIcon'" />
    </div>
    
    <!-- Contenido de información -->
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="main-content">{{ content }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    
    <!-- Enlace si existe -->
    <a v-if="href" :href="href" class="action-link" :aria-label="`${title} - ${content}`">
      <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
</template>

<script>
import { PhoneIcon, EmailIcon, LocationIcon } from './icons/ContactIcons.vue'

export default {
  name: 'ContactInfo',
  components: {
    PhoneIcon,
    EmailIcon,
    LocationIcon
  },
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

.contact-info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
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
  box-shadow: 0 8px 24px rgba(141, 85, 36, 0.2);
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

/* Iconos SVG - IMPORTANTE: sobrescribir estilos del componente padre */
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

/* Enlace de acción */
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
}

.action-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #F5E9DA;
  transition: transform 0.3s ease;
}

.action-link:hover .arrow-icon {
  transform: translateX(2px);
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
