<script setup>
import VToaster from './VToaster.vue'

import { useToasterStore } from '@/stores/toaster'
import { TIPO_CONTRIBUYENTE } from '@/constants/SAT'
import { useContribuyenteStore } from '@/stores/contribuyente'

import ContribuyenteCard from './ContribuyenteCard.vue'

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
        <ContribuyenteCard
          v-for="user in users"
          :key="user.id"
          :id="user.id"
          :titulo="user.contribuyente"
          :tipo="TIPO_CONTRIBUYENTE[user.tipo]"
          :descripcion="regimenNumberStringToText({ numbreString: user.regimenes[0] })"
        >
          <template #action-buttons>
            <button
              class="btn--copiar"
              @click="copyToClipboard({ text: user.rfc, msg: 'RFC copiado' })"
            >
              <span># RFC</span>
            </button>
            <button
              class="btn--copiar"
              @click="copyToClipboard({ text: user.clave, msg: 'Clave copiada' })"
            >
              <span># Contraseña</span>
            </button>
          </template>
        </ContribuyenteCard>
      </ul>
    </article>
  </div>
  <VToaster />
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

h2 {
  font-weight: 500;
  font-size: 1.4rem;
  letter-spacing: 0.013rem;
  color: #009a93;
}

hr {
  margin: 0.5rem 0;
  padding: 0;
  border: 0;
  height: 1px;
  background-color: #2d323a;
  width: 100%;
}

.btn--copiar {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  :hover {
    color: #fffb12;
  }
}
</style>
