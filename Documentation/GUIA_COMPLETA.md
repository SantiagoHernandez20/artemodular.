# 🚀 Guía Completa de ArteModular - Setup y Configuración

## 📋 **Resumen Ejecutivo**
Guía consolidada para configurar ArteModular con Firebase, backend de emails y configuración centralizada.

---

## 🔥 **1. MIGRACIÓN A FIREBASE (Testimonios)**

### Setup Rápido
1. **Crear proyecto** en [Firebase Console](https://console.firebase.google.com/)
2. **Habilitar Realtime Database** en modo prueba
3. **Instalar dependencia**: `npm install firebase`
4. **Configurar** `src/config/firebase.js` con tu configuración
5. **Migrar datos**: `node scripts/migrate-to-firebase.js`

### Beneficios
- ✅ Datos persisten en producción
- ✅ Sincronización en tiempo real
- ✅ Escalable y gratuito (1GB datos, 10GB transferencia)

---

## 📧 **2. BACKEND DE EMAILS**

### Setup en 5 minutos
```bash
cd backend
npm install
cp .env.example .env
```

### Configurar Gmail (Recomendado)
1. **Habilitar verificación en 2 pasos** en Google
2. **Generar App Password** (16 caracteres)
3. **Configurar .env**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_16_caracteres
BUSINESS_EMAIL=info@artemodular.com
FRONTEND_URL=http://localhost:9001
NODE_ENV=production
```

### Iniciar
```bash
npm run dev
# Puerto 3001
```

### Funcionalidades
- ✅ **2 emails automáticos**: Negocio + Cliente
- ✅ **Anti-spam**: Máximo 5 emails por IP cada 15 min
- ✅ **HTML profesional** con branding
- ✅ **Validación automática** de campos

---

## ⚙️ **3. CONFIGURACIÓN CENTRALIZADA**

### Estructura
```
artemodular/
├── .env.local                    # Variables desarrollo
├── src/config/index.js           # Config frontend
└── backend/config/index.js       # Config backend
```

### Variables Principales
```env
# Desarrollo
VUE_APP_BACKEND_URL=http://localhost:3001
VUE_APP_FRONTEND_URL=http://localhost:9001

# Producción
VUE_APP_BACKEND_URL=https://artemodular-backend.onrender.com
VUE_APP_FRONTEND_URL=artemodular.site
```

### Uso en Código
```javascript
import config from '../config/index.js'

// Backend URL
const backendURL = config.utils.getBackendUrl(config.backend.endpoints.contact)

// Debug
config.utils.debug()
```

---

## 🌐 **4. VARIABLES DE ENTORNO**

### Vercel (Frontend)
**Dashboard → Settings → Environment Variables**
- `VUE_APP_BACKEND_URL`: `https://artemodular-backend.onrender.com`
- `VUE_APP_FRONTEND_URL`: `artemodular.site`

### Render (Backend)
**Ya configurado correctamente** con:
- `BUSINESS_EMAIL`: `jairsantiagomh@gmail.com`
- `FRONTEND_URL`: `artemodular.site`
- `EMAIL_PASS`: App password de Gmail

### Desarrollo Local
Crear `.env.local` (no se sube a git):
```env
VUE_APP_BACKEND_URL=http://localhost:3001
VUE_APP_FRONTEND_URL=http://localhost:9001
NODE_ENV=development
```

---


---

## 🔍 **VERIFICACIÓN**

### 1. Backend Funcionando
```bash
curl http://localhost:3001/api/test-email
# Debe responder: {"status": "success"}
```

### 2. Frontend Conectado
- Consola del navegador debe mostrar configuración
- Formulario de contacto debe enviar emails
- Logs de debug visibles

### 3. Firebase Testimonios
- Crear testimonio desde la app
- Verificar que aparezca en Firebase Console
- Aprobar desde panel admin

---

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### Error: "Invalid login"
- ✅ Usar App Password (no contraseña normal)
- ✅ Verificar EMAIL_USER y EMAIL_PASS

### Error: "CORS error"
- ✅ Verificar FRONTEND_URL en backend
- ✅ Debe coincidir con tu URL de frontend

### Error: "Firebase permission denied"
- ✅ Verificar reglas de seguridad
- ✅ Asegurar `is_approved: false` para nuevos testimonios

### Variables no se cargan
- ✅ Verificar prefijo `VUE_APP_`
- ✅ Reiniciar servidor de desarrollo
- ✅ Verificar archivo `.env.local`

---

## 📊 **MONITOREO**

### Backend
- Logs automáticos en consola
- Tracking de emails enviados
- Estadísticas de rate limiting

### Firebase
- Panel de administración para testimonios
- Consola de Firebase para uso y estadísticas
- Alertas si superas límites gratuitos

---

## ✅ **CHECKLIST FINAL**

- [ ] Firebase configurado y testimonios migrados
- [ ] Backend corriendo en puerto 3001 con emails funcionando
- [ ] Frontend conectado al backend correcto
- [ ] Variables de entorno configuradas en Vercel
- [ ] Formulario de contacto enviando emails
- [ ] Testimonios guardándose en Firebase
- [ ] Panel admin funcionando para aprobar testimonios

---

## 🎯 **RESUMEN DE ARCHIVOS**

- **FIREBASE-MIGRATION.md** → Migración de testimonios a Firebase
-
---

## 📞 **SOPORTE**

1. **Revisar consola del navegador** para logs de debug
2. **Verificar Firebase Console** para testimonios
3. **Revisar logs del backend** para emails
4. **Consultar documentación** de Firebase y servicios de hosting

**¡ArteModular configurado y funcionando! 🎉**
