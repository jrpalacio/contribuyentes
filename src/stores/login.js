import { supabase } from '@/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const isAuthenticated = ref(false)
  const user = ref({})

  async function handleAuthenticated() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        isAuthenticated.value = false

        return
      }
      isAuthenticated.value = data?.user?.aud === 'authenticated'
      if (isAuthenticated.value) user.value = data.user
    } catch (error) {
      console.error('Unexpected error:', error)
      isAuthenticated.value = false
    }
  }
  return {
    isAuthenticated,
    handleAuthenticated
  }
})
