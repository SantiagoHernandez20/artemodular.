# 🏡 ArteModular - Landing Page Profesional

> **Landing page moderna y profesional para ArteModular, tu emprendimiento de carpintería a medida especializado en centros de entretenimiento y muebles exclusivos.**

## 🎯 Descripción del Proyecto

ArteModular es una landing page completa que presenta tu negocio de carpintería a medida, destacando tu especialización en **centros de entretenimiento** y tu capacidad de crear **diseños exclusivos** utilizando software de modelado 3D para brindar la mejor experiencia de usuario.

### ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz elegante con paleta de colores neutral y armónica
- 📱 **Responsive**: Optimizado para todos los dispositivos
- 🚀 **Performance**: Carga rápida y optimizada
- 📧 **Sistema de Contacto**: Formulario funcional con envío de emails automático
- 🖼️ **Galería Interactiva**: Muestra de trabajos y proyectos
- 🎭 **Showcase 3D**: Demostración de capacidades de modelado 3D
- 📊 **Proceso Claro**: Explicación paso a paso de tu metodología de trabajo

## 🏗️ Arquitectura del Proyecto

```
artemodular/
├── 📁 src/                    # Frontend Vue.js
│   ├── 📁 components/         # Componentes Vue
│   ├── 📁 assets/            # Recursos estáticos
│   └── main.js               # Punto de entrada
├── 📁 backend/               # Backend Express.js
│   ├── 📁 services/          # Servicios (email, etc.)
│   └── server.js             # Servidor Express
├── 📁 public/                # Archivos públicos
├── 📁 Context/               # Documentación del contexto
└── 📄 Archivos de configuración
```

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

- **Node.js** versión 16.0.0 o superior
- **npm** (incluido con Node.js)
- **Git** para clonar el repositorio

### 🔧 Paso 1: Clonar el Proyecto

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd artemodular

# Verificar que estés en el directorio correcto
ls -la
# Deberías ver: src/, backend/, package.json, etc.
```

### 🔧 Paso 2: Instalar Dependencias del Frontend

```bash
# Instalar dependencias del frontend (Vue.js + Tailwind CSS)
npm install

## Project setup
```

**Dependencias principales instaladas:**
- `vue@^3.2.13` - Framework Vue.js 3
- `tailwindcss@^4.1.12` - Framework CSS utility-first
- `@emailjs/browser@^4.4.1` - Integración con EmailJS
- `core-js@^3.8.3` - Polyfills para JavaScript moderno

### 🔧 Paso 3: Instalar Dependencias del Backend

```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias del backend
npm install

# Verificar instalación
npm list --depth=0
```

**Dependencias principales del backend:**
- `express@^4.18.2` - Framework web para Node.js
- `nodemailer@^6.9.7` - Envío de emails
- `cors@^2.8.5` - Middleware para CORS
- `dotenv@^16.3.1` - Variables de entorno
- `express-rate-limit@^7.1.5` - Protección anti-spam
- `helmet@^7.1.0` - Seguridad HTTP
- `express-validator@^7.0.1` - Validación de datos

### 🔧 Paso 4: Configurar Variables de Entorno

#### Frontend (.env en la raíz del proyecto)

```bash
# Crear archivo .env en la raíz
touch .env
```

```env
# Backend URL (opcional, solo si quieres cambiar la URL del backend)
VITE_BACKEND_URL=http://localhost:3001
```

#### Backend (.env en el directorio backend/)

```bash
# Ir al directorio backend
cd backend

# Crear archivo .env
touch .env
```

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
BUSINESS_EMAIL=aartemodular@gmail.com
BUSINESS_NAME=ArteModular

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 🔧 Paso 5: Configurar Gmail para Emails

#### Habilitar Autenticación de 2 Factores
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Verificación en 2 pasos** → **Habilitar**

#### Generar App Password
1. **Seguridad** → **Contraseñas de aplicaciones**
2. Selecciona "Correo" y "Computadora Windows/Mac"
3. Copia la contraseña de 16 caracteres
4. Úsala como `EMAIL_PASS` en tu `.env`

### 🔧 Paso 6: Verificar Configuración

```bash
# Desde la raíz del proyecto
cd backend

# Probar configuración del backend
npm run dev

# En otra terminal, probar configuración de email
curl http://localhost:3001/api/test-email
```

## 🚀 Ejecutar el Proyecto

### 🎨 Desarrollo Frontend

```bash
# Desde la raíz del proyecto
npm run dev

# O para desarrollo completo con Tailwind CSS
npm run dev:full
```

**URLs de desarrollo:**
- **Frontend**: http://localhost:9000
- **Backend**: http://localhost:3000

### 🔧 Desarrollo Backend

```bash
# Desde el directorio backend
cd backend
npm run dev
```

### 🏗️ Construcción para Producción

```bash
# Construir frontend
npm run build

# Construir CSS de Tailwind
npm run tailwind:build

# Construir todo
npm run build
```

## 📁 Estructura de Componentes

### 🎭 Componentes Principales

- **`AppHeader.vue`** - Navegación principal
- **`HeroSection.vue`** - Sección hero con llamada a la acción
- **`ServicesSection.vue`** - Servicios ofrecidos
- **`ProcessSection.vue`** - Proceso de trabajo paso a paso
- **`GallerySection.vue`** - Galería de trabajos realizados
- **`TestimonialsSection.vue`** - Testimonios de clientes
- **`ContactSection.vue`** - Formulario de contacto
- **`AppFooter.vue`** - Pie de página con información de contacto

### 🎨 Componentes Especializados

- **`ServiceCard.vue`** - Tarjeta individual de servicio
- **`ProcessStep.vue`** - Paso individual del proceso
- **`TestimonialCard.vue`** - Tarjeta de testimonio
- **`ImageComparison.vue`** - Comparación antes/después
- **`ThreeDShowcase.vue`** - Demostración de capacidades 3D

## 🎨 Paleta de Colores

Tu landing page utiliza una paleta de colores **neutral y armónica** perfecta para carpintería:

### 🎨 Colores Principales
- **Marrón Principal**: `#8D5524` - Color de marca principal
- **Marrón Oscuro**: `#6B3F1A` - Acentos y elementos destacados
- **Marrón Claro**: `#A66B2E` - Hover states y elementos secundarios
- **Beige**: `#F5E9DA` - Fondos y elementos de texto
- **Marrón Suave**: `#E6D4C1` - Bordes y elementos sutiles
- **Marrón Medio**: `#B8956F` - Textos secundarios y placeholders

### 🎨 Colores de Estado
- **Éxito**: Verde para confirmaciones
- **Error**: Rojo para errores
- **Advertencia**: Amarillo para alertas
- **Info**: Azul para información

## 📧 Sistema de Emails

### 🔧 Configuración Automática

El sistema envía **automáticamente 2 emails** por cada solicitud:

1. **Email al Negocio** (`aartemodular@gmail.com`)
   - Contiene todos los datos del cliente
   - Formato profesional y organizado
   - Incluye tipo de proyecto y descripción

2. **Email de Confirmación al Cliente**
   - Confirma recepción de la solicitud
   - Incluye información de contacto
   - Establece expectativas (24 horas)

### 📝 Formato de Emails

Los emails incluyen:
- **HTML responsivo** con branding de ArteModular
- **Información completa** del cliente y proyecto
- **Diseño profesional** con colores de marca
- **Call-to-action** claro para el negocio

## 🛠️ Scripts Disponibles

### 🚀 Frontend
```bash
npm run dev              # Desarrollo con hot-reload
npm run dev:full         # Desarrollo completo con Tailwind
npm run build            # Construcción para producción
npm run tailwind:build   # Construir solo CSS de Tailwind
npm run tailwind:watch   # Observar cambios en CSS
```

### 🔧 Backend
```bash
npm run dev              # Desarrollo con nodemon
npm start                # Producción
```

## 🌐 Endpoints del Backend

### 📧 Contacto
- **`POST /api/contact`** - Enviar solicitud de contacto
- **`GET /api/health`** - Estado del servidor
- **`GET /api/test-email`** - Probar configuración de email

### 📊 Rate Limiting
- **Máximo**: 5 emails por IP cada 15 minutos
- **Protección**: Anti-spam automática

## 🚀 Despliegue

### 🌐 Plataformas Recomendadas

#### Frontend (Vue.js)
- **Netlify** - Despliegue automático desde Git
- **Vercel** - Performance optimizada
- **GitHub Pages** - Gratis para proyectos personales

#### Backend (Express.js)
- **Railway** - Despliegue automático y gratuito
- **Heroku** - Plataforma establecida
- **DigitalOcean** - VPS con control total

### 🔧 Variables de Entorno en Producción

```env
# Producción
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tu-dominio.com

# Email (usar App Password)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
BUSINESS_EMAIL=aartemodular@gmail.com
```

## 🐛 Troubleshooting

### ❌ Problemas Comunes

#### Frontend no carga
```bash
# Verificar dependencias
npm install

# Limpiar cache
npm run build
```

#### Backend no inicia
```bash
# Verificar puerto
lsof -i :3001

# Verificar variables de entorno
cat .env
```

#### Emails no se envían
```bash
# Probar configuración
curl http://localhost:3001/api/test-email

# Verificar credenciales de Gmail
# Usar App Password, no contraseña normal
```

### 🔍 Logs y Debugging

```bash
# Frontend logs
npm run dev

# Backend logs
cd backend && npm run dev

# Ver logs en tiempo real
tail -f backend/logs/app.log
```

## 📚 Recursos Adicionales

### 🔗 Documentación
- [Vue.js 3](https://vuejs.org/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Express.js](https://expressjs.com/) - Framework backend
- [Nodemailer](https://nodemailer.com/) - Envío de emails

### 🎨 Herramientas de Diseño
- [Figma](https://figma.com/) - Diseño de interfaces
- [Adobe XD](https://www.adobe.com/products/xd.html) - Prototipado
- [Sketch](https://www.sketch.com/) - Diseño para Mac

## 🤝 Contribución

### 📝 Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 🐛 Reportar Bugs
- Usa el sistema de Issues de GitHub
- Incluye pasos para reproducir
- Adjunta screenshots si es necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**ArteModular**
- 📧 Email: aartemodular@gmail.com
- 📱 Teléfono: 313 358-9795
- 📍 Ubicación: Medellín, Colombia
- 🌐 Web: [artemodular.com](https://artemodular.com)

---

## 🎯 Próximos Pasos

1. ✅ **Configurar variables de entorno**
2. ✅ **Probar sistema de emails**
3. ✅ **Personalizar contenido y branding**
4. ✅ **Optimizar para SEO**
5. ✅ **Desplegar a producción**
6. ✅ **Configurar dominio personalizado**

¡Tu landing page de ArteModular está lista para impresionar a tus clientes! 🚀
