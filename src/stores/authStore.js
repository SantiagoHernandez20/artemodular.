import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient.js'

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

  // Logout con Supabase
  const logout = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      user.value = null
      error.value = null
      console.log('✅ Sesión cerrada exitosamente')
    } catch (error) {
      console.error('Error en logout:', error)
      setError('Error al cerrar sesión')
    } finally {
      loading.value = false
    }
  }

  // Login con Google usando Supabase
  const loginWithGoogle = async () => {
    try {
      loading.value = true
      clearError()
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
      
      // Supabase maneja la redirección automáticamente
      return { success: true, data }
    } catch (error) {
      console.error('Error en login:', error)
      
      let errorMessage = 'Error al iniciar sesión'
      
      // Manejar errores específicos de Supabase
      if (error.message?.includes('popup_closed')) {
        errorMessage = 'Inicio de sesión cancelado'
      } else if (error.message?.includes('popup_blocked')) {
        errorMessage = 'El popup fue bloqueado por el navegador. Por favor, permite popups para este sitio.'
      } else if (error.message?.includes('network')) {
        errorMessage = 'Error de conexión. Verifica tu internet e intenta de nuevo'
      }
      
      setError(errorMessage)
      return { success: false, user: null, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  // Inicializar autenticación con Supabase
  const initAuth = () => {
    loading.value = true
    
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error al obtener sesión:', error)
        setError('Error al verificar autenticación')
        return
      }
      
      if (session?.user) {
        setUser({
          uid: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email,
          photoURL: session.user.user_metadata?.avatar_url
        })
      } else {
        setUser(null)
      }
    })
    
    // Escuchar cambios de autenticación
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      if (session?.user) {
        setUser({
          uid: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.full_name || session.user.email,
          photoURL: session.user.user_metadata?.avatar_url
        })
      } else {
        setUser(null)
      }
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
