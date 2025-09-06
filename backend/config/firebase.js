var admin = require("firebase-admin");
const path = require('path');

// Cargar variables de entorno
require('dotenv').config({ 
  path: path.join(__dirname, '..', '..', '.env.local') 
});

// Usar el archivo JSON de credenciales directamente
const serviceAccount = require('./artemodular-6954d-firebase-adminsdk-fbsvc-3388715a07.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL || `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com/`
});

console.log('✅ Firebase Admin inicializado correctamente');

module.exports = { admin, app };
