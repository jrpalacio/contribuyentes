<script setup>
import FormNew from '@/components/FormNew.vue'
import UserList from '@/components/UserList.vue'

import { supabase } from '@/supabase'
import { onMounted, ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import router from '@/router'

const login = useLoginStore()
const { handleAuthenticated } = login

const users = ref([])

onMounted(async () => {
  try {
    await handleAuthenticated()
    const { data: contribuyentes } = await supabase
      .from('contribuyentes')
      .select(
        'id, nombre, apellido_paterno, apellido_materno, rfc, clave, tipo, regimenes, empresa'
      )

    users.value = contribuyentes.map((contribuyente) => {
      return {
        id: contribuyente.id,
        name: `${contribuyente.nombre} ${contribuyente.apellido_paterno} ${contribuyente.apellido_materno}`,
        rfc: contribuyente.rfc,
        pass: contribuyente.clave,
        type: contribuyente.tipo,
        taxSystem: contribuyente.regimenes,
        company: contribuyente.empresa
      }
    })
  } catch (error) {
    console.error('Error al obtener los usuarios: ', error)
  }
})

function handleBtnShowFormNew() {
  router.push({ name: 'create-user' })
}
</script>

<template>
  <UserList :users>
    <template #button>
      <button class="btn--add-user" @click="handleBtnShowFormNew">Agregar contribuyente</button>
    </template>
  </UserList>
  <FormNew />
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
