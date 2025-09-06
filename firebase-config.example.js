// firebase-config.example.js
// Copia este archivo como .env.local y reemplaza los valores con tu configuración real

export const firebaseConfig = {
  apiKey: "AIzaSyB-QnjXvhi8VjimX5wVY6VQ0Mas3EBZ5iE",
  authDomain: "artemodular-6954d.firebaseapp.com",
  databaseURL: "https://artemodular-6954d-default-rtdb.firebaseio.com",
  projectId: "artemodular-6954d",
  storageBucket: "artemodular-6954d.firebasestorage.app",
  messagingSenderId: "612236073715",
  appId: "1:612236073715:web:73633cf5f26892229db586"
};

// Pasos para configurar:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a Project Settings > General
// 4. En la sección "Your apps", haz clic en el ícono de web
// 5. Copia la configuración
// 6. Reemplaza los valores en src/config/firebase.js
