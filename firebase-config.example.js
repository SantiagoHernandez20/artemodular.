// firebase-config.example.js
// Copia este archivo como .env.local y reemplaza los valores con tu configuración real

export const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id-aqui"
};

// Pasos para configurar:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a Project Settings > General
// 4. En la sección "Your apps", haz clic en el ícono de web
// 5. Copia la configuración
// 6. Reemplaza los valores en src/config/firebase.js
