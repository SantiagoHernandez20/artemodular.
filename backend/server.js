const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config(); // Carga .env automáticamente

const corsOptions = require('./config/cors');
const contactRoutes = require('./routes/contactRoutes');
const testimonialRoutes = require('./routes/TestimonialRoutes');
//const { getMyIP } = require('./middleware/ipconfig');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURACIÓN DE SEGURIDAD Y MIDDLEWARES ---
app.set('trust proxy', 1); // Indispensable para Render/Rate-limit

app.use(helmet({
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  crossOriginEmbedderPolicy: { policy: "unsafe-none" },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' })); // Suficiente para formularios de texto

// --- RUTAS ---
app.get('/', (req, res) => {
  res.json({
    message: '🏡 ArteModular API está en línea',
    documentation: 'Consulta /api/health para el estado del sistema'
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'OK', uptime: process.uptime() }));
//app.get('/api/auth/my-ip', getMyIP);

app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Manejo de 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint no encontrado' });
});

// --- MANEJADOR GLOBAL DE ERRORES ---
app.use((err, req, res, next) => {
  console.error(`❌ [Error]: ${err.message}`);
  const isDev = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(isDev && { stack: err.stack })
  });
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 ArteModular Backend listo en puerto ${PORT} (${process.env.NODE_ENV || 'dev'})`);
});

// Cierre graceful
const gracefulShutdown = () => {
  console.log('🛑 Cerrando servidor...');
  process.exit(0);
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);