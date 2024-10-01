<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBar />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  grid-area: main;
  padding: 20px;
}
</style>
