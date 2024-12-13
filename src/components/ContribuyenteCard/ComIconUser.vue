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
