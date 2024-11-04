<script setup>
import { ref, watch } from 'vue'
import { LISTA_TIPO_DE_CONTRIBUYENTE, MESSAGE } from '@/constants/SAT'
import regimenesFiscales from '@/api/regimenesFiscales.json'
import IconTrash from '@/icons/IconTrash.vue'
import VSelect from './VSelect.vue'
import VSelectObjet from './VSelectObjet.vue'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { storeToRefs } from 'pinia'

const contribuyente = useContribuyenteStore()
const { regimenes } = storeToRefs(contribuyente)
const { setTipo, setRegimenes, regimenTextToNumberString } = contribuyente

const tipoSelected = ref(MESSAGE.SELECCIONAR_TIPO)

const listaDeTiposDeContribuyentes = ref(LISTA_TIPO_DE_CONTRIBUYENTE)
const listaDeRegimenesFiscales = ref([])

const arrayOfListaDeRegimenesFiscales = ref([])

watch(
  tipoSelected,
  (currentValue) => {
    const resetArrayOfLista = () => {
      arrayOfListaDeRegimenesFiscales.value = []
      setRegimenes([])
    }
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

function selectRegimen({ value, index }) {
  const idRegimen = regimenTextToNumberString({ text: value })
  if (!idRegimen) return
  if (!regimenes.value[index]) {
    if (regimenes.value.length === 0) {
      regimenes.value.push(idRegimen)
    } else {
      regimenes.value.push(idRegimen)
    }
  } else {
    regimenes.value[index] = idRegimen
  }
}

function handleTypeSelected(tipo) {
  tipoSelected.value = tipo
  const type = LISTA_TIPO_DE_CONTRIBUYENTE.find((item) => item.descripcion === tipo)
  setTipo(type.id)
}

function agregarListadoDeRegimenes() {
  arrayOfListaDeRegimenesFiscales.value.push(listaDeRegimenesFiscales.value)
}

function eliminarRegimen(index) {
  arrayOfListaDeRegimenesFiscales.value.splice(index, 1)
  if (regimenes.value.length > 0) {
    regimenes.value.splice(index, 1)
  }
}
</script>

<template>
  <h3>Información fiscal</h3>
  <label>Persona</label>
  <VSelect
    class="m--label"
    option-label="TIPO DE CONTRIBUYENTES"
    v-model:item-list="listaDeTiposDeContribuyentes"
    @update:selected-value="handleTypeSelected"
  />

  <div class="header--fiscales">
    <label>Regímenes fiscales</label>
    <small>Agrega un campo y selecciona el regimen fiscal correspondiente</small>
  </div>
  <div class="content__list m--label">
    <template v-for="(regimen, index) in arrayOfListaDeRegimenesFiscales" :key="index">
      <div class="content__vselect--list">
        <VSelectObjet
          :index="index"
          option-label="REGÍMENES FISCALES"
          :item-list="regimen"
          @update:selected-value="selectRegimen"
        />

        <button @click="eliminarRegimen(index)">
          <IconTrash />
        </button>
      </div>
    </template>
  </div>

  <button type="button" class="content__regimenes--push" @click="agregarListadoDeRegimenes">
    <p>Agregar regimen</p>
  </button>
</template>

<style scoped>
.header--fiscales {
  display: flex;
  flex-direction: column;
  margin-top: 0.6rem;
}
.content__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
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
.m--label {
  margin-top: 0.2rem;
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
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>
