<script setup>
import { supabase } from '@/supabase'
import { onMounted } from 'vue'
import IconLogin from '@/icons/IconLogin.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'
import IconLogout from '@/icons/IconLogout.vue'

const login = useLoginStore()
const { handleAuthenticated } = login
const { isAuthenticated } = storeToRefs(login)

onMounted(async () => {
  await handleAuthenticated()
})

async function logout() {
  const { error } = await supabase.auth.signOut()
  console.error(error)
  localStorage.removeItem('supabase.auth.token')
  router.push({ name: 'login' })
}
</script>
<template>
  <nav class="nav--session">
    <h3>Contadora Bernal</h3>
    <template v-if="isAuthenticated">
      <button class="btn--logout" @click="logout"><span>Cerrar sesión</span><IconLogout /></button>
    </template>
    <template v-else>
      <RouterLink to="/login"><span>Inicio de sesión</span> <IconLogin /></RouterLink>
    </template>
  </nav>
</template>

<style scoped>
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
  padding: 0.75rem 1rem;
  background-color: #242424;
}
.btn--logout {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
}
</style>
