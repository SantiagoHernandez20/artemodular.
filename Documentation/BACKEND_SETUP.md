# 🚀 Setup Rápido del Backend - ArteModular

## ⚡ Inicio Rápido (5 minutos)

### 1. Configurar Backend
```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env
```

### 2. Configurar Gmail (Más Fácil)

#### 📧 Paso 1: Habilitar App Password
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Verificación en 2 pasos → **Habilitar**
3. Seguridad → Contraseñas de aplicaciones
4. Generar contraseña para "Correo" → **Copiar los 16 caracteres**

#### ⚙️ Paso 2: Configurar .env
```env
PORT=3001
NODE_ENV=development

# Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=ftrt_cfeo_tyjt_vcxi  # ← App Password de 16 caracteres

# Negocio
BUSINESS_EMAIL=info@artemodular.com
BUSINESS_NAME=ArteModular

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 3. Iniciar Backend
```bash
npm run dev
```

Deberías ver:
```
🏡 ArteModular Backend iniciado exitosamente!
🌐 Servidor: http://localhost:3001
```

### 4. Probar Configuración
```bash
# En otra terminal
curl http://localhost:3001/api/test-email
```

Si ves `"status": "success"` ¡funciona!

### 5. Configurar Frontend
En el directorio principal del proyecto, crea/edita `.env`:

```env
# Backend URL
VITE_BACKEND_URL=http://localhost:3001
```

### 6. ¡Probar el Formulario!
1. Abre tu frontend: `http://localhost:5173`
2. Ve a la sección de contacto
3. Llena el formulario
4. ¡Deberías recibir 2 emails!

---

## 🎯 Alternativas Rápidas

### Opción 1: Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tu_email@outlook.com
EMAIL_PASS=tu_contraseña_normal
```

### Opción 2: Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tu_email@yahoo.com
EMAIL_PASS=tu_contraseña_normal
```

### Opción 3: Mailtrap (Para Testing)
```env
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=tu_mailtrap_user
EMAIL_PASS=tu_mailtrap_pass
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start

# Probar email
curl http://localhost:3001/api/test-email

# Enviar email de prueba
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@email.com", 
    "phone": "3131234567",
    "projectType": "cocina",
    "message": "Mensaje de prueba"
  }'
```

---

## 🛡️ Características del Backend

### ✅ Lo que hace automáticamente:
- **2 emails**: Uno al negocio + confirmación al cliente
- **HTML bonito**: Emails profesionales con el branding de ArteModular
- **Anti-spam**: Máximo 5 emails por IP cada 15 minutos
- **Validación**: Todos los campos validados automáticamente
- **Seguridad**: CORS, Helmet, sanitización
- **Logs**: Tracking completo en consola

### 📧 Emails que se envían:

#### 1. **Al Negocio** (`info@artemodular.com`):
```
🏡 Nueva Solicitud: Cocina Integral - Juan Pérez

👤 Nombre: Juan Pérez
📧 Email: juan@email.com  
📱 Teléfono: 313 123 4567
🔨 Proyecto: Cocina Integral
💬 Mensaje: "Quiero una cocina moderna..."
⏰ Fecha: 15 de Diciembre, 2024 - 2:30 PM

Recuerda: Contactar en menos de 24 horas
```

#### 2. **Al Cliente**:
```
¡Hola Juan! 👋

Gracias por contactarnos para tu proyecto de Cocina Integral.

Te contactaremos en menos de 24 horas para:
📋 Revisar detalles
📅 Programar visita gratuita  
📐 Tomar medidas
💰 Preparar presupuesto

¿Preguntas urgentes?
📞 313 358-9795
```

---

## 🚀 Despliegue a Producción

### Railway (Recomendado - Gratis)
1. Ve a [railway.app](https://railway.app)
2. Conecta tu GitHub
3. Deploy el directorio `/backend`
4. Configura variables de entorno
5. ¡Listo!

### Heroku
```bash
heroku create artemodular-backend
heroku config:set EMAIL_USER=tu_email@gmail.com
heroku config:set EMAIL_PASS=tu_app_password
heroku git:remote -a artemodular-backend
git subtree push --prefix backend heroku main
```

### VPS
```bash
# En tu servidor
git clone tu-repo
cd backend
npm install --production
npm install -g pm2
pm2 start server.js --name artemodular-backend
```

---

## 🆘 Troubleshooting

### ❌ "Invalid login"
- ✅ Verifica que usas App Password (no contraseña normal)
- ✅ Revisa EMAIL_USER y EMAIL_PASS

### ❌ "Connection refused"
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa VITE_BACKEND_URL en frontend

### ❌ "CORS error"  
- ✅ Verifica FRONTEND_URL en .env del backend
- ✅ Debe coincidir con tu URL de frontend

### ❌ "Rate limit exceeded"
- ✅ Espera 15 minutos
- ✅ Es normal - protege contra spam

---

## 📊 Monitoreo

El backend logea todo automáticamente:
```
📧 Nueva solicitud de contacto de: Juan Pérez (cocina)
📤 Enviando email al negocio...
📤 Enviando confirmación al cliente...
✅ Emails enviados exitosamente
📧 Business Email ID: abc123@smtp.gmail.com
📧 Client Email ID: def456@smtp.gmail.com
```

---

## 💡 Tips Profesionales

1. **Gmail**: Usa una cuenta específica para el negocio
2. **Dominio propio**: Para mayor profesionalismo
3. **Backup**: Ten un método alternativo (WhatsApp, teléfono)
4. **Monitoreo**: Revisa logs regularmente
5. **Testing**: Prueba con diferentes dispositivos

**¿Necesitas ayuda? El backend incluye debugging completo y logs detallados!** 🔍
