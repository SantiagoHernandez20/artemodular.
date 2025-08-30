import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase - REEMPLAZA CON TUS DATOS REALES
const firebaseConfig = {
  apiKey: "AIzaSyB-QnjXvhi8VjimX5wVY6VQ0Mas3EBZ5iE",
  authDomain: "artemodular-6954d.firebaseapp.com",
  databaseURL: "https://artemodular-6954d-default-rtdb.firebaseio.com",
  projectId: "artemodular-6954d",
  storageBucket: "artemodular-6954d.firebasestorage.app",
  messagingSenderId: "612236073715",
  appId: "1:612236073715:web:73633cf5f26892229db586"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de servicios
export const database = getDatabase(app);
export const auth = getAuth(app);

export default app;
