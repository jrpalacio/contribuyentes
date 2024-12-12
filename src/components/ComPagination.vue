<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const { data, itemsPerPage, modelValue } = toRefs(props)

const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage.value))

const currentPage = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
