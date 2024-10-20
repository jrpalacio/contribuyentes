import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const resAuth = ref(null)
  const tokenAuth = ref('')
  const UID = ref('')

  function setResAuth({ response }) {
    resAuth.value = response
    const { user } = resAuth.value
    setUid({ id: user.id })
  }

  function getResAuth() {
    return tokenAuth.value
  }

  function setUid({ id }) {
    UID.value = id
  }

  function setTokenAut({ token }) {
    tokenAuth.value = token
  }

  function getTokenAuth() {
    return tokenAuth.value
  }

  return {
    resAuth,
    setResAuth,
    getResAuth,
    setTokenAut,
    getTokenAuth
  }
})
