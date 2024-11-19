<script setup>
import { supabase } from '@/supabase'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { TIPO_CONTRIBUYENTE } from '@/constants/SAT'

import CardIcon from '@/components/CardIcon.vue'
import FormEdit from '@/components/FormEdit.vue'

import { useTaxplayerStore } from '@/stores/taxpayer'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { useContribuyentesStore } from '@/stores/contribuyentes'

import IconEmail from '@/icons/IconEmail.vue'
import IconPhone from '@/icons/IconPhone.vue'
import IconArrowLeft from '@/icons/IconArrowLeft.vue'
import IconPassword from '@/icons/IconPassword.vue'
import IconInfo from '@/icons/IconInfo.vue'
import IconCopy from '@/icons/IconCopy.vue'
import IconEdit from '@/icons/IconEdit.vue'
import { storeToRefs } from 'pinia'
import IconBriefcase from '@/icons/IconBriefcase.vue'
import IconTrash from '@/icons/IconTrash.vue'

const route = useRoute()
const router = useRouter()

const contribuyenteStore = useContribuyenteStore()
const { regimenNumberStringToText } = contribuyenteStore

const contribuyentesStore = useContribuyentesStore()
const { contribuyentes } = storeToRefs(contribuyentesStore)
const { getContribuyenteById } = contribuyentesStore

const taxplayer = useTaxplayerStore()
const { setShowFormEditContribuyente } = taxplayer

const contribuyenteDetail = ref({})

const idParam = route.params.id

watchEffect(async () => {
  try {
    /* buscar el contribuyente en el store */
    if (contribuyentes.value.length > 0) {
      /* para este caso el obneto viene formateado */
      const data = await getContribuyenteById({ id: idParam })

      contribuyenteDetail.value = {
        rfc: data.rfc,
        clave: data.clave,
        tipo: data.tipo,
        regimenFiscal: data.regimenes,
        contribuyente: data.contribuyente,
        telefono: data.telefono,
        correo: data.correo,
        fechaNacimiento: data.fechaDeNacimiento,
        persona: data.persona
      }
    } else {
      /* mandar la petición para obtener los datos del contribuyente */
      const { data } = await supabase.from('contribuyentes').select('*').eq('id', idParam)
      const response = data[0]
      if (response.tipo === 1) {
        const [name, fatherLastName, motherLastName] = response.contribuyente.split('_')

        contribuyenteDetail.value = {
          rfc: response.rfc,
          clave: response.clave,
          tipo: response.tipo,
          regimenFiscal: response.regimenes,
          contribuyente: `${name} ${fatherLastName} ${motherLastName}`,
          telefono: response.telefono,
          correo: response.correo,
          persona: {
            nombre: name,
            apellidoPaterno: fatherLastName,
            apellidoMaterno: motherLastName
          }
        }
      } else {
        contribuyenteDetail.value = {
          rfc: response.rfc,
          clave: response.clave,
          tipo: response.tipo,
          regimenFiscal: response.regimenes,
          contribuyente: response.contribuyente,
          telefono: response.telefono,
          correo: response.correo,
          persona: {
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: ''
          }
        }
      }
    }
  } catch (error) {
    console.error('Error al obtener el usuario: ', error)
  }
})

function back() {
  router.go(-1)
}

function handleBtnShowFormEdit() {
  setShowFormEditContribuyente(true)
}

async function deleteContribuyente() {
  try {
    const { error } = await supabase.from('contribuyentes').delete().eq('id', idParam)
    if (error) {
      throw new Error('Error al eliminar el contribuyente')
    }
    router.push({ name: 'users' })
  } catch (error) {
    console.error('Error al eliminar el contribuyente: ', error)
  }
}

async function handleUpdateData(contribuyenteEdit) {
  if (contribuyenteEdit.tipo === 1) {
    const { nombre, apellidoPaterno, apellidoMaterno } = contribuyenteEdit.persona
    const contribuyente = `${nombre}_${apellidoPaterno}_${apellidoMaterno}`
    const { data, error } = await supabase
      .from('contribuyentes')
      .update({
        contribuyente,
        rfc: contribuyenteEdit.rfc,
        clave: contribuyenteEdit.clave,
        correo: contribuyenteEdit.correo,
        telefono: contribuyenteEdit.telefono
      })
      .eq('id', idParam)
      .select()

    console.log(data)
    contribuyenteDetail.value.contribuyente = contribuyente
  } else {
    const { data, error } = await supabase
      .from('contribuyentes')
      .update({
        contribuyente: contribuyenteEdit.contribuyente,
        rfc: contribuyenteEdit.rfc,
        clave: contribuyenteEdit.clave,
        correo: contribuyenteEdit.correo,
        telefono: contribuyenteEdit.telefono
      })
      .eq('id', idParam)
      .select()
    console.log(data)
    contribuyenteDetail.value.contribuyente = contribuyenteEdit.contribuyente
  }

  contribuyenteDetail.value.rfc = contribuyenteEdit.rfc
  contribuyenteDetail.value.clave = contribuyenteEdit.clave
  contribuyenteDetail.value.correo = contribuyenteEdit.correo
  contribuyenteDetail.value.telefono = contribuyenteEdit.telefono
  setShowFormEditContribuyente(false)
}
</script>

<template>
  <nav class="navegator">
    <button type="button" class="btn btn--back" @click="back">
      <IconArrowLeft />
    </button>
    <h3>{{ contribuyenteDetail.contribuyente }}</h3>

    <button type="button" class="btn btn--back" @click="handleBtnShowFormEdit">
      <IconEdit />
    </button>
  </nav>

  <article class="content--data">
    <section class="section">
      <header>
        <h3>{{ TIPO_CONTRIBUYENTE[contribuyenteDetail.tipo] }}</h3>
      </header>
      <div class="content--cards">
        <CardIcon v-for="tax in contribuyenteDetail.regimenFiscal" :key="tax">
          <template #icono><IconBriefcase /></template>
          <template #titulo>Regimen fiscal</template>
          <template #descripcion>{{ regimenNumberStringToText({ numbreString: tax }) }}</template>
        </CardIcon>
      </div>
    </section>
    <section class="section">
      <header>
        <h3>Información fiscal</h3>
      </header>
      <div class="content--cards">
        <CardIcon>
          <template #icono><IconInfo /></template>
          <template #titulo>RFC</template>
          <template #descripcion> {{ contribuyenteDetail.rfc }} </template>
          <template #boton>
            <button class="btn btn--clipboard" @click="handleActiveInfoFiscal">
              <IconCopy />
            </button>
          </template>
        </CardIcon>
        <CardIcon>
          <template #icono><IconPassword /></template>
          <template #titulo>Contraseña</template>
          <template #descripcion> * * * * * * * * </template>
          <template #boton>
            <button class="btn btn--clipboard" @click="handleActiveInfoFiscal">
              <IconCopy />
            </button>
          </template>
        </CardIcon>
      </div>
    </section>
    <section class="section">
      <header>
        <h3>Información de contacto</h3>
      </header>
      <div class="content--cards">
        <CardIcon>
          <template #icono><IconEmail /></template>
          <template #titulo>Correo electrónico</template>
          <template #descripcion> {{ contribuyenteDetail.correo }} </template>
        </CardIcon>
        <CardIcon>
          <template #icono><IconPhone /></template>
          <template #titulo>Telefono</template>
          <template #descripcion> {{ contribuyenteDetail.telefono }} </template>
        </CardIcon>
      </div>
    </section>
  </article>

  <button class="btn--delete" type="button" @click="deleteContribuyente">
    <IconTrash />
    Eliminar contribuyente
  </button>
  <FormEdit :contribuyente="contribuyenteDetail" @update-user="handleUpdateData" />
</template>

<style scoped>
.navegator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;
}

.content--data {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0;
}

.section {
  background-color: #181818;
  border-radius: 20px;
  padding: 1rem 1.2rem;
}

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  small {
    font-size: 0.75rem;
    letter-spacing: 0.021rem;
    color: #ffffff93;
  }
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: transparent;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
}

.btn--back {
  color: white;
  &:hover {
    background-color: #087fc422;
  }
}

.btn--clipboard {
  display: flex;
  color: white;

  &:hover {
    background-color: #087ec4;
  }
}

.content--cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 0;
}

.btn--delete {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: none;
  background-color: hsl(0, 12%, 5%);

  color: white;
  border-radius: 9px;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #dc4c4c;
  }
}
</style>
