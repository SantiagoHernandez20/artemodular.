<template>
  <div class="google-login">
    <!-- Usuario logueado -->
    <div v-if="authStore.isAuthenticated" class="user-info">
      <img :src="authStore.user.photoURL" :alt="authStore.user.displayName" class="user-avatar" />
      <div class="user-details">
        <span class="user-name">{{ authStore.user.displayName }}</span>
        <span v-if="authStore.isAdmin" class="admin-badge">Admin</span>
      </div>
      <button @click="handleLogout" class="logout-btn" :disabled="authStore.loading">
        <span v-if="authStore.loading">Cerrando...</span>
        <span v-else>Cerrar</span>
      </button>
    </div>
    
    <!-- Botón de login -->
    <button v-else @click="handleLogin" class="login-btn" :disabled="authStore.loading">
      <img v-if="!authStore.loading" src="/google-icon.svg" alt="Google" class="google-icon" />
      <div v-else class="loading-spinner"></div>
      <span class="login-text">
        {{ authStore.loading ? 'Iniciando...' : 'Iniciar sesión' }}
      </span>
    </button>

    <!-- Mostrar errores -->
    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
      <button @click="authStore.clearError" class="error-close">×</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'GoogleLogin',
  setup() {
    const authStore = useAuthStore()

    const handleLogin = async () => {
      try {
        const result = await authStore.loginWithGoogle()
        if (result.success) {
          console.log('Login exitoso:', result.user.displayName)
        }
      } catch (error) {
        console.error('Error en login:', error)
      }
    }

    const handleLogout = () => {
      authStore.logout()
    }

    return {
      authStore,
      handleLogin,
      handleLogout
    }
  }
}
</script>

<style scoped>
.google-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

/* Botón de login */
.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
  min-width: 120px;
  justify-content: center;
}

.login-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #d1d5db;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.login-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Icono de Google */
.google-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Spinner de carga */
.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #8D5524;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Texto del botón */
.login-text {
  white-space: nowrap;
}

/* Usuario logueado */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  flex-wrap: wrap;
  max-width: 300px;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8D5524;
  background: #fef3c7;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  text-align: center;
  white-space: nowrap;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 60px;
}

.logout-btn:hover:not(:disabled) {
  background: #dc2626;
}

.logout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Mensaje de error */
.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 300px;
  word-wrap: break-word;
}

.error-close {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0;
  margin-left: auto;
  flex-shrink: 0;
}

.error-close:hover {
  color: #b91c1c;
}

/* Responsive */
@media (max-width: 768px) {
  .login-btn {
    padding: 0.5rem;
    min-width: auto;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    justify-content: center;
  }
  
  .login-text {
    display: none; /* Solo mostrar el icono en móvil */
  }
  
  .user-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    padding: 0.75rem;
    max-width: 250px;
  }
  
  .user-details {
    align-items: center;
  }
  
  .user-name {
    font-size: 0.8rem;
  }
  
  .admin-badge {
    font-size: 0.7rem;
  }
  
  .logout-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .error-message {
    font-size: 0.7rem;
    padding: 0.375rem 0.5rem;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .login-btn {
    width: 2.25rem;
    height: 2.25rem;
  }
  
  .user-info {
    padding: 0.5rem;
    max-width: 200px;
  }
  
  .user-avatar {
    width: 1.75rem;
    height: 1.75rem;
  }
  
  .user-name {
    font-size: 0.75rem;
  }
  
  .admin-badge {
    font-size: 0.65rem;
    padding: 0.1rem 0.25rem;
  }

  .error-message {
    max-width: 200px;
    font-size: 0.65rem;
  }
}
</style>
