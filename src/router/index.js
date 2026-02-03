import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Homeview.vue'
import Dashboard from '../views/DashboardView.vue'
import AdminPanel from '../views/AdminPanel.vue'
//import AuthCallback from '../views/AuthCallback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/servicios',
    name: 'Services',
    component: Home,
    meta: { scrollTo: 'servicios' }
  },
  {
    path: '/proceso',
    name: 'Proceso',
    component: Home,
    meta: { scrollTo: 'proceso' }
  },
  {
    path: '/testimonios',
    name: 'Testimonios',
    component: Home,
    meta: { scrollTo: 'testimonios' }
  },
  {
    path: '/galeria',
    name: 'Galeria',
    component: Home,
    meta: { scrollTo: 'galeria' }
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: Home,
    meta: { scrollTo: 'contacto' }
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
    // No requiere autenticación de Google, el control es por IP en el backend
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si hay un hash en la URL, scroll a esa sección
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset para header fijo
      }
    }
    
    // Si es la misma ruta con hash diferente, scroll suave
    if (to.path === from.path && to.hash !== from.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    
    // Para navegación normal, ir al top
    return { top: 0 }
  }
})

// Navigation guards - Sin autenticación, todas las rutas son accesibles
// El control de acceso para /admin se maneja por IP en el backend
router.beforeEach((to, from, next) => {
  // Permitir acceso a todas las rutas sin verificación de autenticación
  next()
})

export default router
