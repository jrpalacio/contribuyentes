<script setup>
import { supabase } from '@/supabase'
import { onMounted } from 'vue'
import IconLogin from '@/icons/IconLogin.vue'
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
      <button @click="logout">Cerrar sesión</button>
    </template>
    <template v-else>
      <RouterLink to="/login"><IconLogin /><span>Inicio de sesión</span></RouterLink>
    </template>
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
