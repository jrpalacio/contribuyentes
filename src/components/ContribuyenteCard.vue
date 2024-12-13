<script setup>
import { useRouter } from 'vue-router'
import IconChevronr from '@/icons/IconChevronr.vue'
import ComIconUser from '@/components/ContribuyenteCard/ComIconUser.vue'

defineProps({
  id: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  tipo: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
})

const router = useRouter()
function goToPage(id) {
  router.push({ name: 'user-detail', params: { id } })
}
</script>

<template>
  <li>
    <article class="contribuyente-card space--between">
      <section class="flex">
        <ComIconUser :tipo="tipo" />
        <div class="card-text">
          <h3 class="card__titulo ellipsis-text">{{ titulo }}</h3>
          <p class="card__descripcion ellipsis-text">{{ descripcion }}</p>
        </div>
      </section>
      <section>
        <div class="space--between">
          <div class="card__botones">
            <slot name="action-buttons"></slot>
          </div>
          <button class="btn--rounded" @click="goToPage(id)"><IconChevronr /></button>
        </div>
      </section>
    </article>
  </li>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.space--between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contribuyente-card {
  padding: 0.8rem 0.4rem;
  border-radius: 0.2rem;

  &:hover {
    background-color: #1c1c1c;
  }
}

.btn--rounded {
  border-radius: 0.8rem;
  background-color: #242424;
  color: white;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
}
.card__titulo {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: 0.016rem;
  color: #f5f9ff;
}
.card__tipo {
  font-style: italic;
  color: #d3fbd8;
}
.card__descripcion {
  font-size: 0.95rem;
  color: #009a93;
}

.ellipsis-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.card__botones {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.card-text {
  width: 240px;
  display: flex;
  flex-direction: column;
}

@media (width <= 1024px) {
  .card__botones {
    display: none;
  }
}
@media (width >= 1024px) {
  .card-text {
    width: 600px;
  }
}
</style>
