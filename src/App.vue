<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IconUsers from './icons/IconUsers.vue'
import IconSettings from './icons/IconSettings.vue'
</script>

<template>
  <nav class="sidebar">
    <ul>
      <li>
        <RouterLink to="/"><IconUsers /><span>Contribuyentes</span></RouterLink>
      </li>
      <li>
        <RouterLink to="/about"><IconSettings /><span>Configuración</span></RouterLink>
      </li>
    </ul>
  </nav>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  /* padding: 0 1rem; */
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
