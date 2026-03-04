const { z } = require('zod');

const contactSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(50),
  email: z.string().email('Email inválido'),
  phone: z.string()
    .transform(val => val.trim().replace(/\s|-|\(|\)/g, ''))
    .pipe(z.string().regex(/^(\+57|57)?3[0-9]{9}$/, 'Formato de teléfono inválido (Colombia)')),
  projectType: z.enum(['cocina', 'closet', 'muebles', 'oficina', 'obra', 'otro']),
  message: z.string().min(10, 'Mínimo 10 caracteres').max(1000)
});

const validateContact = async (req, res, next) => {
  try {
    await contactSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message }))
    });
  }
};

module.exports = { validateContact };