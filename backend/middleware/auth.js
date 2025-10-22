// 🔐 Middleware de autenticación Firebase
const admin = require('../config/firebase-admin');

// Middleware para verificar token de Firebase
const authenticateUser = async (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticación requerido',
        error: 'MISSING_TOKEN'
      });
    }

    // Extraer token (remover "Bearer ")
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN_FORMAT'
      });
    }

    // Verificar token con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Agregar información del usuario a req
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name || decodedToken.display_name,
      picture: decodedToken.picture,
      provider: decodedToken.firebase?.sign_in_provider || 'google.com'
    };

    console.log(`✅ Usuario autenticado: ${req.user.email} (${req.user.uid})`);
    next();

  } catch (error) {
    console.error('❌ Error de autenticación:', error);
    
    // Manejar diferentes tipos de errores
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado',
        error: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({
        success: false,
        message: 'Token revocado',
        error: 'TOKEN_REVOKED'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token de autenticación inválido',
      error: 'INVALID_TOKEN'
    });
  }
};

// Middleware opcional (no bloquea si no hay token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        name: decodedToken.name || decodedToken.display_name,
        picture: decodedToken.picture,
        provider: decodedToken.firebase?.sign_in_provider || 'google.com'
      };
      
      console.log(`✅ Usuario autenticado (opcional): ${req.user.email}`);
    }
    
    next();
  } catch (error) {
    // Si falla la autenticación, continuar sin usuario
    console.log('ℹ️ Autenticación opcional falló, continuando sin usuario');
    next();
  }
};

module.exports = {
  authenticateUser,
  optionalAuth
};