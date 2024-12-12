<script setup>
const search = defineModel('search', { required: true })
</script>
<template>
  <section>
    <label>
      Buscar contribuyente
      <input type="search" v-model="search" />
    </label>
  </section>
</template>

<style scoped>
section {
  margin: 1rem 0;
}

label {
  display: block;
  color: #00bfba;
  & input {
    margin-top: 0.2rem;
  }
}

input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #404650;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  font-size: 1rem;
  height: 56px;
  padding: 6px 12px 6px 16px;
  width: 100%;
}
</style>
