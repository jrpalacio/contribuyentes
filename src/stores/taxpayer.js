import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaxplayerStore = defineStore('taxpayer', () => {
  const contribuyenteEdited = ref({})
  const showFormEditContribuyente = ref(false)

  function setShowFormEditContribuyente(currenValue) {
    showFormEditContribuyente.value = currenValue
  }

  function getShowFormEditContribuyente() {
    return showFormEditContribuyente.value
  }

  function setContribuyenteEdited(contribuyente) {
    contribuyenteEdited.value = contribuyente
  }
  function getContribuyenteEdited() {
    return contribuyenteEdited.value
  }

  return {
    showFormEditContribuyente,
    setContribuyenteEdited,
    getContribuyenteEdited,
    setShowFormEditContribuyente,
    getShowFormEditContribuyente
  }
})
