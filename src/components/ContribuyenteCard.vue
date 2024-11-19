<script setup>
import { useRouter } from 'vue-router'
import IconChevronr from '@/icons/IconChevronr.vue'

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
    type: String,
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
    <article class="contribuyente-card">
      <section class="space--between">
        <p class="card__tipo">
          <small>
            <strong>
              {{ tipo }}
            </strong>
          </small>
        </p>
        <button class="btn--rounded" @click="goToPage(id)"><IconChevronr /></button>
      </section>
      <section>
        <h3 class="card__titulo">{{ titulo }}</h3>
        <p class="card__descripcion">💼 {{ descripcion }}</p>
      </section>
      <section>
        <hr class="hr" />
        <div class="card__botones">
          <slot name="action-buttons"></slot>
        </div>
      </section>
    </article>
  </li>
</template>

<style scoped>
.space--between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contribuyente-card {
  background-color: #121212;
  padding: 0.8rem 0.8rem 1.2rem;
  border-radius: 1.6rem;
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
  font-size: 1.1rem;
  letter-spacing: 0.013rem;
}
.card__tipo {
  font-style: italic;
  color: #7a7a7a;
}
.card__descripcion {
  font-size: 0.9rem;
  color: #009a93;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
.hr {
  margin: 0.5rem 0;
  padding: 0;
  border: 0;
  height: 1px;
  background-color: #2d323a;
  width: 100%;
}
.card__botones {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.8rem;
}
</style>
