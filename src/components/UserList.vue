<script setup>
import VToaster from './VToaster.vue'

import { useToasterStore } from '@/stores/toaster'
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
    <template v-if="users.length === 0">
      <article>
        <figure class="img--empty">
          <img src="/src/assets/img-empty.webp" alt="imagen de lista vacia" />
          <figcaption>No hay registros</figcaption>
        </figure>
      </article>
    </template>
    <template v-else>
      <article class="m-t-sm">
        <ul class="card-list">
          <template v-for="user in users" :key="user.id">
            <ContribuyenteCard
              :id="user.id"
              :titulo="user.contribuyente"
              :tipo="user.tipo"
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
          </template>
        </ul>
      </article>
    </template>
  </div>
  <VToaster />
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
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
.img--empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 240px;
  }
}
</style>
