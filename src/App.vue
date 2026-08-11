<template>
  <div id="app">
    <div v-if="store.loading" class="global-loading">
      <div class="loading-spinner"></div>
      <p>Connecting to database...</p>
    </div>
    <div v-else-if="store.error" class="global-error">
      <p>Failed to connect: {{ store.error }}</p>
      <button @click="retry">Retry</button>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { useStore } from '@/composables/useStore'

export default {
  name: 'App',
  setup() {
    const { store, initialize } = useStore()
    return { store, initialize }
  },
  async created() {
    await this.initialize()
  },
  methods: {
    async retry() {
      await this.initialize()
    }
  }
}
</script>

<style>
.global-loading,
.global-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
  font-family: sans-serif;
  color: #555;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #2B4896;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.global-error button {
  padding: 0.5rem 1.5rem;
  background: #2B4896;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
