<template>
  <div class="auth-callback">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Procesando autenticación...</p>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'

export default {
  name: 'AuthCallback',
  setup() {
    const router = useRouter()

    onMounted(async () => {
      try {
        // Manejar el callback de OAuth
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error en callback:', error)
          router.push('/login?error=auth_failed')
          return
        }

        if (data.session) {
          console.log('✅ Usuario autenticado:', data.session.user.email)
          // Redirigir al dashboard o página principal
          router.push('/')
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error inesperado en callback:', error)
        router.push('/login?error=unexpected')
      }
    })

    return {}
  }
}
</script>

<style scoped>
.auth-callback {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.loading-container {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8D5524;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

p {
  color: #666;
  font-size: 1.1rem;
}
</style>
