import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import Home from '../views/Homeview.vue'
import Dashboard from '../views/DashboardView.vue'
import AdminPanel from '../views/AdminPanel.vue'
import AuthCallback from '../views/AuthCallback.vue'
import { useAuthStore } from '../stores/authStore'

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
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
    // No requiere autenticación de Google, el control es por IP en el backend
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback
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

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
    return
  }
  
  // La ruta /admin ya no requiere autenticación de Google
  // El control de acceso se maneja por IP en el backend
  
  next()
})

export default router
