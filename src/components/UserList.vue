<script setup>
import VToaster from './VToaster.vue'
import IconCopy from './icons/IconCopy.vue'
import IconUser from './icons/IconUser.vue'
import { useToasterStore } from '@/stores/toaster'

const toaster = useToasterStore()
const { showToast } = toaster
defineProps({
  users: {
    type: Array,
    required: true
  }
})

const copyToClipboard = ({ text, msg }) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast({ msg, toastType: 'success' })
    })
    .catch((err) => {
      console.error('Error al copiar el RFC: ', err)
    })
}
</script>

<template>
  <div>
    <div class="list--header">
      <h2>Contribuyentes</h2>
      <slot name="button"></slot>
    </div>
    <hr />
    <ul class="users">
      <li class="user" v-for="user in users" :key="user.id">
        <IconUser />
        <div class="user--info">
          <div>
            <h3>
              {{ user.name }}
            </h3>
            <p class="info--type">Persona fisica</p>
            <p>
              Régimen de Actividades Empresariales con ingresos a través de Plataformas Tecnológicas
            </p>
          </div>
          <div class="buttons">
            <button
              class="button--clipboard"
              @click="copyToClipboard({ text: user.rfc, msg: 'RFC copiado' })"
            >
              <IconCopy /> RFC
            </button>
            <button
              class="button--clipboard"
              @click="copyToClipboard({ text: user.pass, msg: 'Contraseña copiada' })"
            >
              <IconCopy /> Contraseña
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <VToaster />
</template>

<style scoped>
h3 {
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.013rem;
}

hr {
  margin: 0;
  padding: 0;
  border: 0;
  height: 1px;
  background-color: #2d323a;
  width: 100%;
}

.users {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  margin: 2rem 0;
}
.user {
  display: flex;
  gap: 1.6rem;
  align-items: center;

  background-color: #171f26;
  padding: 0.8rem 1rem;
  border-radius: 1.1rem;

  &:hover {
    background-color: #087fc40e;
  }
}
.user--info {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.buttons {
  display: flex;
  gap: 0.5rem;
}
.button--clipboard {
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 0.5rem;
  background-color: transparent;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.5em;
  cursor: pointer;

  &:hover {
    background-color: #087ec4;
  }
}
.list--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.info--type {
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.019rem;
  font-style: italic;
  color: #6c757d;
}

@media (width <= 768px) {
  .user--info {
    flex-direction: column;
    align-items: start;
  }
  .buttons {
    margin-top: 1rem;
  }
}
</style>
