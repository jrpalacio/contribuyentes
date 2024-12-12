<script setup>
import { RouterLink } from 'vue-router'
import IconUsers from '@/icons/IconUsers.vue'
import IconUserPlus from '@/icons/IconUserPlus.vue'
</script>

<template>
  <nav class="navbar">
    <!--     <figure class="logo">
      <img src="/src/assets/logo.svg" alt="logo del sitio" />
    </figure> -->
    <ul class="links">
      <li class="link">
        <RouterLink to="/"><IconUsers /><span>Contribuyentes</span></RouterLink>
      </li>
      <li class="link">
        <RouterLink to="/create-user"><IconUserPlus /><span>Nuevo contribuyente</span></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.logo {
  display: grid;
  place-items: center;
  padding: 1rem;
  width: 100%;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
  transition: 0.4s;
  padding: 3px;
  display: grid;
  place-items: center;
}

nav {
  width: 100%;
}

nav a.router-link-exact-active {
  color: #00d0ff;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  /* padding: 0 1rem; */
  border-left: 1px solid blue;
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

  /* background-color: #2d2f31; */
  background-color: #202124;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  border-right: 1px solid #333;
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
  .links {
    gap: 1rem;
  }
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

@media (width <= 1024px) {
  .logo {
    display: none;
  }
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
