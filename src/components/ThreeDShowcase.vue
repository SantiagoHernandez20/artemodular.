<template>
  <div class="showcase-container">
    <!-- Header de la comparación -->
    <div class="showcase-header">
      <div class="showcase-title">
        <svg style="width: 1.5rem; height: 1.5rem; color: #8D5524;" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        <h3 style="color: #8D5524; font-size: 1.125rem; font-weight: 600;">Del Diseño 3D a la Realidad</h3>
      </div>
      <p style="color: #6B7280; font-size: 0.875rem; margin-top: 0.5rem;">
        Utilizamos tecnología de modelado 3D para visualizar tu proyecto antes de fabricarlo
      </p>
    </div>

    <!-- Comparación principal -->
    <ImageComparison 
      :width="'100%'"
      :height="'350px'"
      :design-type="'kitchen'"
    />

    <!-- Features del proceso 3D -->
    <div class="process-features">
      <div class="feature-item">
        <div class="feature-icon">
          <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
        </div>
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; color: #111827;">Visualización Previa</h4>
          <p style="font-size: 0.75rem; color: #6B7280;">Ve tu mueble antes de fabricarlo</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">
          <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; color: #111827;">Ajustes Precisos</h4>
          <p style="font-size: 0.75rem; color: #6B7280;">Modificaciones antes de fabricar</p>
        </div>
      </div>

      <div class="feature-item">
        <div class="feature-icon">
          <svg style="width: 1.25rem; height: 1.25rem;" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <h4 style="font-size: 0.875rem; font-weight: 600; color: #111827;">Resultado Garantizado</h4>
          <p style="font-size: 0.75rem; color: #6B7280;">Exactamente como lo diseñamos</p>
        </div>
      </div>
    </div>

    <!-- Stats del proceso -->
    <div class="process-stats">
      <div class="stat-item">
        <div style="font-size: 1.5rem; font-weight: 700; color: #8D5524;">98%</div>
        <div style="font-size: 0.75rem; color: #6B7280;">Precisión en medidas</div>
      </div>
      <div class="stat-item">
        <div style="font-size: 1.5rem; font-weight: 700; color: #8D5524;">0</div>
        <div style="font-size: 0.75rem; color: #6B7280;">Errores de diseño</div>
      </div>
      <div class="stat-item">
        <div style="font-size: 1.5rem; font-weight: 700; color: #8D5524;">100%</div>
        <div style="font-size: 0.75rem; color: #6B7280;">Satisfacción cliente</div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComparison from './ImageComparison.vue'

export default {
  name: 'ThreeDShowcase',
  components: {
    ImageComparison
  }
}
</script>

<style scoped>
.showcase-container {
  background: linear-gradient(135deg, #F5E9DA 0%, #FFFFFF 100%);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.showcase-header {
  text-align: center;
  margin-bottom: 2rem;
}

.showcase-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.process-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #8D5524, #6B3F1A);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.process-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(141, 85, 36, 0.1);
  border-radius: 0.75rem;
}

.stat-item {
  text-align: center;
}

@media (max-width: 768px) {
  .showcase-container {
    padding: 1.5rem;
  }
  
  .process-features {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .process-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>