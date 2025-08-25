# Configuración de Variables de Entorno

## 📁 Archivos de Configuración

### 1. **env.production** (Producción)
```bash
# Variables de entorno para producción
VUE_APP_BACKEND_URL=https://artemodular-backend.onrender.com
VUE_APP_FRONTEND_URL=https://artemodular.vercel.app
NODE_ENV=production
```

### 2. **env.development** (Desarrollo)
```bash
# Variables de entorno para desarrollo local
VUE_APP_BACKEND_URL=http://localhost:3001
VUE_APP_FRONTEND_URL=http://localhost:9001
NODE_ENV=development
```

### 3. **src/config/config.js** (Configuración del Frontend)
```javascript
const config = {
  backendURL: process.env.VUE_APP_BACKEND_URL || 'https://artemodular-backend.onrender.com',
  frontendURL: process.env.VUE_APP_FRONTEND_URL || 'https://artemodular.vercel.app',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
}
```

## 🚀 Configuración en Vercel (Frontend)

### Opción 1: Dashboard de Vercel (Recomendado)

1. **Ve a tu proyecto en Vercel**
2. **Settings → Environment Variables**
3. **Agrega estas variables:**

| Variable | Valor | Entorno |
|----------|-------|---------|
| `VUE_APP_BACKEND_URL` | `https://artemodular-backend.onrender.com` | Production |
| `VUE_APP_FRONTEND_URL` | `https://artemodular.vercel.app` | Production |

### Opción 2: Archivo vercel.json (Alternativo)

```json
{
  "env": {
    "VUE_APP_BACKEND_URL": "https://artemodular-backend.onrender.com",
    "VUE_APP_FRONTEND_URL": "https://artemodular.vercel.app"
  }
}
```

## 🔧 Configuración en Render (Backend)

### Variables de Entorno Actuales (Correctas)

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `BUSINESS_EMAIL` | `jairsantiagomh@gmail.com` | Email de la empresa |
| `BUSINESS_NAME` | `ArteModular` | Nombre de la empresa |
| `EMAIL_PASS` | `ftrtcfeotyjtvcxi` | Contraseña del email |
| `EMAIL_USER` | `jairsantiagomh@gmail.com` | Usuario del email |
| `FRONTEND_URL` | `https://artemodular.vercel.app` | URL del frontend |
| `NODE_ENV` | `production` | Entorno de producción |
| `PORT` | `3000` | Puerto del servidor |

## 📋 Pasos de Configuración

### 1. **Configurar Vercel (Frontend)**

```bash
# En Vercel Dashboard:
# 1. Ve a tu proyecto
# 2. Settings → Environment Variables
# 3. Agrega:
VUE_APP_BACKEND_URL=https://artemodular-backend.onrender.com
VUE_APP_FRONTEND_URL=https://artemodular.vercel.app
```

### 2. **Configurar Desarrollo Local**

```bash
# Crea archivo .env.local (no se sube a git):
VUE_APP_BACKEND_URL=http://localhost:3001
VUE_APP_FRONTEND_URL=http://localhost:9001
NODE_ENV=development
```

### 3. **Verificar Configuración**

```javascript
// En la consola del navegador:
import config from './src/config/config.js'
config.debug()

// Debería mostrar:
// 🔧 Configuración del frontend: {
//   backendURL: "https://artemodular-backend.onrender.com",
//   frontendURL: "https://artemodular.vercel.app",
//   isDevelopment: false,
//   isProduction: true
// }
```

## 🔍 Verificación de Funcionamiento

### 1. **En el Navegador**
- Abre la consola del navegador
- Envía el formulario de contacto
- Verifica los logs de debug

### 2. **Logs Esperados**
```
🔧 Configuración del frontend: {...}
🚀 Backend URL configurada: https://artemodular-backend.onrender.com
📡 Respuesta del servidor: {...}
📨 Resultado del servidor: {...}
✅ Email enviado exitosamente: {...}
```

### 3. **Si Hay Errores**
```
❌ Error al enviar email: {...}
🔍 Detalles del error: {...}
```

## 🚨 Troubleshooting

### **Error: "Cannot read properties of undefined"**
- ✅ Verifica que las variables estén en Vercel Dashboard
- ✅ Reinicia el despliegue en Vercel
- ✅ Verifica que usen el prefijo `VUE_APP_`

### **Error: "Failed to fetch"**
- ✅ Verifica que el backend esté corriendo en Render
- ✅ Verifica la URL del backend en la configuración
- ✅ Revisa los logs del backend en Render

### **Variables No Se Cargan**
- ✅ Verifica que estén en el entorno correcto (Production)
- ✅ Reinicia el servidor de desarrollo
- ✅ Verifica el archivo `.env.local` para desarrollo

## 📝 Notas Importantes

1. **Vue CLI usa `VUE_APP_`** como prefijo (NO `VITE_`)
2. **El puerto 3000 en Render NO interfiere** con el frontend
3. **Las variables se cargan al momento del build** en Vercel
4. **Para cambios en variables**, necesitas hacer un nuevo despliegue
5. **El archivo `.env.local` NO se sube a git** (seguro para secrets)

## ✅ Checklist de Verificación

- [ ] Variables configuradas en Vercel Dashboard
- [ ] Backend corriendo en Render
- [ ] Frontend desplegado en Vercel
- [ ] Formulario de contacto funcionando
- [ ] Logs de debug visibles en consola
- [ ] Emails enviándose correctamente

## 🎯 Resumen

- **Frontend (Vercel)**: Configurar `VUE_APP_BACKEND_URL` y `VUE_APP_FRONTEND_URL`
- **Backend (Render)**: Ya está configurado correctamente
- **Desarrollo Local**: Usar archivo `.env.local` con URLs locales
- **Debug**: Sistema de logs mejorado para troubleshooting
