<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import NavigationBar from './components/bars/NavigationBar.vue'
import SessionBar from './components/bars/SessionBar.vue'
import { supabase } from './supabase'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (!session) {
      router.push({ name: 'login' })
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
      <SessionBar />
      <NavigationBar />
      <main class="main">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" :key="$route.path" />
          </transition>
        </router-view>
      </main>
    </div>
  </template>
  <template v-else>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </template>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3.625rem 1fr 3rem;
  grid-template-areas:
    'navsession'
    'main'
    'navbar';
  height: 100%;
}

.main {
  grid-area: main;
  padding: 1rem 8rem;
  overflow-y: auto;
}

@media (width<= 1024px) {
  .main {
    height: calc(100vh - 114px);
    padding: 0 0.75rem;
  }
}

@media (width >= 1024px) {
  .container {
    grid-template-columns: 320px 1fr;
    grid-template-rows: 3.625rem 1fr;

    grid-template-areas:
      'navbar navsession'
      'navbar main';
  }
}
</style>
