import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    
    // Especificar la ubicación del index.html
    root: '.',
    publicDir: 'public',
    
    // Configuración del servidor de desarrollo
    server: {
      port: parseInt(env.VITE_APP_FRONTEND_PORT || '') || 9001,
    },
    
    // Configuración de compilación
    build: {
      outDir: 'dist',
      sourcemap: env.NODE_ENV !== 'production',
    },
    
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
