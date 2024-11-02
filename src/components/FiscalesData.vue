<script setup>
import { ref, watch } from 'vue'
import { LISTA_TIPO_DE_CONTRIBUYENTE } from '@/constants/SAT'
import regimenesFiscales from '@/api/regimenesFiscales.json'
import { useContribuyenteStore } from '@/stores/contribuyente'
import IconTrash from '@/icons/IconTrash.vue'
import VSelect from './VSelect.vue'

const MESSAGE = {
  SELECCIONAR_REGIMEN: 'Seleccione un régimen fiscal',
  SELECCIONAR_TIPO: 'Seleccione un tipo de contribuyente',
  PERSONA_FISICA: 'Persona Física',
  PERSONA_MORAL: 'Persona Moral'
}
const contribuyente = useContribuyenteStore()
const { setTipo } = contribuyente

const tipoSelected = ref(MESSAGE.SELECCIONAR_TIPO)
const regimenSelected = ref([])

const listaDeTiposDeContribuyentes = ref(LISTA_TIPO_DE_CONTRIBUYENTE)
const listaDeRegimenesFiscales = ref([])

const arrayOfListaDeRegimenesFiscales = ref([])

watch(
  tipoSelected,
  (currentValue) => {
    const resetArrayOfLista = () => (arrayOfListaDeRegimenesFiscales.value = [])
    const actualizarRegimenesFiscales = (tipo) => {
      const filtros = {
        [MESSAGE.PERSONA_FISICA]: (regimen) => regimen.esFisica,
        [MESSAGE.PERSONA_MORAL]: (regimen) => regimen.esMoral
      }
      listaDeRegimenesFiscales.value = filtros[tipo] ? regimenesFiscales.filter(filtros[tipo]) : []
      resetArrayOfLista()
    }
    actualizarRegimenesFiscales(currentValue)
  },
  { immediate: true }
)

function selectRegimen(selectedValue) {
  // selectedValue = 'General de Ley Personas Morales'
  // validar que el valor no exista en el array
  if (regimenSelected.value.includes(selectedValue)) {
    return
  }
  regimenSelected.value.push(selectedValue)
  console.log(regimenSelected.value)
}

function handleTypeSelected(tipo) {
  tipoSelected.value = tipo
  const type = LISTA_TIPO_DE_CONTRIBUYENTE.find((item) => item.descripcion === tipo)
  setTipo(type.id)
}

function agregarRegimen() {
  arrayOfListaDeRegimenesFiscales.value.push(listaDeRegimenesFiscales.value)
}

function eliminarRegimen(index) {
  arrayOfListaDeRegimenesFiscales.value.splice(index, 1)
}
</script>

<template>
  <header>
    <h3>Información fiscal</h3>
  </header>
  <VSelect
    option-label="TIPO DE CONTRIBUYENTES"
    v-model:item-list="listaDeTiposDeContribuyentes"
    @update:selected-value="handleTypeSelected"
  />
  <label> Lista</label>

  <div class="m-top" v-for="(regimen, index) in arrayOfListaDeRegimenesFiscales" :key="index">
    <div class="content__vselect--list">
      <VSelect
        option-label="REGÍMENES FISCALES"
        v-model:item-list="listaDeRegimenesFiscales"
        @update:selected-value="selectRegimen"
      />
      <button @click="eliminarRegimen(index)">
        <IconTrash />
      </button>
    </div>
  </div>

  <button type="button" class="content__regimenes--push m-top" @click="agregarRegimen">
    <p>Agregar regimen</p>
  </button>
</template>

<style scoped>
.content__vselect--list {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.content__vselect--list button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.m-top {
  margin-top: 0.5rem;
}

.content__regimenes--push {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.062);
  border: 1px solid #404650;
  border-style: dashed solid;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  font-size: 1rem;
  height: 56px;
  padding: 6px 12px 6px 16px;
  width: 100%;
}
</style>
