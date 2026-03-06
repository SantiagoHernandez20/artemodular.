// middleware/auth.js
const VALID_AGENTS = ['n8n-agent', 'artemodular-admin']; // clientes permitidos

/**
 * Verifica API Key en header x-api-key
 */
const apiKeyAuth = (req, res, next) => {
  const key = req.headers['x-api-key'];

  if (!key) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'API Key requerida'
    });
  }

  if (key !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'API Key inválida'
    });
  }

  next();
};

/**
 * Verifica que el origen sea un cliente conocido via x-agent header
 * Capa adicional — no reemplaza apiKeyAuth, se usa en combinación
 */
const verifyAgent = (req, res, next) => {
  const agent = req.headers['x-agent'];

  if (!agent || !VALID_AGENTS.includes(agent)) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Origen no autorizado'
    });
  }

  next();
};


module.exports = { apiKeyAuth, verifyAgent };