<script setup>
import IconChevronDown from '@/icons/IconChevronDown.vue'
import IconChevronUp from '@/icons/IconChevronUp.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { defineProps, defineEmits } from 'vue'

// Definición de las propiedades
defineProps({
  optionLabel: {
    type: String,
    required: true
  }
})

const itemList = defineModel('itemList', {
  type: Array,
  required: true
})

// Definición de los eventos emitidos
const emit = defineEmits(['update:selectedValue'])

// Variables reactivas
const selectedValue = ref('Elija una opción')
const isListVisible = ref(false)
const selectRef = ref(null)

// Funciones manejadoras
const toggleListVisibility = () => {
  isListVisible.value = !isListVisible.value
}

const selectOption = (option) => {
  selectedValue.value = option.descripcion
  isListVisible.value = false
  emit('update:selectedValue', selectedValue.value) // Emitir valor seleccionado
}

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isListVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <article class="container" ref="selectRef">
    <div class="select">
      <label
        @click="toggleListVisibility"
        class="select__label"
        role="button"
        aria-expanded="isListVisible"
        aria-controls="dropdown-list"
      >
        <span>{{ selectedValue }}</span>
        <template v-if="isListVisible">
          <IconChevronUp />
        </template>
        <template v-else>
          <IconChevronDown />
        </template>
      </label>

      <ul
        v-if="isListVisible"
        id="dropdown-list"
        class="dropdown"
        role="listbox"
        aria-labelledby="dropdown-label"
      >
        <li>
          <span>{{ optionLabel }}</span>
        </li>
        <li v-for="item in itemList" :key="item.value" role="option" @click="selectOption(item)">
          <button type="button">
            {{ item.descripcion }}
          </button>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.container {
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
.select {
  position: relative;
  display: inline-block;
  width: 100%;
}
.select__label {
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
  overflow-y: auto;
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
</style>
