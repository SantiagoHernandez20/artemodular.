import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

// Migración desde vue.config.js
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],

    // Configuración del servidor de desarrollo
    server: {
      port: parseInt(env.VITE_APP_FRONTEND_PORT || '') || 9001,
    },

    // Configuración de compilación
    build: {
      sourcemap: env.NODE_ENV !== 'production',
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // En Vite, las variables se leen desde import.meta.env
    // Se elimina el mapeo heredado del entorno clásico
  }
})
