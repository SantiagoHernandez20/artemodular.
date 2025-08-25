const { defineConfig } = require('@vue/cli-service')

// Configuración de Vue CLI usando variables de entorno
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_FRONTEND_PORT || 9001
  },
  
  // Configuración de variables de entorno
  chainWebpack: config => {
    // Hacer las variables de entorno disponibles globalmente
    config.plugin('define').tap(args => {
      args[0]['process.env'] = {
        ...args[0]['process.env'],
        VUE_APP_BACKEND_URL: JSON.stringify(process.env.VUE_APP_BACKEND_URL),
        VUE_APP_FRONTEND_URL: JSON.stringify(process.env.VUE_APP_FRONTEND_URL),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
      return args
    })
  }
})
