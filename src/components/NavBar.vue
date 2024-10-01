<script setup>
import { RouterLink } from 'vue-router'
import IconUsers from '@/icons/IconUsers.vue'
import IconSettings from '@/icons/IconSettings.vue'
</script>

<template>
  <nav class="navbar">
    <ul class="links">
      <li class="link">
        <RouterLink to="/"><IconUsers /><span>Contribuyentes</span></RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/about"><IconSettings /><span>Configuración</span></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

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

.navbar {
  grid-area: navbar;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: hsla(210, 6%, 31%, 0.2);

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
}

.links {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}

.link {
  a {
    display: flex;
    gap: 0.8rem;
    padding: 1rem;
  }
}

@media (width <= 425px) {
  .link span {
    display: none;
  }
}

@media (width >= 1024px) {
  .navbar {
    grid-area: navbar;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;

    position: relative;
  }
  .links {
    flex-direction: column;
    width: 100%;
  }
  .link {
    a {
      padding: 0.56rem 1rem;
    }
  }
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
