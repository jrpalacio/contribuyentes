<script setup>
import UserList from '@/components/UserList.vue'
const users = [
  {
    id: 1,
    name: 'Jose Reyes Palacio',
    rfc: 'REPJ891214QE8',
    pass: '123456',
    type: 1,
    taxSystem: '603'
  },
  {
    id: 2,
    name: 'Jose Mateo Reyes Bernal',
    rfc: 'DOEJ124567534',
    pass: '123',
    type: 1,
    taxSystem: '603'
  },
  {
    id: 3,
    name: 'Rosa Jovanna Bernal Fuentes',
    rfc: 'SMITJ1234567123',
    pass: '123',
    type: 1,
    taxSystem: '603'
  }
]
</script>

<template>
  <h1>Contribuyentes</h1>
  <UserList :users />
</template>
