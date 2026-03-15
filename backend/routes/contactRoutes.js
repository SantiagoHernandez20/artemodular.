const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { validateContact } = require('../middleware/validators.js');
const { sendContactEmail } = require('../services/emailService');

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Aumentado para pruebas iniciales
  message: { error: 'Demasiados intentos. Intenta en 15 minutos.', code: 'RATE_LIMIT_EXCEEDED' },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/contact
router.post('/', emailLimiter, validateContact, async (req, res, next) => {
  try {
    const emailResult = await sendContactEmail(req.body);
    res.status(200).json({
      success: true,
      message: 'Email enviado exitosamente',
      messageId: emailResult.messageId
    });
  } catch (error) {
    next(error); // Lo enviamos al manejador global de errores
  }
});

// GET /api/contact/test (Antes era /api/test-email)
// router.get('/test', async (req, res) => {
//   try {
//     const testResult = await testEmailConfiguration();
//     res.json({ success: true, details: testResult });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

module.exports = router;