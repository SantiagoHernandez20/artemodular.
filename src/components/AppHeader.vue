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
            <a href="#inicio" class="nav-link">Inicio</a>
            <a href="#servicios" class="nav-link">Servicios</a>
            <a href="#proceso" class="nav-link">Proceso</a>
            <a href="#testimonios" class="nav-link">Testimonios</a>
            <a href="#galeria" class="nav-link">Galería</a>
            <a href="#contacto" class="btn-primary">Solicitar Presupuesto</a>
          </div>

          <!-- Enlaces según rol -->
          <div class="role-links">
            <a 
              v-if="authStore.isAdmin" 
              href="#" 
              class="admin-link"
              title="Panel de Administración"
            >
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c.94 1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Admin</span>
            </a>
            
            <a 
              v-else-if="authStore.isAuthenticated" 
              href="/dashboard" 
              class="user-link"
              title="Mi Cuenta"
            >
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Mi Cuenta</span>
            </a>
          </div>

          <!-- Google Login - Siempre visible en desktop -->
          <div class="auth-section">
            <GoogleLogin />
          </div>
        </div>

        <!-- Controles móviles -->
        <div class="mobile-controls">
          <!-- Google Login móvil - Solo icono -->
          <div class="mobile-auth-icon">
            <GoogleLogin />
          </div>
          
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
          <a href="#inicio" @click="closeMenu" class="mobile-nav-link">Inicio</a>
          <a href="#servicios" @click="closeMenu" class="mobile-nav-link">Servicios</a>
          <a href="#proceso" @click="closeMenu" class="mobile-nav-link">Proceso</a>
          <a href="#testimonios" @click="closeMenu" class="mobile-nav-link">Testimonios</a>
          <a href="#galeria" @click="closeMenu" class="mobile-nav-link">Galería</a>
          <a href="#contacto" @click="closeMenu" class="mobile-nav-link btn-primary">Solicitar Presupuesto</a>
          
          <!-- Enlaces según rol en móvil -->
          <a 
            v-if="authStore.isAdmin" 
            href="#" 
            @click="closeMenu"
            class="mobile-role-link admin"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c.94 1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Panel de Administración</span>
          </a>
          
          <a 
            v-else-if="authStore.isAuthenticated" 
            href="/dashboard" 
            @click="closeMenu"
            class="mobile-role-link user"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Mi Cuenta</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import GoogleLogin from './GoogleLogin.vue'

export default {
  name: 'AppHeader',
  components: {
    GoogleLogin
  },
  setup() {
    const isMenuOpen = ref(false)
    const authStore = useAuthStore()

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      authStore,
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

/* Enlaces según rol */
.role-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-link,
.user-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8D5524;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #fef3c7;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.admin-link:hover,
.user-link:hover {
  background: #fde68a;
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
    gap: 0.75rem;
  }
}
</style>
