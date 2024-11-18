<script setup>
import { supabase } from '@/supabase'
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const login = useLoginStore()
const { handleAuthenticated } = login
const { isAuthenticated } = storeToRefs(login)

onMounted(async () => {
  await handleAuthenticated()
})

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error logging out:', error.message)
    return
  }
  router.push({ name: 'login' })
}
</script>
<template>
  <nav class="nav--session">
    <div></div>
    <template v-if="isAuthenticated">
      <button class="btn--logout" @click="logout">
        <span>Cerrar sesión</span>
        <img class="profile" src="/src/assets/jovanna.webp" alt="jovanna-profile" />
      </button>
    </template>
    <template v-else>
      <RouterLink to="/login"><span>Inicio de sesión</span></RouterLink>
    </template>
  </nav>
</template>

<style scoped>
.profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
a {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}
.nav--session {
  grid-area: 'navsession';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 0.5rem;
  background-color: #202124;
}
.btn--logout {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  span {
    color: #fff;
    font-size: 0.875rem;
  }
}
</style>
