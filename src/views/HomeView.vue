<script setup>
import UserList from '@/components/UserList.vue'
const users = [
  { id: 1, name: 'Jose Reyes Palacio', rfc: 'REPJ891214QE8', pass: '123456' },
  { id: 2, name: 'Jose Mateo Reyes Bernal', rfc: 'DOEJ124567534', pass: '123' },
  { id: 3, name: 'Rosa Jovanna Bernal Fuentes', rfc: 'SMITJ1234567123', pass: '123' },
  { id: 4, name: 'Jane Smith', rfc: 'SMITJ123456789', pass: '123' },
  { id: 5, name: 'John Doe', rfc: 'DOEJ123456789', pass: '123' },
  { id: 6, name: 'Jane Doe', rfc: 'DOEJ123fasfasd', pass: '123' },
  { id: 7, name: 'John Smith', rfc: 'SMasdfasdfas', pass: '123' },
  { id: 8, name: 'Jane Doe', rfc: 'DOasvasdfas  ', pass: '123' }
]
</script>

<template>
  <h1>Contribuyentes</h1>
  <UserList :users />
</template>
