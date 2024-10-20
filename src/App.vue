<script setup>
import { supabase } from '@/supabase'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import router from './router'
import { onMounted } from 'vue'
import NavSession from './components/NavSession.vue'

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      router.push({ name: 'login' })
    }
  })
})
</script>

<template>
  <NavBar />
  <main>
    <NavSession />
    <div class="main">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.main {
  grid-area: main;
  padding: 20px;
  overflow-y: auto;
}
</style>
