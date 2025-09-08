import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/config/firebase.js'
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  // Getters simples
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.email === 'jairsantiagomh@gmail.com')
  const userRole = computed(() => isAdmin.value ? 'admin' : 'user')

  // Acciones
  const setUser = (userData) => {
    user.value = userData
    loading.value = false
    error.value = null
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
    loading.value = false
  }

  const clearError = () => {
    error.value = null
  }

  const logout = async () => {
    try {
      loading.value = true
      await signOut(auth)
      user.value = null
      error.value = null
      // El router se encargará de la navegación
    } catch (error) {
      console.error('Error en logout:', error)
      setError('Error al cerrar sesión')
    } finally {
      loading.value = false
    }
  }

  // Login con popup sin redirección automática
  const loginWithGoogle = async () => {
    try {
      loading.value = true
      clearError()
      
      const { provider } = await import('@/config/firebase')
      const result = await signInWithPopup(auth, provider)
      
      if (result.user) {
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        })
        
        // No redirigir automáticamente, dejar que el usuario decida
        return { success: true, user: result.user }
      }
      return { success: false, user: null }
    } catch (error) {
      console.error('Error en login:', error)
      
      let errorMessage = 'Error al iniciar sesión'
      
      // Manejar errores específicos del popup
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Inicio de sesión cancelado'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'El popup fue bloqueado por el navegador. Por favor, permite popups para este sitio.'
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Solicitud de popup cancelada'
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Ya existe una cuenta con este email usando otro método de autenticación'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Error de conexión. Verifica tu internet e intenta de nuevo'
      }
      
      setError(errorMessage)
      return { success: false, user: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Listener de autenticación
  const initAuth = () => {
    loading.value = true
    
    // Configurar listener para cambios futuros
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL
        })
      } else {
        setUser(null)
      }
    }, (error) => {
      console.error('Error en auth state change:', error)
      setError('Error al verificar autenticación')
    })
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    userRole,
    logout,
    loginWithGoogle,
    initAuth,
    setError,
    clearError
  }
})
