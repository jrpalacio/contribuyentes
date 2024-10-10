<script setup>
import UserList from '@/components/UserList.vue'

import { supabase } from '@/supabase'
import { onMounted, ref } from 'vue'

const users = ref(null)

onMounted(async () => {
  const { data: contribuyentes } = await supabase
    .from('contribuyentes')
    .select('id, nombre, apellido_paterno, apellido_materno, rfc, clave, tipo')

  const { data: regimen_por_contribuyente } = await supabase
    .from('regimen_por_contribuyente')
    .select('id_contribuyente, id_regimen')

  users.value = contribuyentes.map((contribuyente) => {
    return {
      id: contribuyente.id,
      name: `${contribuyente.nombre} ${contribuyente.apellido_paterno} ${contribuyente.apellido_materno}`,
      rfc: contribuyente.rfc,
      pass: contribuyente.clave,
      type: contribuyente.tipo,
      taxSystem: regimen_por_contribuyente.find(
        (regimen) => regimen.id_contribuyente === contribuyente.id
      ).id_regimen
    }
  })
})
</script>

<template>
  <UserList :users />
</template>
