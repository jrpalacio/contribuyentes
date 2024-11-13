import { ref } from 'vue'
import { defineStore } from 'pinia'
import { REGIMENES_LIST } from '@/constants/SAT'

export const useContribuyenteStore = defineStore('contribuyente', () => {
  const nombre = ref('')
  const apellidoPaterno = ref('')
  const apellidoMaterno = ref('')
  const rfc = ref('')
  const clave = ref('')
  const telefono = ref('')
  const correo = ref('')
  const tipo = ref(1)
  const regimenes = ref([])
  const regimenesFiscales = ref(REGIMENES_LIST)
  const empresa = ref('')

  function getEmpresa() {
    return empresa.value
  }

  function setEmpresa(value) {
    empresa.value = value
  }

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

  function getClave() {
    return clave.value
  }

  function setClave(value) {
    clave.value = value
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
    return regimenesFiscales.value.find((regimen) => regimen.descripcion === text).id || null
  }
  function regimenNumberStringToText({ numbreString }) {
    return (
      regimenesFiscales.value.find((regimen) => regimen.id === numbreString).descripcion || null
    )
  }

  function findRegimenById({ id }) {
    return regimenesFiscales.value.find((regimen) => regimen.id === id) || null
  }

  return {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    rfc,
    clave,
    telefono,
    correo,
    tipo,
    regimenes,
    empresa,
    getNombre,
    setNombre,
    getApellidoPaterno,
    setApellidoPaterno,
    getApellidoMaterno,
    setApellidoMaterno,
    getRfc,
    setRfc,
    getClave,
    setClave,
    getTelefono,
    setTelefono,
    getCorreo,
    setCorreo,
    getTipo,
    setTipo,
    getRegimenes,
    setRegimenes,
    regimenTextToNumberString,
    regimenNumberStringToText,
    findRegimenById,
    getEmpresa,
    setEmpresa
  }
})
