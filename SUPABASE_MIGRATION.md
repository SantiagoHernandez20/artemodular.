# 🚀 Migración de Firebase a Supabase - ArteModular

## 📋 Resumen

Esta guía te ayudará a migrar completamente tu proyecto ArteModular de Firebase a Supabase, incluyendo autenticación con Google, base de datos PostgreSQL y todas las funcionalidades existentes.

## 🎯 Beneficios de Supabase

- ✅ **PostgreSQL** - Base de datos relacional robusta
- ✅ **Autenticación integrada** - OAuth con Google, GitHub, etc.
- ✅ **Row Level Security** - Seguridad a nivel de fila
- ✅ **APIs automáticas** - REST y GraphQL generadas automáticamente
- ✅ **Tiempo real** - Suscripciones en tiempo real
- ✅ **Storage** - Almacenamiento de archivos
- ✅ **Edge Functions** - Funciones serverless

## 🔧 PASO 1: Configurar Supabase

### 1.1 Crear Proyecto
1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Haz clic en "New Project"
3. Completa la información del proyecto
4. Espera a que se complete la configuración

### 1.2 Obtener Credenciales
1. Ve a **Settings > API**
2. Copia los siguientes valores:
   - `Project URL`
   - `anon public` key
   - `service_role` key (manténla segura)

### 1.3 Configurar Variables de Entorno
1. Copia `env.example` a `.env.local`
2. Actualiza las variables con tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
```

## 🔐 PASO 2: Configurar Autenticación con Google

### 2.1 Configurar Google OAuth
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API**
4. Ve a **Credentials > Create Credentials > OAuth 2.0 Client IDs**

### 2.2 Configurar URIs Autorizados
- **Authorized JavaScript origins:**
  - `http://localhost:5173` (desarrollo)
  - `https://tu-dominio.com` (producción)

- **Authorized redirect URIs:**
  - `https://tu-proyecto.supabase.co/auth/v1/callback`

### 2.3 Configurar en Supabase
1. Ve a **Authentication > Providers > Google**
2. Habilita Google Provider
3. Ingresa tu `Client ID` y `Client Secret`
4. Guarda la configuración

## 🗄️ PASO 3: Configurar Base de Datos

### 3.1 Ejecutar Script SQL
1. Ve a **SQL Editor** en Supabase Dashboard
2. Copia y pega el contenido de `scripts/supabase-setup.sql`
3. Ejecuta el script completo

### 3.2 Verificar Tablas
Después de ejecutar el script, deberías tener estas tablas:
- `instruments` - Catálogo de instrumentos
- `testimonials` - Testimonios de clientes
- `contacts` - Mensajes de contacto
- `user_profiles` - Perfiles de usuarios

## 🔄 PASO 4: Migrar Datos

### 4.1 Instalar Dependencias
```bash
# En el directorio raíz
npm install @supabase/supabase-js

# En el backend
cd backend
npm install @supabase/supabase-js
```

### 4.2 Ejecutar Migración
```bash
# Asegúrate de tener las variables de Firebase en .env.local
node scripts/migrate-to-supabase.js
```

### 4.3 Verificar Migración
1. Ve a **Table Editor** en Supabase Dashboard
2. Verifica que los datos se migraron correctamente
3. Revisa las tablas `testimonials` e `instruments`

## 🔧 PASO 5: Actualizar Backend

### 5.1 Actualizar Middleware
El archivo `backend/middleware/supabase-auth.js` ya está configurado. Solo necesitas:

1. Actualizar las rutas que usan el middleware de Firebase
2. Cambiar las importaciones:

```javascript
// ANTES (Firebase)
const { authenticateUser } = require('./middleware/auth');

// DESPUÉS (Supabase)
const { authenticateUser } = require('./middleware/supabase-auth');
```

### 5.2 Actualizar Variables de Entorno del Backend
Agrega estas variables a tu `.env` del backend:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
```

## 🎨 PASO 6: Actualizar Frontend

### 6.1 Verificar Configuración
Los siguientes archivos ya están actualizados:
- ✅ `src/stores/authStore.js` - Migrado a Supabase
- ✅ `src/lib/supabaseClient.js` - Cliente configurado
- ✅ `src/views/AuthCallback.vue` - Página de callback creada
- ✅ `src/router/index.js` - Ruta de callback agregada

### 6.2 Probar Autenticación
1. Inicia el servidor de desarrollo: `npm run dev`
2. Haz clic en "Iniciar sesión con Google"
3. Completa el flujo de OAuth
4. Verifica que se crea tu perfil en `user_profiles`

## 🧪 PASO 7: Pruebas y Verificación

### 7.1 Pruebas de Autenticación
- [ ] Login con Google funciona
- [ ] Logout funciona correctamente
- [ ] Estado de autenticación se mantiene
- [ ] Redirección después del login funciona

### 7.2 Pruebas de Base de Datos
- [ ] Los instrumentos se cargan desde Supabase
- [ ] Los testimonios se muestran correctamente
- [ ] Las políticas RLS funcionan (solo admins ven todo)

### 7.3 Pruebas de Backend
- [ ] Middleware de autenticación funciona
- [ ] APIs protegidas requieren autenticación
- [ ] Datos de usuario se extraen correctamente

## 🧹 PASO 8: Limpieza Final

### 8.1 Remover Dependencias de Firebase
```bash
# Remover paquetes de Firebase
npm uninstall firebase firebase-admin

# En el backend
cd backend
npm uninstall firebase-admin
```

### 8.2 Limpiar Archivos
Puedes eliminar estos archivos cuando estés seguro de que todo funciona:
- `src/config/firebase.js`
- `backend/config/firebase-admin.js`
- `backend/middleware/auth.js` (el de Firebase)

### 8.3 Actualizar Variables de Entorno
Remueve las variables de Firebase de `.env.local`:
```env
# Remover estas líneas
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTHDOMAIN=...
# etc...
```

## 🚨 Solución de Problemas

### Error: "Invalid JWT"
- Verifica que `SUPABASE_SERVICE_ROLE_KEY` sea correcta
- Asegúrate de usar la clave de servicio, no la pública

### Error: "OAuth redirect mismatch"
- Verifica que el redirect URI en Google Console coincida exactamente
- Debe ser: `https://tu-proyecto.supabase.co/auth/v1/callback`

### Error: "Row Level Security"
- Verifica que las políticas RLS estén configuradas correctamente
- Asegúrate de que el usuario tenga el rol correcto en `user_profiles`

### Error: "Database connection"
- Verifica que `VITE_SUPABASE_URL` sea correcta
- Asegúrate de que el proyecto esté activo en Supabase

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Autenticación](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [APIs Automáticas](https://supabase.com/docs/guides/api)

## 🎉 ¡Migración Completada!

Una vez que hayas completado todos los pasos y verificado que todo funciona correctamente, habrás migrado exitosamente de Firebase a Supabase. Tu aplicación ahora tiene:

- ✅ Autenticación robusta con Google OAuth
- ✅ Base de datos PostgreSQL escalable
- ✅ APIs automáticas y seguras
- ✅ Políticas de seguridad granulares
- ✅ Tiempo real y suscripciones

¡Disfruta de las nuevas capacidades de Supabase! 🚀
