<script setup>
import { supabase } from '@/supabase'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import router from './router'
import { onMounted } from 'vue'

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
  <main class="main"><RouterView /></main>
</template>

<style scoped>
.main {
  grid-area: main;
  padding: 20px;
  overflow-y: auto;
}
</style>
