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
const types = ['password', 'text']
const msgShowPwd = ['Mostrar contraseña', 'Ocultar contraseña']
const inputType = ref(types[0])
const showPwd = ref(msgShowPwd[0])
onMounted(async () => {
  await handleAuthenticated()
  if (isAuthenticated.value) router.push({ name: 'users' })
})

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
  <article class="login">
    <form class="form--login" @submit.prevent="handleSubmit">
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
      <p style="text-align: center">
        <small>caballero-ux.dev</small>
      </p>
    </form>
  </article>
</template>

<style scoped>
.login {
  display: grid;
  place-items: center;
  height: 100dvh;
  padding: 0.64rem;
  background-size: 100% 100%;
  background-position:
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px;
  background-image: repeating-linear-gradient(315deg, #00ffff2e 92%, #073aff00 100%),
    repeating-radial-gradient(75% 75% at 238% 218%, #00ffff12 30%, #073aff14 39%),
    radial-gradient(99% 99% at 109% 2%, #00c9ffff 0%, #073aff00 100%),
    radial-gradient(99% 99% at 21% 78%, #7b00ffff 0%, #073aff00 100%),
    radial-gradient(160% 154% at 711px -303px, #2000ffff 0%, #073affff 100%);
}

.form--login {
  display: flex;
  flex-direction: column;

  gap: 1rem;
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
  border-color: red;
}

.error {
  color: red;
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
</style>
