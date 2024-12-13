<script setup>
import IconUser from '@/icons/IconUser.vue'
import IconTie from '@/icons/IconTie.vue'

defineProps({
  tipo: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="icon-type" v-if="tipo === 1">
    <IconUser />
  </div>
  <div class="icon-type" v-else>
    <IconTie />
  </div>
</template>

<style scoped>
.icon-type {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  color: white;
  object-fit: contain;
}
</style>
