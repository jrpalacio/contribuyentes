<script setup>
import { ref, watch, toRefs } from 'vue'
import { defineProps } from 'vue'
import { useTaxplayerStore } from '@/stores/taxpayer'
import { storeToRefs } from 'pinia'

const props = defineProps({
  contribuyente: {
    type: Object,
    required: true
  }
})

const form = useTaxplayerStore()
const { showFormEditContribuyente } = storeToRefs(form)
const { setShowFormEditContribuyente } = form

const { contribuyente } = toRefs(props)
const contribuyenteEdit = ref({ ...contribuyente.value })

watch(contribuyente, (newVal) => {
  contribuyenteEdit.value = { ...newVal }
})

const cancelEdit = () => {
  setShowFormEditContribuyente(false)
}
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div class="overlay" v-if="showFormEditContribuyente">
      <button type="button" @click="cancelEdit">Cancelar</button>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  z-index: 5;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
