<script setup>
import { ref, watch, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useTaxplayerStore } from '@/stores/taxpayer'
import { storeToRefs } from 'pinia'

const props = defineProps({
  contribuyente: {
    type: Object,
    required: true
  }
})

const form = useTaxplayerStore()
const { showFormEditContribuyente } = storeToRefs(form)
const { setShowFormEditContribuyente } = form

const emit = defineEmits(['update-user'])

const { contribuyente } = toRefs(props)
const contribuyenteEdit = ref({ ...contribuyente.value })

watch(contribuyente, (newVal) => {
  contribuyenteEdit.value = { ...newVal }
})

const submitForm = () => {
  emit('update-user', contribuyenteEdit.value)
}

const cancelEdit = () => {
  setShowFormEditContribuyente(false)
}
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div class="overlay" v-if="showFormEditContribuyente">
      <div class="form-edit">
        <h2>Editar datos del contribuyente</h2>

        <form @submit.prevent="submitForm">
          <template v-if="contribuyenteEdit.tipo === 1">
            <div class="form-group">
              <label>
                Nombre:
                <input type="text" v-model="contribuyenteEdit.persona.nombre" required />
              </label>
            </div>
            <div class="form-group">
              <label>
                Apellido Paterno:
                <input type="text" v-model="contribuyenteEdit.persona.apellidoPaterno" required />
              </label>
            </div>
            <div class="form-group">
              <label>
                Apellido Materno:
                <input type="text" v-model="contribuyenteEdit.persona.apellidoMaterno" required />
              </label>
            </div>
          </template>
          <template v-else>
            <div class="form-group">
              <label>
                Empresa:
                <input type="text" v-model="contribuyenteEdit.contribuyente" required />
              </label>
            </div>
          </template>
          <div class="form-group">
            <label>
              RFC:
              <input type="text" v-model="contribuyenteEdit.rfc" required />
            </label>
          </div>
          <div class="form-group">
            <label>
              RFC:
              <input type="password" v-model="contribuyenteEdit.clave" required />
            </label>
          </div>
          <div class="form-group">
            <label>
              Correo Electrónico:
              <input type="email" v-model="contribuyenteEdit.correo" required />
            </label>
          </div>
          <div class="form-group">
            <label>
              Teléfono:
              <input type="tel" v-model="contribuyenteEdit.telefono" required />
            </label>
          </div>
          <button type="submit">Guardar</button>
          <button type="button" @click="cancelEdit">Cancelar</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  z-index: 5;
}

.form-edit {
  width: 400px;
  height: 100%;
  background-color: #242424;
  box-shadow: -2px 0 5px rgba(0, 98, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

button[type='button'] {
  background-color: #6c757d;
}

button[type='button']:hover {
  background-color: #5a6268;
}
</style>
