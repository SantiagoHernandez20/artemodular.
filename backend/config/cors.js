const allowedOrigins = [
    'https://artemodular.site',
    'https://www.artemodular.site',
    'https://pre-deploy.artemodular.site',
    'http://localhost:9001',
    'http://localhost:9000',
    'http://localhost:9002',
    'http://localhost:4174'
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  };
  
  module.exports = corsOptions;