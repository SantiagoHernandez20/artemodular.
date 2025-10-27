// 🔐 Middleware de autenticación Supabase
const { createClient } = require('@supabase/supabase-js');

// Configurar cliente de Supabase para el backend
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Usar service role key para el backend

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables de entorno de Supabase faltantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Middleware para verificar token de Supabase
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

    // Verificar token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('❌ Error verificando token:', error);
      return res.status(401).json({
        success: false,
        message: 'Token de autenticación inválido',
        error: 'INVALID_TOKEN'
      });
    }

    // Agregar información del usuario a req
    req.user = {
      uid: user.id,
      email: user.email,
      emailVerified: user.email_confirmed_at ? true : false,
      name: user.user_metadata?.full_name || user.email,
      picture: user.user_metadata?.avatar_url,
      provider: user.app_metadata?.provider || 'google'
    };

    console.log(`✅ Usuario autenticado: ${req.user.email} (${req.user.uid})`);
    next();

  } catch (error) {
    console.error('❌ Error de autenticación:', error);
    
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
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        req.user = {
          uid: user.id,
          email: user.email,
          emailVerified: user.email_confirmed_at ? true : false,
          name: user.user_metadata?.full_name || user.email,
          picture: user.user_metadata?.avatar_url,
          provider: user.app_metadata?.provider || 'google'
        };
        
        console.log(`✅ Usuario autenticado (opcional): ${req.user.email}`);
      }
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
  optionalAuth,
  supabase
};
