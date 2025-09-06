# 🔥 Configuración de Firebase Admin SDK

## ✅ Credenciales Configuradas

Las credenciales de Firebase Admin SDK ya están configuradas en:
- **Archivo JSON**: `backend/config/artemodular-6954d-firebase-adminsdk-fbsvc-3388715a07.json`
- **Configuración**: `backend/config/firebase.js`

## 📋 Variables de Entorno (Opcional)

Si prefieres usar variables de entorno en lugar del archivo JSON, crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=artemodular-6954d
FIREBASE_PRIVATE_KEY_ID=3388715a073a1f5fa2d6e5a01331ff33044b07fd
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwK1voZ0BEakzP\nodo96fWUQr0z7vaCGwO2/AFz8x+EKyzUzitmPFaM0eEAGXdht6QtkWD/B3cnmYCH\nVXG4Y4Iok4RhzpI9Rw07ODxGOjdulyz7i78ju9q4FRYoii4VoN+ciQUIvcQiSkrO\n/98NUGDW9Dg/4ljmozGOX4RJglDmu+r8zHDftguWEoYarpNG7NyBwqwLhFi9L/Cz\nO4Jmkk5HTt8IhAELuhn9yH+cBce5OvRw8xlUTYZiiwXx8HK5drQb7YIPJQx+OyMk\nR5oxK83pWizsEhXlMWWa51t7hZSt9to+JGvns0qdmVUgm6zM6dYP47KqtT1ePfWn\nNjoDUN0hAgMBAAECggEASysdCrNvqSGAR8HkSLG4vvuhFnU6inYzZhLuHcbZpj/z\n35Ne0j8hoPF2o1+6YCAG9giHjhnl3igxvs0W+lm/MkgLXt5Q6MOV4jRTB5YUi+QG\nZgiRVJJ1t0EMFN0s376mWvjeBIZQF1+CvwNPbbNjtqQ7Egsm6rYsUXbxD5qCoYhM\n3wt9x8ZQ21V/MG3N7Aj+9pqVekAlNDUtiR91kxsd1z3kbuDIfO2DIfXfYGJZeNP3\nIilQrz6KohaChroAVhI41JcrLuOjXl2P4fW4E2DLKmc45+yDYop8rbUKTzNy2/kF\nNwYoV/4fD/P9SarFkwPhkvNTxZge8BIVoYltnBCiZwKBgQDbb6Qomn+5zpcWq8kf\nZuRQFwmmEvTWszFZREKOvld1V2CCAMhGYOdB5oHZb+uDzf7NyF1QkImHdQFY20/7\notNnnkNMnJsk4fkcakTUrzmag5pu996MnVsWngHouJXmmc2Jy1JOXZ55y59qOdAj\nyDLdsgNawVI30xeGUQScau6dewKBgQDNhh0vCGHeGjz9gKNqeYFLrrSu5rd97zju\ny37TN2+/tTp73/L+SFrL+Yzhr2q237yz89HTzN4z2JFDr+aRQuVsvFtdfpjhLdoN\nlCn7LTqWWYvzVYuBosgxxe3NSCZbPzaAAK9AJc8oCYgYB1XQ7mZ8Kko9Sk4TQEg0\ngJf7rwV3EwKBgCnF6v4/yyjYBzMtqK/tqnEEsbWHzkxA+JgBwpnh6kxQQfL9qyKa\nt+t3sihugespf+Q0zG7V1RiQUZ1Uwrkomg4TtsQS3AX9bqrWIBxM7y5W90NAtIEY\nQ4resYZX/VFU3ifpKNX6RHzzInnaX6EwL1680J6qRriR2tya98G/KYWZAoGBAMH6\nJctBTxWQkCX3ZsVUvtrOnsxBB8h9o6+GM0JpHTjEdNl76l1jrwa7luNfbAoEK5dw\ntYcA4mvuqFRJTgWmLOGu+VDJ7sMBQr/0Kpdd/eDvzW4yPERzfh20IRjSUxlmFStE\n+iNCTD4OmPuM2MskZ2gjhgRJAF2dG0kqYcfzTeYvAoGAJwCIpcWcrlsUL4z3iRwg\n9G0FF9VR6d5lJ/W7cOfYw+mkre/nFMi+s/Rf/7hHBRAb6bsaV1qqFuA+op3Llgxk\nA+2zSbM78U/6Abt9jbbKpJlyBznmUTvHxljEqOLy3mCvraK2GeRce5h0/upRT7LH\ncks7FVCH6uXYqa9kzTc52Zs=\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@artemodular-6954d.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=108558502139957731378
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40artemodular-6954d.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Server Configuration
PORT=3001
NODE_ENV=development

# Database URL (opcional)
DATABASE_URL=https://artemodular-6954d-default-rtdb.firebaseio.com/
```

## 🚀 Uso Actual

La configuración actual usa directamente el archivo JSON de credenciales, que es más seguro y directo. No necesitas crear el archivo `.env` a menos que prefieras usar variables de entorno.

## 🔒 Seguridad

- ✅ El archivo JSON está en la carpeta `config/` (no se sube a git)
- ✅ Las credenciales están protegidas
- ✅ Firebase Admin SDK está correctamente configurado

## 🧪 Probar la Configuración

Para verificar que Firebase está funcionando correctamente:

```bash
cd backend
npm run dev
```

Deberías ver el mensaje: `✅ Firebase Admin inicializado correctamente`
