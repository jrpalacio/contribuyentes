import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaxplayerStore = defineStore('taxpayer', () => {
  const contribuyenteEdited = ref({})
  const showFormEditContribuyente = ref(false)
  const showFormNewContribuyente = ref(false)

  function setShowFormNewContribuyente(currenValue) {
    showFormNewContribuyente.value = currenValue
  }
  function getShowFormNewContribuyente() {
    return showFormNewContribuyente.value
  }

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
    showFormNewContribuyente,
    showFormEditContribuyente,
    setContribuyenteEdited,
    getContribuyenteEdited,
    setShowFormEditContribuyente,
    getShowFormEditContribuyente,
    setShowFormNewContribuyente,
    getShowFormNewContribuyente
  }
})
