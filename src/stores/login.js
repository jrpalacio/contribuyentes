import { supabase } from '@/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const isAuthenticated = ref(false)

  async function handleAuthenticated() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) isAuthenticated.value = false
      if (data.user.aud === 'authenticated') isAuthenticated.value = true
    } catch (error) {
      isAuthenticated.value = false
    }
  }
  return {
    isAuthenticated,
    handleAuthenticated
  }
})
