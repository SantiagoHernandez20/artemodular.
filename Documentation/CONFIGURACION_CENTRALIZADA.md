# 🎯 Configuración Centralizada de ArteModular

## 📋 Descripción

Sistema de configuración centralizado que maneja todas las variables de entorno y configuraciones desde un solo lugar, tanto para el frontend como para el backend.

## 🏗️ Estructura de Archivos

```
artemodular/
├── .env.local                    # Variables de entorno para desarrollo
├── src/
│   └── config/
│       └── index.js             # Configuración centralizada del frontend
├── backend/
│   ├── config/
│   │   └── index.js             # Configuración centralizada del backend
│   └── server.js                # Servidor usando configuración centralizada
└── vue.config.js                 # Configuración de Vue CLI
```

## 🔧 Archivos de Configuración

### **1. Frontend (`src/config/index.js`)**
```javascript
import config from '../config/index.js'

// Usar configuración
const backendURL = config.utils.getBackendUrl(config.backend.endpoints.contact)
const isDev = config.environment.isDevelopment
```

### **2. Backend (`backend/config/index.js`)**
```javascript
const config = require('./config/index.js')

// Usar configuración
const port = config.server.port
const corsOrigins = config.server.cors.origins
```

## 🌐 Variables de Entorno

### **Desarrollo Local (`.env.local`)**
```bash
# Backend
VUE_APP_BACKEND_URL=http://localhost:3001

# Frontend
VUE_APP_FRONTEND_URL=http://localhost:9001
VUE_APP_FRONTEND_PORT=9001

# Entorno
NODE_ENV=development
```

### **Producción (Vercel Dashboard)**
```bash
# Backend
VUE_APP_BACKEND_URL=https://artemodular-backend.onrender.com

# Frontend
VUE_APP_FRONTEND_URL=https://artemodular.vercel.app
```

## 🚀 Uso en Componentes

### **ContactSection.vue**
```javascript
import config from '../config/index.js'

// Debug
config.utils.debug()

// Backend URL
const backendURL = config.utils.getBackendUrl(config.backend.endpoints.contact)

// Timeout
const timeout = config.backend.request.timeout

// Headers
const headers = config.backend.request.headers
```

### **Backend (server.js)**
```javascript
const config = require('./config/index.js')

// Puerto
const PORT = config.server.port

// CORS
app.use(cors(config.server.cors))

// Rate limiting
const emailLimiter = rateLimit(config.security.rateLimit)
```

## 🔍 Funciones de Utilidad

### **Frontend**
- `config.utils.debug()` - Mostrar configuración completa
- `config.utils.validate()` - Validar configuración
- `config.utils.getBackendUrl(endpoint)` - URL completa del backend
- `config.utils.getFrontendUrl(path)` - URL completa del frontend

### **Backend**
- `config.utils.debug()` - Mostrar configuración del backend
- `config.utils.validate()` - Validar configuración del backend
- `config.utils.getServerUrl(endpoint)` - URL completa del servidor

## 📊 Configuraciones Disponibles

### **Backend**
- URLs y endpoints
- Configuración de requests
- Timeouts y headers
- Configuración de CORS
- Rate limiting
- Validaciones

### **Frontend**
- URLs del backend y frontend
- Configuración del servidor de desarrollo
- Entorno (desarrollo/producción)
- Configuración de email
- Estilos y colores
- Redes sociales

### **Seguridad**
- Rate limiting
- CORS origins
- Headers de seguridad
- Validaciones de entrada

## 🔄 Flujo de Configuración

### **1. Carga de Variables**
```
.env.local → Vue CLI → process.env.VUE_APP_* → config/index.js
```

### **2. Uso en Componentes**
```
config/index.js → Componentes Vue → fetch() → Backend
```

### **3. Backend**
```
Variables de entorno → config/index.js → server.js → Express
```

## ✅ Ventajas de la Configuración Centralizada

1. **Un solo lugar** para todas las configuraciones
2. **Fácil mantenimiento** y actualización
3. **Consistencia** entre frontend y backend
4. **Debug automático** en desarrollo
5. **Validación automática** de configuración
6. **Fallbacks inteligentes** para entornos
7. **Tipado implícito** de configuraciones
8. **Reutilización** de configuraciones comunes

## 🚨 Troubleshooting

### **Variables no se cargan**
- Verificar que `.env.local` esté en la raíz del proyecto
- Reiniciar el servidor de desarrollo
- Verificar prefijo `VUE_APP_`

### **Configuración no se aplica**
- Verificar que se importe desde `../config/index.js`
- Verificar que se use `config.utils.getBackendUrl()`
- Verificar logs de debug en consola

### **Backend no responde**
- Verificar que esté corriendo en puerto 3001
- Verificar configuración CORS
- Verificar variables de entorno del backend

## 📝 Ejemplos de Uso

### **Configuración de Email**
```javascript
// En cualquier componente
const businessEmail = config.email.business.email
const businessPhone = config.email.contact.phone
```

### **Configuración de Estilos**
```javascript
// En CSS o estilos inline
const primaryColor = config.styles.colors.primary
const accentColor = config.styles.colors.accent
```

### **Configuración de Seguridad**
```javascript
// En el backend
const maxRequests = config.security.rateLimit.max
const windowMs = config.security.rateLimit.windowMs
```

## 🎯 Resumen

- ✅ **Configuración centralizada** en `src/config/index.js`
- ✅ **Variables de entorno** desde `.env.local`
- ✅ **Debug automático** en desarrollo
- ✅ **Validación automática** de configuración
- ✅ **Fallbacks inteligentes** para entornos
- ✅ **Reutilización** de configuraciones
- ✅ **Consistencia** entre frontend y backend

Ahora toda tu aplicación usa la configuración desde un solo lugar, facilitando el mantenimiento y debugging.
