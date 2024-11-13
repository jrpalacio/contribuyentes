<script setup>
import { supabase } from '@/supabase'
import { onMounted } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'

const login = useLoginStore()
const { handleAuthenticated } = login
const { isAuthenticated } = storeToRefs(login)

onMounted(async () => {
  await handleAuthenticated()
})

async function logout() {
  await supabase.auth.signOut()

  await router.push({ name: 'login' })
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
.title {
  color: #ff1a7a;
}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 0.5rem;
  background-color: #13161c;
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
    color: #ff1a7974;
    font-size: 0.875rem;
  }
}
</style>
