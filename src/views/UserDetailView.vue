<script setup>
import { supabase } from '@/supabase'
import { ref, onMounted, computed } from 'vue'
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
/* import IconEdit from '@/icons/IconEdit.vue' */
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()

const contribuyenteStore = useContribuyenteStore()
const { regimenNumberStringToText } = contribuyenteStore

const contribuyentesStore = useContribuyentesStore()
const { contribuyentes } = storeToRefs(contribuyentesStore)
const { getContribuyenteById } = contribuyentesStore

const taxplayer = useTaxplayerStore()
const { setShowFormEditContribuyente } = taxplayer

const contribuyenteLocal = ref({})

const idParam = route.params.id

onMounted(async () => {
  try {
    if (contribuyentes.value.length > 0) {
      const data = await getContribuyenteById({ id: idParam })

      contribuyenteLocal.value = {
        rfc: data.rfc,
        clave: data.clave,
        tipo: data.tipo,
        regimenFiscal: data.regimenes,
        contribuyente: data.contribuyente,
        telefono: data.telefono,
        correo: data.correo,
        fechaNacimiento: data.fechaDeNacimiento
      }
    } else {
      const { data: resContribuyente } = await supabase
        .from('contribuyentes')
        .select('*')
        .eq('id', idParam)

      contribuyenteLocal.value = {
        rfc: resContribuyente[0].rfc,
        clave: resContribuyente[0].clave,
        tipo: resContribuyente[0].tipo,
        regimenFiscal: resContribuyente[0].regimenes,
        contribuyente: resContribuyente[0].contribuyente,
        telefono: resContribuyente[0].telefono,
        correo: resContribuyente[0].correo
      }
    }
  } catch (error) {
    console.error('Error al obtener el usuario: ', error)
  }
})

const fullName = computed(() => {
  return `${contribuyenteLocal.value.contribuyente}`
})

function back() {
  router.go(-1)
}

/* function handleBtnShowFormEdit() {
  setShowFormEditContribuyente(true)
} */
</script>

<template>
  <nav class="navegator">
    <button type="button" class="btn--back" @click="back">
      <IconArrowLeft />
    </button>
    <h3>Detalle del contribuyente</h3>
    <div></div>
  </nav>

  <article class="content--data">
    <section class="section profile">
      <figure class="avatar">
        <img src="/src/assets/tax.webp" alt="" />
      </figure>
      <div>
        <div class="space-between">
          <h2>{{ fullName }}</h2>
          <p v-if="contribuyenteLocal.fechaNacimiento">
            <small> 🎂 {{ contribuyenteLocal.fechaNacimiento }}</small>
          </p>
        </div>

        <p>{{ TIPO_CONTRIBUYENTE[contribuyenteLocal.tipo] }}</p>
        <ul class="list--regimenes">
          <template v-for="tax in contribuyenteLocal.regimenFiscal" :key="tax">
            <li class="content--rf">
              <p>💼 {{ regimenNumberStringToText({ numbreString: tax }) }}</p>
            </li>
          </template>
        </ul>
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
          <template #descripcion> {{ contribuyenteLocal.rfc }} </template>
          <template #boton>
            <button class="button--clipboard" @click="handleActiveInfoFiscal">
              <IconCopy /> Copiar
            </button>
          </template>
        </CardIcon>
        <CardIcon>
          <template #icono><IconPassword /></template>
          <template #titulo>Contraseña</template>
          <template #descripcion> * * * * * * * * </template>
          <template #boton>
            <button class="button--clipboard" @click="handleActiveInfoFiscal">
              <IconCopy /> Copiar
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
          <template #descripcion> {{ contribuyenteLocal.correo }} </template>
        </CardIcon>
        <CardIcon>
          <template #icono><IconPhone /></template>
          <template #titulo>Telefono</template>
          <template #descripcion> {{ contribuyenteLocal.telefono }} </template>
        </CardIcon>
      </div>
    </section>
  </article>

  <FormEdit :contribuyenteLocal />
</template>

<style scoped>
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  small {
    font-size: 0.75rem;
    letter-spacing: 0.021rem;
    color: #fb4f93;
  }
}
.avatar {
  /* hacer que la imagen no se deforme */
  display: grid;
  place-items: center;
  background-color: #ffffff;
  text-align: center;
  border-radius: 50%;

  width: 72px;
  height: 72px;
  min-width: 72px;
  img {
    width: 56px;
    object-fit: cover;
  }
}

.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.section {
  padding: 1rem;
  background-color: #212327;

  color: white;
  border-radius: 20px;
}
.btn--back {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: transparent;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #087fc458;
  }
}

.navegator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: center;
}

.button--clipboard {
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 0.5rem;
  background-color: transparent;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0.5em;
  cursor: pointer;

  &:hover {
    background-color: #087ec4;
  }
}

.content--rf {
  display: flex;
  justify-content: space-between;
}

.content--data {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
}

.content--cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 0;
}

.list--regimenes {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  li {
    color: #dfe0df;
    font-weight: 500;
    font-size: 0.75rem;
    letter-spacing: 0.021rem;
    padding: 0.1rem 0.5rem;
  }
}

@media (width >= 1024px) {
  .profile--header {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
}
</style>
