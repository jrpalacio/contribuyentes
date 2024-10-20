<script setup>
import IconLogin from '@/icons/IconLogin.vue'
</script>
<template>
  <nav class="nav--session">
    <h3>Contadora Bernal</h3>
    <RouterLink to="/login"><IconLogin /><span>Inicia sesión</span></RouterLink>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.nav--session {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #242424;
}
</style>
