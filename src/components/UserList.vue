<script setup>
import IconCopy from './icons/IconCopy.vue'
import IconUser from './icons/IconUser.vue'

defineProps({
  users: {
    type: Array,
    required: true
  }
})

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('RFC copiado al portapapeles')
    })
    .catch((err) => {
      console.error('Error al copiar el RFC: ', err)
    })
}
</script>

<template>
  <div>
    <ul class="users">
      <li class="user" v-for="user in users" :key="user.id">
        <IconUser />
        <div class="user--info">
          {{ user.name }}
          <div class="buttons">
            <button class="button--clipboard" @click="copyToClipboard(user.rfc)">
              <IconCopy /> RFC
            </button>
            <button class="button--clipboard" @click="copyToClipboard(user.pass)">
              <IconCopy /> Contraseña
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 560px;
  width: 100%;
  margin: 2rem auto 3rem;
}
.user {
  display: flex;
  gap: 1.6rem;
  align-items: center;

  background-color: #171f26;
  padding: 0.8rem 1rem;
  border-radius: 1em;

  &:hover {
    background-color: #087fc40e;
  }
}
.user--info {
  display: flex;
  flex-direction: column;
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
  background-color: #087ec4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5em;
  cursor: pointer;
}
</style>
