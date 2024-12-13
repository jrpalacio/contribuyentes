<script setup>
import UserList from '@/components/UserList.vue'
import { supabase } from '@/supabase'
import { computed, ref, watchEffect } from 'vue'
import { useContribuyentesStore } from '@/stores/contribuyentes'
import { storeToRefs } from 'pinia'
import VSearch from '@/components/VSearch.vue'
import ComPagination from '@/components/ComPagination.vue'
import IconSearh from '@/icons/IconSearh.vue'

const contribuyentesStore = useContribuyentesStore()
const { contribuyentes } = storeToRefs(contribuyentesStore)
const { setContribuyentes } = contribuyentesStore

watchEffect(async () => {
  try {
    const { data } = await supabase
      .from('contribuyentes')
      .select('id, contribuyente, rfc, clave, tipo, regimenes, correo, telefono')

    setContribuyentes({ list: data })
  } catch (error) {
    console.error('Error al obtener los usuarios: ', error)
  }
})

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const filteredContribuyentes = computed(() => {
  if (!searchQuery.value) {
    return contribuyentes.value
  }
  return contribuyentes.value.filter((contribuyente) =>
    contribuyente.contribuyente.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedContribuyentes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredContribuyentes.value.slice(start, end)
})
</script>

<template>
  <!--  <VSearch v-model:search="searchQuery" /> -->
  <div class="space--between">
    <div><IconSearh /> Buscar</div>
  </div>

  <UserList :users="paginatedContribuyentes"> </UserList>
  <ComPagination
    :data="filteredContribuyentes"
    :itemsPerPage="itemsPerPage"
    v-model:modelValue="currentPage"
  />
</template>

<style scoped>
.space--between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.btn--add-user {
  border: 0;
  background-color: transparent;
  cursor: pointer;

  font-weight: 500;
  letter-spacing: 0.019rem;
  color: #0094fa;
}
</style>
