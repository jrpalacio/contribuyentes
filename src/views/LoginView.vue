<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase'
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'

const login = useLoginStore()
const { isAuthenticated } = storeToRefs(login)
const { handleAuthenticated } = login

const user = useUserStore()
const { setResAuth } = user

const email = ref('')
const password = ref('')

onMounted(async () => {
  await handleAuthenticated()
  if (isAuthenticated) router.push({ name: 'users' })
})

async function handleSubmit() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) throw error

  setResAuth({ response: data })
  const token = data.session.access_token
  localStorage.setItem('supabase.auth.token', token)
  router.push({ name: 'users' })
}
</script>

<template>
  <article class="content--login">
    <form class="form--login" @submit.prevent="handleSubmit">
      <label>
        Correo electrónico
        <input type="email" v-model="email" />
      </label>
      <label>
        Contraseña
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Iniciar sesión</button>
    </form>
  </article>
</template>

<style scoped>
label {
  display: inline-flex;
  flex-direction: column;
  gap: 0.2rem;
}

input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #404650;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  font-size: 1rem;
  height: 56px;
  padding: 6px 12px 6px 16px;
  width: 100%;
}

button {
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 0.5rem;
  color: #13161c;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.0063rem;
  line-height: 1.5rem;
  padding: 0.75rem 1rem;
}

.content--login {
  display: flex;
  width: 100%;
  height: 70dvh;
  max-width: 400px;
  margin: 0 auto;
  align-items: center;
}

.form--login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
</style>
