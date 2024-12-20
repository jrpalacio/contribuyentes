<script setup>
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase'
import { ref } from 'vue'

import { validateLogin } from '@/utils/validations'
import { ValidationError } from '@/utils/errors'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = useUserStore()
const { setResAuth } = user

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const authError = ref('')
const types = ['password', 'text']
const msgShowPwd = ['Mostrar contraseña', 'Ocultar contraseña']
const inputType = ref(types[0])
const showPwd = ref(msgShowPwd[0])

function handleInputType() {
  inputType.value = inputType.value === types[0] ? types[1] : types[0]
  showPwd.value = showPwd.value === msgShowPwd[0] ? msgShowPwd[1] : msgShowPwd[0]
}

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
  <main class="login">
    <form class="login__form" @submit.prevent="handleSubmit">
      <div class="logo">
        <img src="/src/assets/logo.svg" alt="" />
      </div>
      <label>
        Correo electrónico
        <input type="email" v-model="email" :class="{ 'input-error': emailError }" />
        <span class="error">{{ emailError }}</span>
      </label>

      <label>
        <div class="show--pwd">
          <span>Contraseña</span>
          <button class="btn--show-pass" type="button" @click="handleInputType">
            {{ showPwd }}
          </button>
        </div>
        <input :type="inputType" v-model="password" :class="{ 'input-error': passwordError }" />

        <span class="error">{{ passwordError }}</span>
      </label>
      <p class="error">{{ authError }}</p>
      <button class="button" type="submit">Iniciar sesión</button>
    </form>
    <footer class="footer">
      <div class="footer__content">
        <ul>
          <!-- abrir en nueva ventana -->
          <li><strong>Social</strong></li>
          <li>
            <a
              href="https://www.linkedin.com/in/jrpalaciodev/"
              target="_blank"
              rel="noopener noreferrer"
              >Linkedin</a
            >
          </li>
          <li>
            <a href="https://platzi.com/p/jrpalacio/" target="_blank" rel="noopener noreferrer"
              >Platzi</a
            >
          </li>
        </ul>
      </div>
      <div class="footer__create">
        <p><small>Creado con amor & moviendo las manitas</small></p>
        <p><strong>jrpalacio.dev</strong></p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.logo {
  background-color: rgb(255, 243, 18);
  height: 12rem;
  width: 12rem;
  padding: 1rem;
  margin-inline: auto;
  border-radius: 15rem;
  display: grid;
  place-items: center;
  & img {
    height: 8rem;
  }
}
.login {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.15fr;
  grid-template-areas: 'container--login' 'container--footer';
  height: 100dvh;
}

.login__form {
  grid-area: container--login;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-inline: auto;
  gap: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 416px;
}
.show--pwd {
  display: flex;
  justify-content: space-between;
}
.btn--show-pass {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
}
label {
  display: inline-flex;
  flex-direction: column;
  gap: 0.2rem;
}

.input-error {
  border-color: rgb(255, 243, 18);
}

.error {
  color: rgb(255, 243, 18);
  font-size: 0.875rem;
}

.button {
  align-items: center;
  background-color: #242424;
  border: none;
  border-radius: 0.5rem;
  color: #ffffff;
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

.footer {
  grid-area: container--footer;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'container--footer' 'container--create';
  background-color: rgb(255, 243, 18);
  padding: 1.8rem 1rem 1rem;
  color: #242424;
  font-weight: 600;
}

.footer__content {
  grid-area: 'container--footer';
  display: flex;
  justify-content: center;
  max-width: 1024px;
  margin-inline: auto;
  width: 100%;

  ul {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
  }
  a {
    color: #242424;
  }
}
.footer__create {
  grid-area: 'container--create';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #242424;
  font-weight: 600;
  font-size: 0.775rem;
  text-align: center;
}
</style>
