<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import router from './router'
import { ref, onMounted } from 'vue'
import NavSession from './components/NavSession.vue'
import { supabase } from './supabase'

const isAuthenticated = ref(false)

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (!session) {
      await router.push({ name: 'login' })
      isAuthenticated.value = false
    } else {
      isAuthenticated.value = true
    }
  })
})
</script>

<template>
  <template v-if="isAuthenticated">
    <div class="container">
      <NavBar />
      <main>
        <NavSession />
        <div class="main">
          <RouterView />
        </div>
      </main>
    </div>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 48px;
  grid-template-areas:
    'main'
    'navbar';
  overflow-y: auto;
}

.main {
  grid-area: main;
  padding: 1rem;
  overflow-y: auto;
}

@media (width<= 1024px) {
  .main {
    height: calc(100vh - 108px);
  }
}

@media (width >= 1024px) {
  .container {
    grid-template-columns: 320px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'navbar main';
  }
  .main {
    height: calc(100vh - 52.08px);
  }
}
</style>
