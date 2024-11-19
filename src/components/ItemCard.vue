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
          <h3 class="item--title">{{ titulo }}</h3>
        </header>
        <p class="item--text">
          <strong>{{ tipo }} | </strong>
          <span class="text__regimenes"> {{ descripcion }}</span>
        </p>
      </section>
      <button class="btn-chevron" @click="handleShowActionButtons">
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

.item--title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%; /* Ajustable según el contenedor */
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
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.8rem 0;
}

.btn-chevron {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
  min-width: 32px;
  background-color: transparent;
  border: none;

  border-radius: 0.8em;
  cursor: pointer;
}

@media (width >= 1024px) {
  .item--text {
    max-width: 560px; /* Muestra más caracteres */
  }
}
@media (width <= 1023px) {
  .item--text {
    max-width: 400px; /* Muestra más caracteres */
  }
}
@media (width <= 425px) {
  .item--title {
    max-width: 260px;
  }
  .item--text {
    max-width: 260px;

    strong {
      display: none;
    }
  }
}
@media (width <= 320px) {
  .item--title {
    max-width: 200px;
  }
  .item--text {
    max-width: 200px;
  }
}
</style>
