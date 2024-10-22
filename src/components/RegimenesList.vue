<script setup>
import { ref, watch } from 'vue'
import IconChevronDown from '@/icons/IconChevronDown.vue'
import IconChevronUp from '@/icons/IconChevronUp.vue'
import { LISTA_TIPO_DE_CONTRIBUYENTE } from '@/constants/SAT'
import regimenesFiscales from '@/api/regimenesFiscales.json'
import { useContribuyenteStore } from '@/stores/contribuyente'

const contribuyente = useContribuyenteStore()
const { setTipo } = contribuyente

const regimenSelected = ref('Seleccione un régimen fiscal')
const tipoSelected = ref('Seleccione un tipo de contribuyente')

const showRegimenesList = ref(false)
const showTiposList = ref(false)

const listaDeTiposDeContribuyentes = ref(LISTA_TIPO_DE_CONTRIBUYENTE)
const listaDeRegimenesFiscales = ref([])

watch(
  tipoSelected,
  (value) => {
    if (value !== 'Seleccione un tipo de contribuyente') {
      if (value === 'Persona Física') {
        listaDeRegimenesFiscales.value = regimenesFiscales.filter((regimen) => regimen.esFisica)
      } else {
        listaDeRegimenesFiscales.value = regimenesFiscales.filter((regimen) => regimen.esMoral)
      }
      regimenSelected.value = 'Seleccione un régimen fiscal'
    }
  },
  { immediate: true }
)

/* watchEffect(() => {
  if (tipo.value === 1) {
    tipoSelected.value = 'Persona Física'
  } else if (tipo.value === 2) {
    tipoSelected.value = 'Persona Moral'
  }
}) */

function toggleRegimenesList() {
  showRegimenesList.value = !showRegimenesList.value
}
function toggleTiposList() {
  showTiposList.value = !showTiposList.value
}
function selectRegimen(regimen) {
  regimenSelected.value = regimen.descripcion
  showRegimenesList.value = false
}
function selectTipo(tipo) {
  tipoSelected.value = tipo.description
  setTipo(tipo.value)
  showTiposList.value = false
}
</script>
<template>
  <header>
    <h3>Información fiscal</h3>
  </header>
  <article class="content--regimenes">
    <div class="regimenes-list">
      <label @click="toggleTiposList" class="regimenes-label">
        {{ tipoSelected }}
        <template v-if="showTiposList">
          <IconChevronUp />
        </template>
        <template v-else>
          <IconChevronDown />
        </template>
      </label>
      <ul v-if="showTiposList" class="dropdown">
        <li>
          <span>TIPOS DE CONTRIBUYENTES</span>
        </li>
        <li v-for="tipo in listaDeTiposDeContribuyentes" :key="tipo.value">
          <button type="button" @click="selectTipo(tipo)">
            {{ tipo.description }}
          </button>
        </li>
      </ul>
    </div>
  </article>
  <article class="content--regimenes m-top">
    <div class="regimenes-list">
      <label @click="toggleRegimenesList" class="regimenes-label">
        {{ regimenSelected }}
        <template v-if="showRegimenesList">
          <IconChevronUp />
        </template>
        <template v-else>
          <IconChevronDown />
        </template>
      </label>
      <ul v-if="showRegimenesList" class="dropdown">
        <li>
          <span>REGÍMENES FISCALES</span>
        </li>
        <li v-for="regimen in listaDeRegimenesFiscales" :key="regimen.id">
          <button type="button" @click="selectRegimen(regimen)">
            {{ regimen.descripcion }}
          </button>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.m-top {
  margin-top: 0.5rem;
}
.content--regimenes {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #404650;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  font-size: 1rem;
  height: 56px;
  padding: 6px 12px 6px 16px;
  width: 100%;
}
.regimenes-list {
  position: relative;
  display: inline-block;
  width: 100%;
}

.regimenes-label {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown {
  background-color: #24385b;
  border: 1px solid #637a9d;
  border-radius: 8px;
  max-height: 50vh;
  overflow-y: scroll;
  position: absolute;
  top: 45px;

  width: 100%;
  z-index: 10;
}

.dropdown > li > span {
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #59677a;
}
.dropdown li button {
  padding: 0.4rem 1rem;
  cursor: pointer;
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
}

.dropdown li button:hover {
  background-color: #ffffff16;
}

.Dropdown-options::-webkit-scrollbar {
  width: 7px;
}
.Dropdown-options::-webkit-scrollbar-thumb {
  background-color: #05ffa3;
  border: 2px solid transparent;
  border-radius: 6px;
}
.Dropdown-options::-webkit-scrollbar-track {
  background: 0 0;
}
</style>
