# 🔐 Sistema de Autenticación por IP

Este sistema permite controlar el acceso al panel de administración (`/admin`) basándose en la dirección IP del cliente, eliminando la necesidad de autenticación con Google OAuth.

## 📋 Resumen de Cambios

### Archivos Modificados
1. **`backend/middleware/ipconfig.js`** - Nuevo middleware de verificación de IP
2. **`backend/routes/TestimonialRoutes.js`** - Rutas protegidas con middleware IP
3. **`backend/server.js`** - Endpoint para verificar tu IP actual
4. **`src/views/AdminPanel.vue`** - Removida dependencia de Supabase
5. **`src/router/index.js`** - Removida restricción de autenticación de Google

## 🚀 Configuración Inicial

### 1. Obtener tu IP Actual

Para acceder al panel de administración, necesitas agregar tu IP a la lista de IPs permitidas.

#### Opción A: Usando el endpoint del servidor

Cuando el servidor esté corriendo, visita:
```
http://localhost:3001/api/auth/my-ip
```

O desde la terminal:
```bash
curl http://localhost:3001/api/auth/my-ip
```

Este endpoint te mostrará tu IP actual y toda la información necesaria para configurar el sistema.

#### Opción B: Usando servicios online

```bash
# Ver tu IP pública
curl ifconfig.me

# O
curl icanhazip.com
```

### 2. Configurar IPs Permitidas

Edita el archivo `backend/middleware/ipconfig.js` y agrega tu IP a la lista `ALLOWED_IPS`:

```javascript
const ALLOWED_IPS = [
  '127.0.0.1',           // localhost
  '::1',                 // localhost IPv6
  '::ffff:127.0.0.1',    // localhost IPv4 en formato IPv6
  'TU_IP_LOCAL',         // Tu IP local (ejemplo: '192.168.1.100')
  'TU_IP_PUBLICA',       // Tu IP pública si accedes remotamente
];
```

**Importante**: 
- Si trabajas en desarrollo local, `127.0.0.1` debería funcionar
- Si accedes desde otra máquina en la misma red, usa tu IP local (ej: `192.168.1.100`)
- Para acceso remoto, agrega tu IP pública

## 🔧 Cómo Funciona

### Middleware de IP (`ipconfig.js`)

El middleware `verifyIP` verifica si la IP del cliente está en la lista de IPs permitidas. Si no lo está, retorna un error 403 (Forbidden).

**Características:**
- Soporta IPv4 e IPv6
- Maneja proxies y load balancers
- Detecta IPs de x-forwarded-for y x-real-ip headers
- Incluye normalización de IPs

### Rutas Protegidas

Las siguientes rutas ahora requieren IP autorizada:

- `GET /api/testimonials/stream` - Streaming SSE de testimonios
- `PUT /api/testimonials/:id/approve` - Aprobar testimonio
- `PUT /api/testimonials/:id/reject` - Rechazar testimonio
- `DELETE /api/testimonials/:id` - Eliminar testimonio

Las rutas públicas (sin protección):
- `GET /api/testimonials` - Ver testimonios aprobados
- `POST /api/testimonials` - Crear testimonio

## 📡 Sistema de Streaming (SSE)

El panel de administración utiliza Server-Sent Events (SSE) para recibir actualizaciones en tiempo real de los testimonios.

**Endpoint**: `GET /api/testimonials/stream`

**Características:**
- Solo accesible desde IPs autorizadas
- Envía actualizaciones cada 5 segundos
- Auto-reconexión si se pierde la conexión
- Envía todos los testimonios en cada actualización

## 🛡️ Seguridad

### Ventajas del Sistema por IP

✅ **Simple**: No requiere configuración compleja de OAuth
✅ **Directo**: Control total sobre quién puede acceder
✅ **Rápido**: No hay overhead de autenticación de terceros
✅ **Perfecto para desarrollo**: Ideal para un panel de administración personal

### Limitaciones

⚠️ **IPs Dinámicas**: Si tu IP cambia, necesitarás actualizar la lista
⚠️ **Proxies**: Puede haber problemas si estás detrás de un proxy
⚠️ **Compartir IP**: Varios usuarios desde la misma IP tendrán acceso

### Recomendaciones

1. **Solo agregar tu IP**: No compartas la lista de IPs permitidas
2. **Monitoreo**: Revisa los logs del servidor para ver intentos de acceso
3. **Firewall**: Considera usar un firewall adicional para mayor seguridad
4. **VPN**: Si necesitas acceso remoto, considera usar una VPN con IP fija

## 🐛 Solución de Problemas

### "Acceso denegado: IP no autorizada"

**Problema**: Ves este error al intentar acceder al panel.

**Solución**:
1. Visita `http://localhost:3001/api/auth/my-ip` para ver tu IP actual
2. Copia exactamente la IP que aparece
3. Agrega esa IP a `ALLOWED_IPS` en `ipconfig.js`
4. Reinicia el servidor

### El panel no se actualiza automáticamente

**Problema**: Los testimonios no se actualizan en tiempo real.

**Solución**:
1. Verifica que la conexión SSE esté activa (abre las DevTools y revisa la pestaña Network)
2. Asegúrate de que la IP esté correctamente configurada
3. Revisa los logs del servidor para ver si hay errores

### En producción (Render.com, Heroku, etc.)

**Nota Importante**: En servicios de hosting como Render o Heroku, tu IP puede ser difícil de rastrear debido a proxies y load balancers.

**Solución temporal**: Puedes comentar el middleware `verifyIP` temporalmente para desarrollo, pero esto reduce la seguridad.

**Solución recomendada**: Usa un VPN o servicio con IP fija.

## 📝 Endpoints Útiles

### Ver tu IP actual
```
GET /api/auth/my-ip
```

### Acceder al panel de admin
```
http://localhost:9001/admin
```

### Ver testimonios (público)
```
GET /api/testimonials
```

## 🔄 Revertir a Google OAuth

Si necesitas volver al sistema anterior con Google OAuth:

1. Restaura los archivos del git
2. Revierte los cambios en:
   - `backend/routes/TestimonialRoutes.js` - Remover `verifyIP`
   - `src/views/AdminPanel.vue` - Restaurar imports de authStore
   - `src/router/index.js` - Restaurar `requiresAuth: true`

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor: `console.log` en las líneas que dicen `✅ Acceso permitido` o `🚫 Acceso denegado`
2. Verifica tu IP con el endpoint `/api/auth/my-ip`
3. Asegúrate de que el servidor esté corriendo en el puerto correcto

