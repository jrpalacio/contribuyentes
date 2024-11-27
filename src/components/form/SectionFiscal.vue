<script setup>
import { ref, watchEffect } from 'vue'
import { LISTA_TIPO_DE_CONTRIBUYENTE, REGIMENES_LIST } from '@/constants/SAT'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { storeToRefs } from 'pinia'
import IconChevronDown from '@/icons/IconChevronDown.vue'
import IconChevronUp from '@/icons/IconChevronUp.vue'

const constribuyenteStore = useContribuyenteStore()
const { tipo, regimenes } = storeToRefs(constribuyenteStore)

const showRegimenesList = ref(false)
const regimenesFiscales = ref([])

watchEffect(() => {
  if (tipo.value === 1) {
    regimenesFiscales.value = REGIMENES_LIST.filter((regimen) => regimen.esFisica)
    regimenes.value = []
  } else {
    regimenesFiscales.value = REGIMENES_LIST.filter((regimen) => regimen.esMoral)
    regimenes.value = []
  }
})

function handleShowRegimenesList() {
  showRegimenesList.value = !showRegimenesList.value
}
</script>

<template>
  <article>
    <header class="section--title">
      <h3>Información fiscal</h3>
      <p>
        La información fiscal que debes introducir es la que te va a permitir ingresar al portal del
        SAT
      </p>
    </header>
    <section>
      <p>
        <label>
          <span class="color--primary">Tipo de contribuyente:</span>
          <select class="m-t-xs" v-model="tipo" required>
            <option
              v-for="tipoContribuyente in LISTA_TIPO_DE_CONTRIBUYENTE"
              :value="tipoContribuyente.id"
              :key="tipoContribuyente.id"
            >
              {{ tipoContribuyente.descripcion }}
            </option>
          </select>
        </label>
      </p>
    </section>
    <section>
      <button class="btn--chevron space--between" type="button" @click="handleShowRegimenesList">
        <p class="color--primary">Regímenes fiscales</p>
        <IconChevronUp v-if="showRegimenesList" />
        <IconChevronDown v-else />
      </button>

      <section class="content--regimenes m-t-xs" v-if="showRegimenesList">
        <p v-for="item in regimenesFiscales" :key="item.id">
          <label class="element--regimen">
            <input type="checkbox" :value="item.id" v-model="regimenes" />
            {{ item.id }} - {{ item.descripcion }}
          </label>
        </p>
      </section>
      <section v-else>
        <template v-if="regimenes.length === 0">
          <p class="regimen--empty m-t-xs">No hay regimenes seleccionados</p>
        </template>
        <template v-else>
          <div class="regimenes--selected m-t-xs">
            <p class="regimen--selected" v-for="regimen in regimenes" :key="regimen">
              {{ regimen }}
            </p>
          </div>
        </template>
      </section>
    </section>
  </article>
</template>

<style scoped>
.color--primary {
  color: #00bfba;
}
.btn--chevron {
  margin-top: 0.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
}
.space--between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* label {
  display: block;
  color: #d1d5db;
  & input {
    margin-top: 0.2rem;
  }
} */
/* Estilo del checkbox por defecto */
input[type='checkbox'] {
  min-width: 20px;
  min-height: 20px;
  appearance: none; /* Elimina el estilo por defecto del checkbox */
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Cambia el color cuando está activo (checked) */
input[type='checkbox']:checked {
  background-color: #4caf50; /* Color verde */
  border-color: #4caf50;
  position: relative;
}

/* Icono de verificación personalizado */
input[type='checkbox']:checked::after {
  content: '✔';
  color: white;
  font-size: 14px;
  display: block;
  text-align: center;
  line-height: 20px;
}

select {
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
.content--regimenes {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #404650;
  border-radius: 8px;
  padding: 1.1rem 0.8rem;
}
.element--regimen {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}
.section--title {
  margin: 0.8rem 0;
}
.regimen--selected {
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
.regimen--empty {
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
.regimenes--selected {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
