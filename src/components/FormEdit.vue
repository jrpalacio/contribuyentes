<script setup>
import { ref, watch, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useTaxplayerStore } from '@/stores/taxpayer'
import { storeToRefs } from 'pinia'

const props = defineProps({
  userDetailView: {
    type: Object,
    required: true
  }
})

const contribuyente = useTaxplayerStore()
const { showFormEditContribuyente } = storeToRefs(contribuyente)
const { setShowFormEditContribuyente } = contribuyente

const emit = defineEmits(['update-user'])

const { userDetailView } = toRefs(props)
const user = ref({ ...userDetailView.value })

watch(userDetailView, (newVal) => {
  user.value = { ...newVal }
})

const submitForm = () => {
  emit('update-user', user.value)
}

const cancelEdit = () => {
  setShowFormEditContribuyente(false)
}
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div class="overlay" v-if="showFormEditContribuyente">
      <div class="form-edit">
        <h2>Edit User Information</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" v-model="user.name" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="user.email" id="email" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" v-model="user.phone" id="phone" required />
          </div>
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
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
