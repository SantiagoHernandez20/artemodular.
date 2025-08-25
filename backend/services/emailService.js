// 📧 Servicio de Email para ArteModular
// Maneja el envío de emails usando Nodemailer

const nodemailer = require('nodemailer')

// 📋 Mapeo de tipos de proyecto para el email
const PROJECT_TYPES = {
  cocina: 'Cocina Integral',
  closet: 'Closet o Vestidor',
  muebles: 'Muebles Decorativos',
  oficina: 'Muebles de Oficina',
  obra: 'Carpintería de Obra',
  otro: 'Otro Proyecto'
}

// 🔧 Configuración del transporter de Nodemailer
const createTransporter = () => {
  // Debug: mostrar variables de entorno disponibles
  /*
  console.log('🔍 Variables de entorno disponibles en emailService:', {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS ? '***' : 'NO DEFINIDA',
    BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,
    BUSINESS_NAME: process.env.BUSINESS_NAME,
    NODE_ENV: process.env.NODE_ENV,
    'Todas las variables': Object.keys(process.env).filter(key => 
      key.includes('EMAIL') || key.includes('BUSINESS')
    )
  })
  */

  // Validar variables de entorno requeridas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Variables de entorno EMAIL_USER y EMAIL_PASS son requeridas')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465', // true para puerto 465, false para otros
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Para Gmail usar App Password
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production' // true en producción, false en desarrollo
    }
  })
}

// 📝 Generar HTML para el email al negocio
const generateBusinessEmailHTML = (contactData) => {
  const { name, email, phone, projectType, message } = contactData
  const projectTypeName = PROJECT_TYPES[projectType] || projectType

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8D5524, #6B3F1A); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #F5E9DA; padding: 20px; }
        .footer { background: #8D5524; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8D5524; }
        .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
        .highlight { background: #8D5524; color: white; padding: 2px 8px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏡 Nueva Solicitud - ${process.env.BUSINESS_NAME || 'ArteModular'}</h1>
          <p>Has recibido una nueva solicitud de presupuesto</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">👤 Nombre del Cliente:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email de Contacto:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">📱 Teléfono:</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>
          
          <div class="field">
            <div class="label">🔨 Tipo de Proyecto:</div>
            <div class="value"><span class="highlight">${projectTypeName}</span></div>
          </div>
          
          <div class="field">
            <div class="label">💬 Descripción del Proyecto:</div>
            <div class="value">${message}</div>
          </div>
          
          <div class="field">
            <div class="label">⏰ Fecha y Hora:</div>
            <div class="value">${new Date().toLocaleString('es-CO', { 
              timeZone: 'America/Bogota',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Recuerda:</strong> Contactar al cliente en menos de 24 horas</p>
          <p>📞 Responder por teléfono suele tener mejor conversión</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// 📝 Generar email de confirmación para el cliente
const generateClientConfirmationHTML = (contactData) => {
  const { name, projectType } = contactData
  const projectTypeName = PROJECT_TYPES[projectType] || projectType

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8D5524, #6B3F1A); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #F5E9DA; padding: 30px; }
        .footer { background: #8D5524; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .logo { font-size: 2em; margin-bottom: 10px; }
        .highlight { background: #8D5524; color: white; padding: 2px 8px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🏡</div>
          <h1>${process.env.BUSINESS_NAME || 'ArteModular'}</h1>
          <p>Carpintería a Medida</p>
        </div>
        
        <div class="content">
          <h2>¡Hola ${name}! 👋</h2>
          
          <p>Gracias por contactarnos para tu proyecto de <strong class="highlight">${projectTypeName}</strong>.</p>
          
          <p>Hemos recibido tu solicitud y nuestro equipo la está revisando. Te contactaremos en <strong>menos de 24 horas</strong> para:</p>
          
          <ul>
            <li>📋 Revisar los detalles de tu proyecto</li>
            <li>📅 Programar una visita gratuita</li>
            <li>📐 Tomar medidas precisas</li>
            <li>💰 Preparar un presupuesto personalizado</li>
          </ul>
          
          <p><strong>Mientras tanto:</strong></p>
          <ul>
            <li>💡 Ve preparando ideas de diseño que te gusten</li>
            <li>📏 Si tienes medidas aproximadas, tenlas a mano</li>
            <li>💵 Define tu presupuesto aproximado</li>
          </ul>
          
          <p>¿Tienes alguna pregunta urgente? No dudes en llamarnos:</p>
          <p style="text-align: center; font-size: 1.2em;">
            📞 <strong><a href="tel:+573133589795" style="color: #8D5524;">313 358-9795</a></strong>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>${process.env.BUSINESS_NAME || 'ArteModular'}</strong> - Transformamos tus ideas en realidad</p>
          <p>📧 ${process.env.BUSINESS_EMAIL || 'info@artemodular.com'} | 📱 313 358-9795 | 📍 Medellín, Colombia</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// 📧 Función principal para enviar email de contacto
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter()
    const { name, email, projectType } = contactData

    // Email al negocio (principal)
    const businessMailOptions = {
      from: `"${name} - ${process.env.BUSINESS_NAME || 'ArteModular'} Web" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL || 'jairsantiagomh@gmail.com',
      subject: `🏡 Nueva Solicitud: ${PROJECT_TYPES[projectType] || projectType} - ${name}`,
      html: generateBusinessEmailHTML(contactData),
      replyTo: email // Para que el negocio pueda responder directamente al cliente
    }

    // Email de confirmación al cliente (opcional)
    const clientMailOptions = {
      from: `"${process.env.BUSINESS_NAME || 'ArteModular'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Solicitud Recibida - ${process.env.BUSINESS_NAME || 'ArteModular'} | Te contactaremos pronto`,
      html: generateClientConfirmationHTML(contactData)
    }

    // Enviar ambos emails
    console.log('📤 Enviando email al negocio...')
    const businessResult = await transporter.sendMail(businessMailOptions)
    
    console.log('📤 Enviando confirmación al cliente...')
    const clientResult = await transporter.sendMail(clientMailOptions)

    console.log('✅ Emails enviados exitosamente')
    console.log(`📧 Business Email ID: ${businessResult.messageId}`)
    console.log(`📧 Client Email ID: ${clientResult.messageId}`)

    return {
      success: true,
      businessMessageId: businessResult.messageId,
      clientMessageId: clientResult.messageId,
      messageId: businessResult.messageId // Para compatibilidad
    }

  } catch (error) {
    console.error('❌ Error al enviar email:', error)
    throw new Error(`Error en el servicio de email: ${error.message}`)
  }
}

// 🔧 Función para probar la configuración de email
const testEmailConfiguration = async () => {
  try {
    const transporter = createTransporter()
    
    // Verificar conexión
    console.log('🔍 Verificando configuración de email...')
    await transporter.verify()
    
    console.log('✅ Configuración de email válida')
    return {
      status: 'success',
      message: 'Configuración de email verificada correctamente',
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      user: process.env.EMAIL_USER,
      businessEmail: process.env.BUSINESS_EMAIL,
      businessName: process.env.BUSINESS_NAME,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('❌ Error en configuración de email:', error)
    throw new Error(`Configuración de email inválida: ${error.message}`)
  }
}

module.exports = {
  sendContactEmail,
  testEmailConfiguration
}
