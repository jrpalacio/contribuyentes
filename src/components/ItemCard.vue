<script setup>
import { ref } from 'vue'
import IconChevronDown from '@/icons/IconChevronDown.vue'
import IconChevronUp from '@/icons/IconChevronUp.vue'

defineProps({
  titulo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
})

const showActionButtons = ref(false)

function handleShowActionButtons() {
  showActionButtons.value = !showActionButtons.value
}
</script>
<template>
  <li class="card-item">
    <div class="item--info">
      <section>
        <header>
          <h3>{{ titulo }}</h3>
        </header>
        <p class="item--text">
          <strong>{{ tipo }} | </strong>
          <span class="text__regimenes"> {{ descripcion }}</span>
        </p>
      </section>
      <button class="btn" @click="handleShowActionButtons">
        <template v-if="showActionButtons">
          <IconChevronUp />
        </template>
        <template v-else>
          <IconChevronDown />
        </template>
      </button>
    </div>
    <div class="item--buttons" v-if="showActionButtons">
      <slot name="action-buttons"></slot>
    </div>
  </li>
</template>

<style scoped>
h3 {
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.013rem;
}
.card-item {
  background-color: #121212;
  border-radius: 0.8rem;
  padding: 0.6rem 0.8rem;
}
.item--info {
  display: flex;
  justify-content: space-between;
}
.item--text {
  font-size: 0.9rem;
  color: #7a7a7a;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%; /* Ajustable según el contenedor */
}

.text__regimenes {
  color: #009a93;
}

.item--buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background-color: transparent;
  border: none;

  border-radius: 0.8em;
  cursor: pointer;

  padding: 0.2rem 0.6rem;

  &:hover {
    background-color: #087ec4;
  }
}

@media (width >= 1024px) {
  .item--text {
    max-width: 560px; /* Muestra más caracteres */
  }
}
@media (width <= 1023px) {
  .item--text {
    max-width: 200px; /* Muestra más caracteres */
  }
}
@media (width <= 768px) {
  .item--text {
    strong {
      display: none;
    }
  }
}
</style>
