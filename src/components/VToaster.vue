<script setup>
import { useToasterStore } from '@/stores/toaster'
import { storeToRefs } from 'pinia'

const toaster = useToasterStore()
const { visible, message, type } = storeToRefs(toaster)
const { closeToast } = toaster
</script>

<template>
  <transition name="fade">
    <section class="toaster" v-if="visible">
      <div class="toast" :class="type">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1"
          />
        </svg>
        <span>{{ message }}</span>
        <button @click="closeToast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </section>
  </transition>
</template>

<style scoped>
.toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  display: flex;
  align-items: center;
  color: #242424;
  padding: 10px 20px;
  border-radius: 5px;
}

.toast.info {
  background-color: #087ec4;
}

.toast.success {
  background-color: #97ed86;
}

.toast.warning {
  background-color: #ff9800;
}

.toast.error {
  background-color: #f44336;
}

.toast span {
  margin-left: 0.5rem;
}

.toast button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #242424;
  margin-left: 2rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
