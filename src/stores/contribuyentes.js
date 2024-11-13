import { defineStore } from 'pinia'
import { ref } from 'vue'
import { format, parse } from '@formkit/tempo'

const regexNum = /^\d+$/
const PERSONA_FISICA = 1

export const useContribuyentesStore = defineStore('contribuyentes', () => {
  const contribuyentes = ref([])

  function getRfcDate({ rfc, tipo }) {
    if (tipo === PERSONA_FISICA) {
      const dateString = rfc.slice(4, 10)

      if (!regexNum.test(dateString)) return ''

      const yearInt = parseInt(dateString.slice(0, 2), 10)
      const year =
        yearInt < 30 // 1930 - 2029
          ? `20${yearInt.toString().padStart(2, '0')}`
          : `19${yearInt.toString().padStart(2, '0')}`
      const month = dateString.slice(2, 4)
      const day = dateString.slice(4, 6)
      const date = parse(`${year}-${month}-${day}`)
      return format(date, 'long')
    } else {
      return ''
    }
  }

  function setContribuyentes({ list }) {
    contribuyentes.value = list.map((persona) => {
      if (persona.tipo === PERSONA_FISICA) {
        const [name, fatherLastName, motherLastName] = persona.contribuyente.split('_')
        const fechaDeNacimiento = getRfcDate({ rfc: persona.rfc, tipo: persona.tipo })
        return {
          id: persona.id,
          contribuyente: `${name} ${fatherLastName} ${motherLastName}`,
          rfc: persona.rfc,
          clave: persona.clave,
          correo: persona.correo,
          telefono: persona.telefono,
          tipo: persona.tipo,
          regimenes: persona.regimenes,
          fechaDeNacimiento,

          persona: {
            nombre: name,
            apellidoPaterno: fatherLastName,
            apellidoMaterno: motherLastName
          }
        }
      } else {
        return {
          id: persona.id,
          contribuyente: persona.contribuyente,
          rfc: persona.rfc,
          clave: persona.clave,
          tipo: persona.tipo,
          regimenes: persona.regimenes,
          persona: {
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: ''
          }
        }
      }
    })
  }

  function getContribuyentes() {
    return contribuyentes.value
  }

  async function getContribuyenteById({ id }) {
    const result = await contribuyentes.value.find(
      (contribuyente) => contribuyente.id === parseInt(id, 10)
    )
    return result || null
  }

  return {
    contribuyentes,
    setContribuyentes,
    getContribuyentes,
    getContribuyenteById
  }
})
