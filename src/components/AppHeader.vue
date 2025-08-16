<template>
  <header style="background-color: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); position: sticky; top: 0; z-index: 50;">
    <nav class="container-custom">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
        <!-- Logo -->
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div style="width: 2.5rem; height: 2.5rem; background-color: #8D5524; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
            <svg style="width: 1.5rem; height: 1.5rem; color: white;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
            </svg>
          </div>
          <div>
            <h1 style="font-size: 1.25rem; font-weight: 700; color: #111827;">ArteModular</h1>
            <p style="font-size: 0.875rem; color: #4b5563;">Carpintería a medida</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="md:flex" style="display: none; align-items: center; gap: 2rem;">
          <a href="#inicio" style="color: #374151; font-weight: 500; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#8D5524'" onmouseout="this.style.color='#374151'">Inicio</a>
          <a href="#servicios" style="color: #374151; font-weight: 500; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#8D5524'" onmouseout="this.style.color='#374151'">Servicios</a>
          <a href="#proceso" style="color: #374151; font-weight: 500; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#8D5524'" onmouseout="this.style.color='#374151'">Proceso</a>
          <a href="#testimonios" style="color: #374151; font-weight: 500; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#8D5524'" onmouseout="this.style.color='#374151'">Testimonios</a>
          <a href="#galeria" style="color: #374151; font-weight: 500; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='#8D5524'" onmouseout="this.style.color='#374151'">Galería</a>
          <a href="#contacto" class="btn-primary">Solicitar Presupuesto</a>
        </div>

        <!-- Mobile menu button -->
        <div style="display: block;" class="md:hidden">
          <button 
            @click="toggleMenu" 
            style="color: #374151; background: none; border: none; cursor: pointer;"
          >
            <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" style="border-top: 1px solid #e5e7eb;">
        <div style="padding: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
          <a href="#inicio" @click="closeMenu" style="color: #374151; font-weight: 500; text-decoration: none;">Inicio</a>
          <a href="#servicios" @click="closeMenu" style="color: #374151; font-weight: 500; text-decoration: none;">Servicios</a>
          <a href="#proceso" @click="closeMenu" style="color: #374151; font-weight: 500; text-decoration: none;">Proceso</a>
          <a href="#testimonios" @click="closeMenu" style="color: #374151; font-weight: 500; text-decoration: none;">Testimonios</a>
          <a href="#galeria" @click="closeMenu" style="color: #374151; font-weight: 500; text-decoration: none;">Galería</a>
          <a href="#contacto" @click="closeMenu" class="btn-primary" style="display: inline-block; width: fit-content;">Solicitar Presupuesto</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu
    }
  }
}
</script>
