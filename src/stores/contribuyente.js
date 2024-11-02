import { ref } from 'vue'
import { defineStore } from 'pinia'
import regimenesFiscales from '@/api/regimenesFiscales.json'

export const useContribuyenteStore = defineStore('contribuyente', () => {
  const nombre = ref('')
  const apellidoPaterno = ref('')
  const apellidoMaterno = ref('')
  const rfc = ref('')
  const curp = ref('')
  const telefono = ref('')
  const correo = ref('')
  const tipo = ref(1)
  const regimenes = ref([])

  function getNombre() {
    return nombre.value
  }

  function setNombre(value) {
    nombre.value = value
  }

  function getApellidoPaterno() {
    return apellidoPaterno.value
  }

  function setApellidoPaterno(value) {
    apellidoPaterno.value = value
  }

  function getApellidoMaterno() {
    return apellidoMaterno.value
  }

  function setApellidoMaterno(value) {
    apellidoMaterno.value = value
  }

  function getRfc() {
    return rfc.value
  }

  function setRfc(value) {
    rfc.value = value
  }

  function getCurp() {
    return curp.value
  }

  function setCurp(value) {
    curp.value = value
  }

  function getTelefono() {
    return telefono.value
  }

  function setTelefono(value) {
    telefono.value = value
  }

  function getCorreo() {
    return correo.value
  }

  function setCorreo(value) {
    correo.value = value
  }

  function getTipo() {
    return tipo.value
  }

  function setTipo(value) {
    tipo.value = value
  }

  function getRegimenes() {
    return regimenes.value
  }

  function setRegimenes(value) {
    regimenes.value = value
  }

  function regimenTextToNumberString({ text }) {
    return regimenesFiscales.find((regimen) => regimen.descripcion === text).id || null
  }
  function regimenNumberStringToText({ numbreString }) {
    return regimenesFiscales.find((regimen) => regimen.id === numbreString).descripcion || null
  }

  return {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    rfc,
    curp,
    telefono,
    correo,
    tipo,
    regimenes,
    getNombre,
    setNombre,
    getApellidoPaterno,
    setApellidoPaterno,
    getApellidoMaterno,
    setApellidoMaterno,
    getRfc,
    setRfc,
    getCurp,
    setCurp,
    getTelefono,
    setTelefono,
    getCorreo,
    setCorreo,
    getTipo,
    setTipo,
    getRegimenes,
    setRegimenes,
    regimenTextToNumberString,
    regimenNumberStringToText
  }
})
