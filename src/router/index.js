import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: Home,
    beforeEnter: (to, from, next) => {
      // Scroll a la sección de contacto después de que se monte
      nextTick(() => {
        const contactSection = document.getElementById('contacto')
        if (contactSection) {
          const headerHeight = 80 // Ajusta según tu header
          const elementPosition = contactSection.offsetTop - headerHeight
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      })
      next()
    }
  },
  {
    path: '/servicios',
    name: 'Services',
    component: Home,
    beforeEnter: (to, from, next) => {
      nextTick(() => {
        const servicesSection = document.getElementById('servicios')
        if (servicesSection) {
          const headerHeight = 80
          const elementPosition = servicesSection.offsetTop - headerHeight
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      })
      next()
    }
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

export default router
