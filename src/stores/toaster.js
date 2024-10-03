import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToasterStore = defineStore('toaster', () => {
  const message = ref('test')
  const visible = ref(false)
  const type = ref('info') // info, success, warning, error

  function setMessage(msg) {
    message.value = msg
  }
  function setVisible(isVisible) {
    visible.value = isVisible
  }
  function setType(toastType) {
    type.value = toastType
  }
  function showToast({ msg, toastType }) {
    setMessage(msg)
    setType(toastType)
    setVisible(true)
    setTimeout(closeToast, 1600) // Auto close after 3 seconds
  }

  const closeToast = () => {
    setVisible(false)
  }

  return { message, visible, type, showToast, closeToast }
})
