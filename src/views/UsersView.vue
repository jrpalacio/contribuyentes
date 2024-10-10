<script setup>
import UserList from '@/components/UserList.vue'

import { supabase } from '@/supabase'
import { onMounted, ref } from 'vue'

const users = ref(null)

onMounted(async () => {
  const { data: contribuyentes } = await supabase
    .from('contribuyentes')
    .select('id, nombre, apellido_paterno, apellido_materno, rfc, clave, tipo')
  users.value = contribuyentes
})
</script>

<template>
  <UserList :users />
</template>
