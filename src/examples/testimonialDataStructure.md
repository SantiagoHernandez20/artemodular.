# Estructura de Datos para Testimonios en Firebase

## Estructura de la base de datos

Los testimonios se almacenan en Firebase Realtime Database bajo la ruta `testimonials/`.

### Estructura de un testimonio

```json
{
  "testimonials": {
    "-NcX1234567890": {
      "id": "-NcX1234567890",
      "authorName": "Juan Pérez",
      "content": "Excelente trabajo en mi cocina. Muy profesional y puntual.",
      "rating": 5,
      "service": "Cocina a medida",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "approvedAt": null,
      "rejectedAt": null,
      "rejectionReason": null
    }
  }
}
```

### Campos del testimonio

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `id` | string | ID único del testimonio (generado por Firebase) | Sí |
| `authorName` | string | Nombre del autor del testimonio | Sí |
| `content` | string | Contenido del testimonio | Sí |
| `rating` | number | Calificación de 1 a 5 estrellas | No |
| `service` | string | Servicio contratado | No |
| `status` | string | Estado: `pending`, `approved`, `rejected` | Sí |
| `createdAt` | string | Fecha de creación (ISO 8601) | Sí |
| `updatedAt` | string | Fecha de última actualización (ISO 8601) | Sí |
| `approvedAt` | string | Fecha de aprobación (ISO 8601) | No |
| `rejectedAt` | string | Fecha de rechazo (ISO 8601) | No |
| `rejectionReason` | string | Razón del rechazo | No |

### Estados del testimonio

- **`pending`**: Testimonio pendiente de revisión
- **`approved`**: Testimonio aprobado y visible al público
- **`rejected`**: Testimonio rechazado (no visible al público)

## Ejemplos de uso

### Crear un nuevo testimonio

```javascript
import testimonialsService from '../services/testimonialsService'

const newTestimonial = {
  authorName: "María García",
  content: "Muy satisfecha con el trabajo realizado en mi dormitorio.",
  rating: 5,
  service: "Dormitorio a medida"
}

try {
  const result = await testimonialsService.createTestimonial(newTestimonial)
  console.log('Testimonio creado:', result)
} catch (error) {
  console.error('Error:', error)
}
```

### Aprobar un testimonio

```javascript
try {
  await testimonialsService.approveTestimonial('testimonialId')
  console.log('Testimonio aprobado')
} catch (error) {
  console.error('Error:', error)
}
```

### Rechazar un testimonio

```javascript
try {
  await testimonialsService.rejectTestimonial('testimonialId', 'Contenido inapropiado')
  console.log('Testimonio rechazado')
} catch (error) {
  console.error('Error:', error)
}
```

### Obtener testimonios por estado

```javascript
// Obtener todos los pendientes
const pending = await testimonialsService.getPendingTestimonials()

// Obtener todos los aprobados
const approved = await testimonialsService.getApprovedTestimonials()

// Obtener todos los rechazados
const rejected = await testimonialsService.getRejectedTestimonials()
```

## Reglas de seguridad recomendadas para Firebase

```json
{
  "rules": {
    "testimonials": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$testimonialId": {
        ".read": "auth != null",
        ".write": "auth != null && (data.child('status').val() == 'pending' || root.child('users').child(auth.uid).child('isAdmin').val() == true)"
      }
    }
  }
}
```

## Notas importantes

1. **Solo usuarios autenticados** pueden crear testimonios
2. **Solo administradores** pueden aprobar/rechazar testimonios
3. **Los testimonios aprobados** son los únicos visibles al público
4. **Los testimonios rechazados** se mantienen en la base de datos con la razón del rechazo
5. **Todos los cambios** se registran con timestamps para auditoría
