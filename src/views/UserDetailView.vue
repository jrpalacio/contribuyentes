<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import IconArrowLeft from '@/icons/IconArrowLeft.vue'
import { supabase } from '@/supabase'
import { REGIMEN_FISCAL_DESCRIPTION, TIPO_CONTRIBUYENTE } from '@/constants/SAT'
import CardIcon from '@/components/CardIcon.vue'
import IconEmail from '@/icons/IconEmail.vue'
import IconPhone from '@/icons/IconPhone.vue'
import IconPassword from '@/icons/IconPassword.vue'
import IconInfo from '@/icons/IconInfo.vue'
import IconCopy from '@/icons/IconCopy.vue'
import FormEdit from '@/components/FormEdit.vue'
import { useTaxplayerStore } from '@/stores/taxpayer'
import IconEdit from '@/icons/IconEdit.vue'

const route = useRoute()
const router = useRouter()

const contrib = useTaxplayerStore()
const { setShowFormEditContribuyente } = contrib

const contribuyente = ref({})

const idParam = route.params.id

onMounted(async () => {
  try {
    const { data: resContribuyente } = await supabase
      .from('contribuyentes')
      .select('*')
      .eq('id', idParam)

    const { data: resRegimenes } = await supabase
      .from('regimen_por_contribuyente')
      .select('id_regimen')
      .eq('id_contribuyente', idParam)

    contribuyente.value = {
      rfc: resContribuyente[0].rfc,
      clave: resContribuyente[0].clave,
      tipo: resContribuyente[0].tipo,
      regimenFiscal: resRegimenes.map((regimen) => regimen.id_regimen),
      nombre: resContribuyente[0].nombre,
      apellidoPaterno: resContribuyente[0].apellido_paterno,
      apellidoMaterno: resContribuyente[0].apellido_materno,
      telefono: resContribuyente[0].telefono,
      correo: resContribuyente[0].correo
    }
  } catch (error) {
    console.error('Error al obtener el usuario: ', error)
  }
})

const fullName = computed(() => {
  return `${contribuyente.value.nombre} ${contribuyente.value.apellidoPaterno} ${contribuyente.value.apellidoMaterno}`
})

function back() {
  router.go(-1)
}

function handleBtnShowFormEdit() {
  setShowFormEditContribuyente(true)
}
</script>

<template>
  <nav class="navegator">
    <button type="button" class="btn--back" @click="back">
      <IconArrowLeft />
    </button>
    <h3>Detalles</h3>
    <button type="button" class="btn--edit" @click="handleBtnShowFormEdit"><IconEdit /></button>
  </nav>
  <article class="content--profile">
    <header class="profile--header">
      <h3>{{ fullName }}</h3>
      <p>({{ TIPO_CONTRIBUYENTE[contribuyente.tipo] }})</p>
    </header>
  </article>
  <article class="content--data">
    <section>
      <header>
        <h3>Régimen fiscal</h3>
      </header>
      <ul>
        <template v-for="tax in contribuyente.regimenFiscal" :key="tax">
          <li class="content--rf">
            <p>{{ REGIMEN_FISCAL_DESCRIPTION[tax] }}</p>
          </li>
        </template>
      </ul>
    </section>
    <section>
      <header>
        <h3>Información fiscal</h3>
      </header>
      <div class="content--cards">
        <CardIcon>
          <template #icono><IconInfo /></template>
          <template #titulo>RFC</template>
          <template #descripcion> {{ contribuyente.rfc }} </template>
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
    <section>
      <header>
        <h3>Información de contacto</h3>
      </header>
      <div class="content--cards">
        <CardIcon>
          <template #icono><IconEmail /></template>
          <template #titulo>Correo electrónico</template>
          <template #descripcion> {{ contribuyente.correo }} </template>
        </CardIcon>
        <CardIcon>
          <template #icono><IconPhone /></template>
          <template #titulo>Telefono</template>
          <template #descripcion> {{ contribuyente.telefono }} </template>
        </CardIcon>
      </div>
    </section>
  </article>

  <FormEdit :user="contribuyente" />
</template>

<style scoped>
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
}
.btn--edit {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  color: #2f4858;
  background-color: #eee683;
}
.navegator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: center;
}

.content--profile {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile--header {
  display: flex;
  flex-direction: column;
  align-items: center;
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

@media (width >= 1024px) {
  .content--profile {
    flex-direction: row;
    align-items: start;
  }
  .profile--header {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
}
</style>
