<script setup>
import UserList from '@/components/UserList.vue'

import { supabase } from '@/supabase'
import { watchEffect } from 'vue'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { storeToRefs } from 'pinia'

const contribuyenteStore = useContribuyenteStore()
const { contribuyentes } = storeToRefs(contribuyenteStore)
const { setContribuyentes } = contribuyenteStore

watchEffect(async () => {
  try {
    const { data } = await supabase
      .from('contribuyentes')
      .select('id, contribuyente, rfc, clave, tipo, regimenes')

    setContribuyentes({ list: data })
  } catch (error) {
    console.error('Error al obtener los usuarios: ', error)
  }
})
</script>

<template>
  <UserList :users="contribuyentes"> </UserList>
</template>

<style scoped>
.btn--add-user {
  border: 0;
  background-color: transparent;
  cursor: pointer;

  font-weight: 500;
  letter-spacing: 0.019rem;
  color: #0094fa;
}
</style>
