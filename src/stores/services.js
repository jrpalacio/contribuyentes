import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useServicesStore = defineStore('services', async () => {
  async function getContribuyentesDb() {
    return await supabase
      .from('contribuyentes')
      .select('id, contribuyente, rfc, clave, tipo, regimenes')
  }

  async function getByIdContribuyenteDb({ idParam }) {
    return await supabase.from('contribuyentes').select('*').eq('id', idParam)
  }

  return {
    getContribuyentesDb,
    getByIdContribuyenteDb
  }
})
