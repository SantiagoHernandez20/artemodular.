# 🔄 Esquema de Migración Firebase → Supabase - ArteModular

## 📋 Estructura del Proyecto Vue.js 3

```
artemodular/
├── backend/          # Node.js API
├── src/              # Vue 3 Frontend
├── public/
├── firebase.json     # → eliminar
├── .firebaserc       # → eliminar
└── .env.local        # → actualizar con Supabase
```

---

## 🎯 Plan de Migración Completo

### **Fase 1: Configuración de Supabase** (1-2 días)

#### 1.1 Crear Proyecto en Supabase
- [ ] Registrarse en [supabase.com](https://supabase.com)
- [ ] Crear proyecto: `artemodular-prod`
- [ ] Guardar credenciales:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (backend)

#### 1.2 Diseñar Esquema de Base de Datos

```sql
-- ============================================
-- CATEGORIAS DE MUEBLES
-- ============================================
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  icono VARCHAR(50),
  orden INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_categorias_slug ON categorias(slug);
CREATE INDEX idx_categorias_visible ON categorias(visible);

-- ============================================
-- PROYECTOS (Catálogo de muebles)
-- ============================================
CREATE TABLE proyectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  imagenes JSONB DEFAULT '[]', -- [{url, alt, orden}]
  imagen_principal TEXT,
  precio_desde DECIMAL(10,2),
  precio_hasta DECIMAL(10,2),
  dimensiones JSONB, -- {ancho, alto, profundidad, unidad}
  materiales TEXT[] DEFAULT '{}',
  acabados TEXT[] DEFAULT '{}',
  tiempo_estimado_dias INT,
  complejidad VARCHAR(20), -- 'baja', 'media', 'alta'
  visible BOOLEAN DEFAULT true,
  destacado BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  vistas INT DEFAULT 0,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_proyectos_categoria ON proyectos(categoria_id);
CREATE INDEX idx_proyectos_visible ON proyectos(visible);
CREATE INDEX idx_proyectos_destacado ON proyectos(destacado);
CREATE INDEX idx_proyectos_created ON proyectos(created_at DESC);

-- ============================================
-- COTIZACIONES
-- ============================================
CREATE TABLE cotizaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folio VARCHAR(20) UNIQUE, -- Ejemplo: COT-2025-001
  
  -- Datos del cliente
  nombre_cliente VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  ciudad VARCHAR(100),
  
  -- Detalles del proyecto
  tipo_proyecto VARCHAR(100), -- 'cocina', 'escritorio', 'repisa', etc.
  descripcion TEXT NOT NULL,
  dimensiones_aproximadas JSONB, -- {ancho, alto, profundidad}
  ubicacion_instalacion TEXT,
  presupuesto_estimado VARCHAR(50), -- '5000-10000', '10000-20000', etc.
  urgencia VARCHAR(50), -- 'inmediata', '1-2 semanas', 'flexible'
  
  -- Archivos
  imagenes_referencia TEXT[] DEFAULT '{}',
  archivos_adjuntos TEXT[] DEFAULT '{}',
  
  -- Gestión
  estado VARCHAR(50) DEFAULT 'pendiente', -- pendiente, en_revision, cotizado, aprobado, rechazado
  prioridad VARCHAR(20) DEFAULT 'normal', -- baja, normal, alta
  notas_cliente TEXT,
  notas_admin TEXT,
  precio_cotizado DECIMAL(10,2),
  fecha_cotizacion TIMESTAMPTZ,
  fecha_vencimiento TIMESTAMPTZ,
  
  -- Tracking
  usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  asignado_a UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_cotizaciones_estado ON cotizaciones(estado);
CREATE INDEX idx_cotizaciones_email ON cotizaciones(email);
CREATE INDEX idx_cotizaciones_created ON cotizaciones(created_at DESC);

-- Función para generar folio automático
CREATE OR REPLACE FUNCTION generar_folio_cotizacion()
RETURNS TRIGGER AS $$
DECLARE
  year_actual TEXT;
  contador INT;
BEGIN
  year_actual := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COUNT(*) + 1 INTO contador
  FROM cotizaciones
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  NEW.folio := 'COT-' || year_actual || '-' || LPAD(contador::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generar_folio
BEFORE INSERT ON cotizaciones
FOR EACH ROW
EXECUTE FUNCTION generar_folio_cotizacion();

-- ============================================
-- USUARIOS (Auth + Perfil)
-- ============================================
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre_completo VARCHAR(200),
  telefono VARCHAR(50),
  ciudad VARCHAR(100),
  direccion TEXT,
  
  -- Rol y permisos
  rol VARCHAR(50) DEFAULT 'cliente', -- cliente, admin, diseñador
  
  -- Metadata
  avatar_url TEXT,
  preferencias JSONB DEFAULT '{}',
  ultimo_acceso TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONFIGURACION DEL SITIO
-- ============================================
CREATE TABLE configuracion (
  clave VARCHAR(100) PRIMARY KEY,
  valor JSONB NOT NULL,
  descripcion TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datos iniciales
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('contacto', '{"email": "info@artemodular.com", "telefono": "+57 123 456 7890", "whatsapp": "+57 123 456 7890"}', 'Información de contacto'),
('redes_sociales', '{"instagram": "@artemodular", "facebook": "artemodular", "tiktok": "@artemodular"}', 'Redes sociales'),
('horario_atencion', '{"dias": "Lunes a Viernes", "horario": "8:00 AM - 6:00 PM"}', 'Horario de atención'),
('hero_landing', '{"titulo": "Diseñamos tus espacios", "subtitulo": "Muebles a medida", "cta": "Cotiza tu proyecto"}', 'Contenido hero landing page');

-- ============================================
-- TESTIMONIOS
-- ============================================
CREATE TABLE testimonios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_cliente VARCHAR(200) NOT NULL,
  proyecto_tipo VARCHAR(100),
  testimonio TEXT NOT NULL,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  imagen_cliente TEXT,
  imagen_proyecto TEXT,
  visible BOOLEAN DEFAULT true,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STORAGE BUCKETS (Configurar en Supabase UI)
-- ============================================
-- Bucket: proyectos-imagenes (público)
-- Bucket: cotizaciones-archivos (privado)
-- Bucket: usuarios-avatares (público)
```

#### 1.3 Configurar Row Level Security (RLS)

```sql
-- ============================================
-- RLS POLICIES - PROYECTOS
-- ============================================
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- Lectura pública de proyectos visibles
CREATE POLICY "Proyectos visibles son públicos"
ON proyectos FOR SELECT
TO anon, authenticated
USING (visible = true);

-- Solo admins pueden insertar/actualizar/eliminar
CREATE POLICY "Solo admins gestionan proyectos"
ON proyectos FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.rol = 'admin'
  )
);

-- ============================================
-- RLS POLICIES - CATEGORIAS
-- ============================================
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorías visibles son públicas"
ON categorias FOR SELECT
TO anon, authenticated
USING (visible = true);

CREATE POLICY "Solo admins gestionan categorías"
ON categorias FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.rol = 'admin'
  )
);

-- ============================================
-- RLS POLICIES - COTIZACIONES
-- ============================================
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden crear cotizaciones (anon o authenticated)
CREATE POLICY "Cualquiera puede crear cotizaciones"
ON cotizaciones FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Los usuarios autenticados pueden ver sus propias cotizaciones
CREATE POLICY "Ver propias cotizaciones"
ON cotizaciones FOR SELECT
TO authenticated
USING (
  usuario_id = auth.uid()
  OR email = auth.jwt()->>'email'
  OR EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.rol IN ('admin', 'diseñador')
  )
);

-- Solo admins pueden actualizar/eliminar
CREATE POLICY "Solo admins gestionan cotizaciones"
ON cotizaciones FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.rol = 'admin'
  )
);

-- ============================================
-- RLS POLICIES - USUARIOS
-- ============================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Ver propio perfil"
ON usuarios FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Actualizar propio perfil"
ON usuarios FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Admins pueden ver todos los usuarios
CREATE POLICY "Admins ven todos los usuarios"
ON usuarios FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM usuarios u
    WHERE u.id = auth.uid()
    AND u.rol = 'admin'
  )
);

-- ============================================
-- RLS POLICIES - CONFIGURACION
-- ============================================
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Configuración es pública para lectura"
ON configuracion FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Solo admins modifican configuración"
ON configuracion FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.rol = 'admin'
  )
);
```

---

### **Fase 2: Preparación del Frontend Vue.js** (1 día)

#### 2.1 Instalar dependencias

```bash
# Eliminar Firebase
npm uninstall firebase

# Instalar Supabase
npm install @supabase/supabase-js
```

#### 2.2 Actualizar archivos de configuración

**`.env.local`**
```bash
# Eliminar Firebase
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...

# Agregar Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

#### 2.3 Crear cliente de Supabase

**`src/lib/supabase.js`** (nuevo archivo)
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper para Storage
export const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
```

---

### **Fase 3: Migración de Datos** (2-3 días)

#### 3.1 Script de exportación desde Firebase

**`scripts/export-firebase.js`**
```javascript
const admin = require('firebase-admin')
const fs = require('fs')

// Inicializar Firebase Admin
const serviceAccount = require('../firebase-admin-key.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-proyecto.firebaseio.com'
})

const db = admin.database()

async function exportData() {
  try {
    // Exportar proyectos
    const proyectosSnapshot = await db.ref('proyectos').once('value')
    const proyectos = proyectosSnapshot.val()
    fs.writeFileSync(
      'firebase-export/proyectos.json',
      JSON.stringify(proyectos, null, 2)
    )
    
    // Exportar cotizaciones
    const cotizacionesSnapshot = await db.ref('cotizaciones').once('value')
    const cotizaciones = cotizacionesSnapshot.val()
    fs.writeFileSync(
      'firebase-export/cotizaciones.json',
      JSON.stringify(cotizaciones, null, 2)
    )
    
    // Exportar usuarios
    const usuariosSnapshot = await db.ref('usuarios').once('value')
    const usuarios = usuariosSnapshot.val()
    fs.writeFileSync(
      'firebase-export/usuarios.json',
      JSON.stringify(usuarios, null, 2)
    )
    
    console.log('✅ Datos exportados exitosamente')
  } catch (error) {
    console.error('❌ Error exportando datos:', error)
  }
}

exportData()
```

#### 3.2 Script de importación a Supabase

**`scripts/import-supabase.js`**
```javascript
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ Service role key (backend only)
)

async function transformAndImport() {
  try {
    // Leer datos de Firebase
    const proyectosFirebase = JSON.parse(
      fs.readFileSync('firebase-export/proyectos.json', 'utf8')
    )
    
    // Transformar estructura Firebase → PostgreSQL
    const proyectosSupabase = Object.entries(proyectosFirebase).map(([key, proyecto]) => ({
      // Firebase usa push keys, nosotros generamos UUIDs
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      categoria_id: proyecto.categoriaId, // Ajustar según tu estructura
      imagenes: proyecto.imagenes || [],
      imagen_principal: proyecto.imagenPrincipal,
      precio_desde: proyecto.precioDesde,
      precio_hasta: proyecto.precioHasta,
      dimensiones: proyecto.dimensiones,
      materiales: proyecto.materiales || [],
      visible: proyecto.visible !== false,
      destacado: proyecto.destacado || false,
      created_at: proyecto.createdAt || new Date().toISOString()
    }))
    
    // Importar a Supabase
    const { data, error } = await supabase
      .from('proyectos')
      .insert(proyectosSupabase)
    
    if (error) throw error
    
    console.log(`✅ ${proyectosSupabase.length} proyectos importados`)
    
    // Repetir para cotizaciones, usuarios, etc...
    
  } catch (error) {
    console.error('❌ Error importando datos:', error)
  }
}

transformAndImport()
```

---

### **Fase 4: Migración de Autenticación** (2 días)

#### 4.1 Configurar Auth en Supabase UI
- [ ] Habilitar Email/Password
- [ ] Configurar plantillas de correo
- [ ] Configurar redirect URLs: `http://localhost:5173/auth/callback`, `https://artemodular.vercel.app/auth/callback`

#### 4.2 Actualizar composable de autenticación

**`src/composables/useAuth.js`**

**ANTES (Firebase):**
```javascript
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export function useAuth() {
  const user = ref(null)
  const auth = getAuth()
  
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
  }
  
  return { user, login }
}
```

**DESPUÉS (Supabase):**
```javascript
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(true)
  
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    user.value = data.user
    session.value = data.session
  }
  
  const register = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    if (error) throw error
    return data
  }
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    session.value = null
  }
  
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) throw error
  }
  
  // Escuchar cambios de autenticación
  onMounted(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session.value = session
      user.value = session?.user ?? null
      loading.value = false
    })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        session.value = session
        user.value = session?.user ?? null
      }
    )
    
    return () => subscription.unsubscribe()
  })
  
  return {
    user,
    session,
    loading,
    login,
    register,
    logout,
    resetPassword
  }
}
```

---

### **Fase 5: Actualizar Queries del Frontend** (3-4 días)

#### 5.1 Composable para Proyectos

**`src/composables/useProyectos.js`**

**ANTES (Firebase):**
```javascript
import { ref } from 'vue'
import { getDatabase, ref as dbRef, get, query, orderByChild } from 'firebase/database'

export function useProyectos() {
  const proyectos = ref([])
  const loading = ref(false)
  
  const fetchProyectos = async () => {
    loading.value = true
    const db = getDatabase()
    const proyectosRef = query(dbRef(db, 'proyectos'), orderByChild('createdAt'))
    const snapshot = await get(proyectosRef)
    proyectos.value = Object.entries(snapshot.val() || {}).map(([id, data]) => ({
      id,
      ...data
    }))
    loading.value = false
  }
  
  return { proyectos, loading, fetchProyectos }
}
```

**DESPUÉS (Supabase):**
```javascript
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useProyectos() {
  const proyectos = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchProyectos = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    try {
      let query = supabase
        .from('proyectos')
        .select(`
          *,
          categoria:categorias(id, nombre, slug)
        `)
        .eq('visible', true)
        .order('created_at', { ascending: false })
      
      // Filtros opcionales
      if (filters.categoria_id) {
        query = query.eq('categoria_id', filters.categoria_id)
      }
      
      if (filters.destacado) {
        query = query.eq('destacado', true)
      }
      
      if (filters.limit) {
        query = query.limit(filters.limit)
      }
      
      const { data, error: fetchError } = await query
      
      if (fetchError) throw fetchError
      
      proyectos.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching proyectos:', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchProyectoById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('proyectos')
        .select(`
          *,
          categoria:categorias(*)
        `)
        .eq('id', id)
        .single()
      
      if (fetchError) throw fetchError
      
      // Incrementar vistas
      await supabase.rpc('incrementar_vistas', { proyecto_id: id })
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    proyectos,
    loading,
    error,
    fetchProyectos,
    fetchProyectoById
  }
}
```

#### 5.2 Composable para Cotizaciones

**`src/composables/useCotizaciones.js`**
```javascript
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useCotizaciones() {
  const loading = ref(false)
  const error = ref(null)
  
  const crearCotizacion = async (formData) => {
    loading.value = true
    error.value = null
    
    try {
      // Subir imágenes primero (si existen)
      let imagenesUrls = []
      if (formData.imagenes_referencia?.length > 0) {
        imagenesUrls = await uploadImagenes(formData.imagenes_referencia)
      }
      
      const { data, error: insertError } = await supabase
        .from('cotizaciones')
        .insert({
          nombre_cliente: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          tipo_proyecto: formData.tipoProyecto,
          descripcion: formData.descripcion,
          dimensiones_aproximadas: formData.dimensiones,
          presupuesto_estimado: formData.presupuesto,
          urgencia: formData.urgencia,
          imagenes_referencia: imagenesUrls,
          notas_cliente: formData.notas
        })
        .select()
        .single()
      
      if (insertError) throw insertError
      
      // Enviar notificación por email (función del backend)
      await fetch(`${import.meta.env.VITE_API_URL}/api/notificaciones/nueva-cotizacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cotizacion_id: data.id })
      })
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const uploadImagenes = async (files) => {
    const urls = []
    
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('cotizaciones-archivos')
        .upload(fileName, file)
      
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage
        .from('cotizaciones-archivos')
        .getPublicUrl(fileName)
      
      urls.push(publicUrl)
    }
    
    return urls
  }
  
  const misCotizaciones = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No autenticado')
    
    const { data, error: fetchError } = await supabase
      .from('cotizaciones')
      .select('*')
      .eq('usuario_id', user.id)
      .order('created_at', { ascending: false })
    
    if (fetchError) throw fetchError
    return data
  }
  
  return {
    loading,
    error,
    crearCotizacion,
    misCotizaciones
  }
}
```

---

### **Fase 6: Actualizar Backend Node.js** (2 días)

#### 6.1 Actualizar dependencias

```bash
cd backend
npm uninstall firebase-admin
npm install @supabase/supabase-js
```

#### 6.2 Configurar Supabase en el backend

**`backend/.env`**
```bash
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

**`backend/src/config/supabase.js`**
```javascript
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = { supabase }
```

#### 6.3 Middleware de autenticación

**`backend/src/middleware/auth.js`**
```javascript
const { supabase } = require('../config/supabase')

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' })
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return res.status(401).json({ error: 'Token inválido' })
    }
    
    // Obtener perfil completo del usuario
    const { data: perfil } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single()
    
    req.user = { ...user, perfil }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Error de autenticación' })
  }
}

async function requireAdmin(req, res, next) {
  await requireAuth(req, res, () => {
    if (req.user.perfil?.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' })
    }
    next()
  })
}

module.exports = { requireAuth, requireAdmin }
```

#### 6.4 Ejemplo de endpoint actualizado

**`backend/src/routes/cotizaciones.js`**
```javascript
const express = require('express')
const router = express.Router()
const { supabase } = require('../config/supabase')
const { requireAdmin } = require('../middleware/auth')

// Listar cotizaciones (admin)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { estado, page = 1, limit = 20 } = req.query
    
    let query = supabase
      .from('cotizaciones')
      .select('*, usuario:usuarios(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (estado) {
      query = query.eq('estado', estado)
    }
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    res.json({
      cotizaciones: data,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Actualizar estado de cotización
router.patch('/:id/estado', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { estado, notas_admin, precio_cotizado } = req.body
    
    const { data, error } = await supabase
      .from('cotizaciones')
      .update({