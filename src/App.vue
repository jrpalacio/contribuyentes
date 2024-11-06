<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
import router from './router'
import { watchEffect } from 'vue'
import NavSession from './components/NavSession.vue'
import { useLoginStore } from './stores/login'
import { storeToRefs } from 'pinia'

const login = useLoginStore()
const { handleAuthenticated } = login
const { isAuthenticated } = storeToRefs(login)

watchEffect(async () => {
  await handleAuthenticated()
  if (isAuthenticated) {
    router.push({ name: 'users' })
  } else {
    router.push({ name: 'login' })
  }
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
    <div class="container__login">
      <RouterView />
    </div>
  </template>
</template>

<style scoped>
.container__login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.8rem;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 48px;

  grid-template-areas:
    'main'
    'navbar';
}
.main {
  grid-area: main;
  padding: 0.6rem;
  overflow-y: auto;
}

@media (width <= 1024px) {
  .main {
    height: calc(100vh - 108.08px);
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
