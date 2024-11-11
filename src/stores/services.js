import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useServicesStore = defineStore('services', () => {
  async function getContribuyentesDb() {
    const { data } = await supabase
      .from('contribuyentes')
      .select('id, contribuyente, rfc, clave, tipo, regimenes')
    return data
  }

  return {
    getContribuyentesDb
  }
})
