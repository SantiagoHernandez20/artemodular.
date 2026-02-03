<template>
  <header style="background-color: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 50;">
    <nav class="container-custom">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo-section">
          <div class="logo-container">
            <img 
              src="/logo.png" 
              alt="Logo ArteModular - Carpintería a medida"
              class="logo-image"
            >
          </div>
          <div class="logo-text">
            <h1>ArteModular</h1>
            <p>Carpintería a medida</p>
          </div>
        </div>

        <!-- Navegación desktop -->
        <div class="nav-desktop">
          <div class="nav-links">
            <router-link to="/" class="nav-link">Inicio</router-link>
            <router-link to="/servicios" class="nav-link">Servicios</router-link>
            <router-link to="/proceso" class="nav-link">Proceso</router-link>
            <router-link to="/testimonios" class="nav-link">Testimonios</router-link>
            <router-link to="/galeria" class="nav-link">Galería</router-link>
            <router-link to="/contacto" class="btn-primary">Solicitar Presupuesto</router-link>
          </div>

        </div>

        <!-- Controles móviles -->
        <div class="mobile-controls">
          <!-- Botón menú móvil -->
          <button @click="toggleMenu" class="mobile-menu-btn" aria-label="Abrir menú">
            <svg class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Navegación móvil -->
      <div v-show="isMenuOpen" class="mobile-nav">
        <div class="mobile-nav-content">
          <!-- Enlaces de navegación -->
          <router-link to="/" @click="closeMenu" class="mobile-nav-link">Inicio</router-link>
          <router-link to="/servicios" @click="closeMenu" class="mobile-nav-link">Servicios</router-link>
          <router-link to="/proceso" @click="closeMenu" class="mobile-nav-link">Proceso</router-link>
          <router-link to="/testimonios" @click="closeMenu" class="mobile-nav-link">Testimonios</router-link>
          <router-link to="/galeria" @click="closeMenu" class="mobile-nav-link">Galería</router-link>
          <router-link to="/contacto" @click="closeMenu" class="mobile-nav-link btn-primary">Solicitar Presupuesto</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu
    }
  }
}
</script>

<style scoped>
/* Header container */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

/* Logo section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.logo-container {
  background-color: transparent;
  width: auto;
  height: auto;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  max-width: 2rem;
  max-height: 2rem;
}

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;
}

.logo-text p {
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.2;
}

/* Navegación desktop */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #8D5524;
}

/* Estilos para router-link activo */
.nav-link.router-link-active {
  color: #8D5524;
  font-weight: 600;
}

/* Sección de usuario */
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info,
.admin-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  min-width: 0;
}

.user-avatar,
.admin-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #8D5524;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.user-details,
.admin-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.user-name,
.admin-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.user-link,
.admin-link {
  color: #8D5524;
  font-size: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.user-link:hover,
.admin-link:hover {
  color: #6B3F1A;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Estilos para la sección de autenticación */
.auth-section {
  display: flex;
  align-items: center;
}

/* Controles móviles */
.mobile-controls {
  display: none;
  align-items: center;
  gap: 1rem;
}

.mobile-user-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-user-info,
.mobile-admin-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  min-width: 0;
  max-width: 200px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.mobile-user-info:hover,
.mobile-admin-info:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mobile-user-avatar,
.mobile-admin-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #8D5524;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.mobile-user-details,
.mobile-admin-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.mobile-user-name,
.mobile-admin-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.mobile-user-link,
.mobile-admin-link {
  color: #8D5524;
  font-size: 0.625rem;
  font-weight: 500;
}

.mobile-logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mobile-logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.mobile-auth-icon {
  display: flex;
  align-items: center;
}

/* Botón menú móvil */
.mobile-menu-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #374151;
}

.hamburger-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Navegación móvil */
.mobile-nav {
  display: none;
  border-top: 1px solid #e5e7eb;
}

.mobile-nav-content {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.mobile-nav-link {
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.2s;
}

.mobile-nav-link:hover {
  color: #8D5524;
}

/* Estilos para router-link activo en móvil */
.mobile-nav-link.router-link-active {
  color: #8D5524;
  font-weight: 600;
}

.mobile-role-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8D5524;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 0;
}

.mobile-role-link.admin {
  color: #8D5524;
}

.mobile-role-link.user {
  color: #8D5524;
}

/* Botón primario */
.btn-primary {
  background: linear-gradient(135deg, #8D5524, #6B3F1A);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-desktop {
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-links a {
    font-size: 0.875rem;
  }

  .user-info,
  .admin-info {
    padding: 0.375rem 0.75rem;
  }

  .user-name,
  .admin-name {
    max-width: 100px;
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none; /* Ocultar navegación desktop en móvil */
  }
  
  .mobile-controls {
    display: flex; /* Mostrar controles móviles */
  }
  
  .mobile-nav {
    display: block; /* Mostrar navegación móvil */
  }
  
  .logo-text h1 {
    font-size: 1.125rem;
  }
  
  .logo-text p {
    font-size: 0.75rem;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0.75rem 0;
  }
  
  .logo-text h1 {
    font-size: 1rem;
  }
  
  .logo-text p {
    font-size: 0.7rem;
  }
  
  .btn-primary {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
  
  .mobile-controls {
    gap: 0.5rem;
  }

  .mobile-user-info,
  .mobile-admin-info {
    padding: 0.25rem 0.5rem;
    max-width: 160px;
  }

  .mobile-user-name,
  .mobile-admin-name {
    max-width: 60px;
    font-size: 0.6875rem;
  }

  .mobile-user-link,
  .mobile-admin-link {
    font-size: 0.5625rem;
  }
}
</style>
