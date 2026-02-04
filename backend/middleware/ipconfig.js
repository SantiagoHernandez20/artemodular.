// 🔐 Middleware de autenticación basado en IP
// Solo permite acceso a administradores con IP específica

/**
 * Obtiene la IP real del cliente, considerando proxies y load balancers
 */
const getClientIP = (req) => {
  // Intentar obtener IP de varios headers (útil cuando hay proxies)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // x-forwarded-for puede contener múltiples IPs (cliente, proxy1, proxy2...)
    // La primera IP es la del cliente real
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = req.headers['x-real-ip'];
  if (realIP) {
    return realIP;
  }
  
  // Si no hay headers de proxy, usar la conexión directa
  return req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip || 'unknown';
};

/**
 * Lista de IPs permitidas
 * Añade aquí tu IP local y la IP de producción si es necesario
 */
const ALLOWED_IPS = [
  //'127.0.0.1',           // localhost
  '::1'                 // localhost IPv6
  //'::ffff:127.0.0.1'    // localhost IPv4 en formato IPv6
  //'172.29.112.1'
  //'186.112.21.22'
  // Agrega aquí tu IP local (ejemplo: '192.168.1.100')
  // Para obtener tu IP: curl ifconfig.me
];

/**
 * Middleware principal para verificar IP
 * Retorna 403 si la IP no está permitida
 */
const verifyIP = (req, res, next) => {
  const clientIP = getClientIP(req);
  
  // Normalizar IP para comparación (IPv6 puede venir en varios formatos)
  const normalizedIP = clientIP.includes('::') 
    ? clientIP.replace('::ffff:', '') 
    : clientIP;
  
  // Verificar si la IP está permitida
  const isAllowed = ALLOWED_IPS.some(allowedIP => {
    const normalizedAllowed = allowedIP.includes('::') 
      ? allowedIP.replace('::ffff:', '') 
      : allowedIP;
    
    return normalizedIP === normalizedAllowed || clientIP.includes(allowedIP);
  });
  
  if (!isAllowed) {
    console.log(`🚫 Acceso denegado desde IP: ${clientIP} (${normalizedIP})`);
    console.log(`📋 IPs permitidas: ${ALLOWED_IPS.join(', ')}`);
    
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado: IP no autorizada',
      yourIP: clientIP,
      allowedIPs: ALLOWED_IPS
    });
  }
  
  console.log(`✅ Acceso permitido desde IP: ${clientIP}`);
  
  // Agregar la IP a la request para referencia
  req.clientIP = clientIP;
  next();
};

/**
 * Middleware opcional que agrega la IP pero no bloquea
 * Útil para logging sin restringir acceso
 */
const logIP = (req, res, next) => {
  const clientIP = getClientIP(req);
  console.log(`📍 Request desde IP: ${clientIP}`);
  req.clientIP = clientIP;
  next();
};

/**
 * Función helper para obtener tu IP actual
 * Llama a GET /api/auth/my-ip para ver tu IP
 */
const getMyIP = (req, res) => {
  const clientIP = getClientIP(req);
  
  res.json({
    success: true,
    ip: clientIP,
    normalized: clientIP.includes('::ffff:') ? clientIP.replace('::ffff:', '') : clientIP,
    headers: {
      'x-forwarded-for': req.headers['x-forwarded-for'] || 'no present',
      'x-real-ip': req.headers['x-real-ip'] || 'no present',
      'connection.remoteAddress': req.connection?.remoteAddress || 'no present',
      'socket.remoteAddress': req.socket?.remoteAddress || 'no present'
    },
    allowedIPs: ALLOWED_IPS,
    isAllowed: ALLOWED_IPS.some(allowedIP => {
      const normalizedIP = clientIP.includes('::ffff:') 
        ? clientIP.replace('::ffff:', '') 
        : clientIP;
      const normalizedAllowed = allowedIP.includes('::ffff:') 
        ? allowedIP.replace('::ffff:', '') 
        : allowedIP;
      
      return normalizedIP === normalizedAllowed || clientIP.includes(allowedIP);
    })
  });
};

module.exports = {
  verifyIP,
  logIP,
  getMyIP,
  getClientIP,
  ALLOWED_IPS
};

