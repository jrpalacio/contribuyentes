<script setup>
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase'
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { validateLogin } from '@/utils/validations'
import { ValidationError } from '@/utils/errors'

const login = useLoginStore()
const { isAuthenticated } = storeToRefs(login)
const { handleAuthenticated } = login

const user = useUserStore()
const { setResAuth } = user

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const authError = ref('')
onMounted(async () => {
  await handleAuthenticated()
  if (isAuthenticated.value) router.push({ name: 'users' })
})

async function handleSubmit() {
  emailError.value = ''
  passwordError.value = ''
  authError.value = ''
  try {
    validateLogin({ email: email.value, password: password.value })
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw new ValidationError(error.message)

    setResAuth({ response: data })
    const token = data.session.access_token
    localStorage.setItem('supabase.auth.token', token)
    router.push({ name: 'users' })
  } catch (error) {
    if (error instanceof ValidationError) {
      const handleMessageError = {
        'El correo electrónico es requerido': () => (emailError.value = error.message),
        'La contraseña es requerida': () => (passwordError.value = error.message),
        'Invalid login credentials': () => (authError.value = 'Credenciales inválidas')
      }
      handleMessageError[error.message]()
    } else {
      console.error(error.message)
    }
  }
}
</script>

<template>
  <article class="content--login">
    <header>
      <h1>👩🏽‍💼 Contadora Bernal</h1>
      <h3>Inicia sesión y captura información de tus contribuyentes.</h3>
    </header>
    <form class="form--login" @submit.prevent="handleSubmit">
      <label>
        Correo electrónico
        <input type="email" v-model="email" :class="{ 'input-error': emailError }" />
        <span class="error">{{ emailError }}</span>
      </label>

      <label>
        Contraseña
        <input type="password" v-model="password" :class="{ 'input-error': passwordError }" />
        <span class="error">{{ passwordError }}</span>
      </label>
      <p class="error">{{ authError }}</p>
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

.input-error {
  border-color: red;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 416px;
}

.form--login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>
