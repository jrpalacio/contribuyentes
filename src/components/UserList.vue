<script setup>
import VToaster from './VToaster.vue'
import IconCopy from './icons/IconCopy.vue'
import IconChevronr from '@/icons/IconChevronr.vue'
import { useToasterStore } from '@/stores/toaster'
import { TIPO_CONTRIBUYENTE } from '@/constants/SAT'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { useRouter } from 'vue-router'
import ItemCard from './ItemCard.vue'

const router = useRouter()

const contribuyente = useContribuyenteStore()
const { regimenNumberStringToText } = contribuyente
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

function goToPage(id) {
  router.push({ name: 'user-detail', params: { id } })
}
</script>

<template>
  <div>
    <header class="list--header">
      <h2>Mis contribuyentes</h2>
      <slot name="button"></slot>
    </header>
    <hr />
    <template v-if="users.length === 0">
      <h3>No hay contribuyentes registrados</h3>
    </template>

    <article v-else>
      <ul class="card-list">
        <ItemCard
          v-for="user in users"
          :key="user.id"
          :titulo="user.contribuyente"
          :tipo="TIPO_CONTRIBUYENTE[user.tipo]"
          :descripcion="regimenNumberStringToText({ numbreString: user.regimenes[0] })"
        >
          <template #action-buttons>
            <button class="btn" @click="copyToClipboard({ text: user.rfc, msg: 'RFC copiado' })">
              <IconCopy /> <span>RFC</span>
            </button>
            <button
              class="btn"
              @click="copyToClipboard({ text: user.clave, msg: 'Clave copiada' })"
            >
              <IconCopy /> <span>Clave</span>
            </button>
            <button class="btn" @click="goToPage(user.id)">Ver más</button>
          </template>
        </ItemCard>
      </ul>
    </article>
  </div>
  <VToaster />
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
  border: none;

  border-radius: 0.8em;
  cursor: pointer;

  padding: 0.2rem 0.6rem;

  &:hover {
    background-color: #087ec4;
  }
}

/* old version */

h2 {
  font-weight: 500;
  font-size: 1.3rem;
  letter-spacing: 0.013rem;
  color: #88e557;
}

hr {
  margin: 0.5rem 0;
  padding: 0;
  border: 0;
  height: 1px;
  background-color: #2d323a;
  width: 100%;
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

.btn--go {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #087ec4;
  }
}
</style>
