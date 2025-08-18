# 🏡 ArteModular Backend

Backend Express.js para el manejo de emails de contacto de ArteModular.

## 🚀 Características

- ✅ **Express.js** - Servidor web robusto
- ✅ **Nodemailer** - Envío de emails profesional
- ✅ **Rate Limiting** - Protección anti-spam
- ✅ **Validación** - Datos seguros y validados
- ✅ **CORS** - Conexión segura con frontend
- ✅ **Helmet** - Seguridad HTTP
- ✅ **Email doble** - Al negocio + confirmación al cliente

## 📦 Instalación

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` con:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Email (Gmail - Recomendado)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_aqui

# Negocio
BUSINESS_EMAIL=info@artemodular.com
BUSINESS_NAME=ArteModular

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Gmail (Recomendado)

#### Paso 1: Habilitar autenticación de 2 factores
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Actívala

#### Paso 2: Generar App Password
1. Seguridad → Contraseñas de aplicaciones
2. Selecciona "Correo" y "Computadora Windows/Mac"
3. Copia la contraseña de 16 caracteres
4. Úsala como `EMAIL_PASS`

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## 📋 Endpoints

### `POST /api/contact`
Envía email de contacto.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "phone": "3131234567",
  "projectType": "cocina",
  "message": "Quiero una cocina integral..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email enviado exitosamente",
  "messageId": "abc123@smtp.gmail.com"
}
```

### `GET /api/health`
Estado del servidor.

### `GET /api/test-email`
Prueba configuración de email.

## 🔧 Configuración para otros proveedores

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tu_email@outlook.com
EMAIL_PASS=tu_contraseña
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tu_email@yahoo.com
EMAIL_PASS=tu_contraseña
```

### Servidor SMTP personalizado
```env
EMAIL_HOST=mail.tudominio.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=contacto@tudominio.com
EMAIL_PASS=tu_contraseña
```

## 🛡️ Seguridad

- **Rate Limiting**: 5 emails por IP cada 15 minutos
- **Validación**: Todos los campos son validados
- **CORS**: Solo tu frontend puede acceder
- **Helmet**: Headers de seguridad HTTP
- **Sanitización**: Datos limpiados automáticamente

## 🚀 Despliegue

### Heroku
```bash
# 1. Crear app
heroku create artemodular-backend

# 2. Configurar variables
heroku config:set EMAIL_USER=tu_email@gmail.com
heroku config:set EMAIL_PASS=tu_app_password
heroku config:set BUSINESS_EMAIL=info@artemodular.com
heroku config:set FRONTEND_URL=https://artemodular.netlify.app

# 3. Desplegar
git push heroku main
```

### Railway
1. Conecta tu repositorio
2. Configura variables de entorno
3. Despliega automáticamente

### VPS/DigitalOcean
```bash
# 1. Clonar repo
git clone tu-repo
cd backend

# 2. Instalar PM2
npm install -g pm2

# 3. Configurar .env

# 4. Iniciar
pm2 start server.js --name "artemodular-backend"
pm2 save
pm2 startup
```

## 🔍 Debugging

### Probar configuración
```bash
curl http://localhost:3001/api/test-email
```

### Enviar email de prueba
```bash
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

## 🆘 Troubleshooting

### Error: "Invalid login"
- ✅ Verifica EMAIL_USER y EMAIL_PASS
- ✅ Para Gmail, usa App Password
- ✅ Habilita "Aplicaciones menos seguras" si es necesario

### Error: "Connection timeout"
- ✅ Verifica EMAIL_HOST y EMAIL_PORT
- ✅ Revisa firewall/antivirus
- ✅ Prueba con otro proveedor

### Error: "Rate limit exceeded"
- ✅ Espera 15 minutos
- ✅ Usa otra IP
- ✅ Ajusta el rate limit

## 📞 Soporte

Si necesitas ayuda con la configuración:
- 📧 Revisa los logs del servidor
- 🔍 Usa el endpoint `/api/test-email`
- 💬 Contacta al desarrollador

## 🏗️ Arquitectura

```
backend/
├── server.js              # Servidor principal
├── services/
│   └── emailService.js    # Lógica de emails
├── package.json           # Dependencias
└── README.md             # Documentación
```

## 📈 Próximas mejoras

- [ ] Base de datos para logs
- [ ] Templates más avanzados
- [ ] Integración con CRM
- [ ] Métricas de emails
- [ ] Tests automatizados
