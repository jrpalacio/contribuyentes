<script setup>
import { ref, onMounted } from 'vue'
import { useRoute /* , useRouter */ } from 'vue-router'
import VTabs from '@/components/VTabs.vue'
import IconEdit from '@/icons/IconEdit.vue'
import { supabase } from '@/supabase'
import { REGIMEN_FISCAL_DESCRIPTION, TIPO_CONTRIBUYENTE } from '@/constants/SAT'

const route = useRoute()
/* const router = useRouter() */
const activeInfoFiscal = ref(true)
const activeInfoPersonal = ref(true)
const activeInfoContacto = ref(true)

const userDetail = ref({})

const idParam = route.params.id

onMounted(async () => {
  try {
    const { data: contribuyente } = await supabase
      .from('contribuyentes')
      .select('*')
      .eq('id', idParam)

    const { data: regimenes } = await supabase
      .from('regimen_por_contribuyente')
      .select('id_regimen')
      .eq('id_contribuyente', idParam)

    userDetail.value = {
      rfc: contribuyente[0].rfc,
      pass: contribuyente[0].clave,
      type: contribuyente[0].tipo,
      taxSystem: regimenes.map((regimen) => regimen.id_regimen),
      name: contribuyente[0].nombre,
      fatherLastName: contribuyente[0].apellido_paterno,
      motherLastName: contribuyente[0].apellido_materno,
      tel: contribuyente[0].telefono,
      email: contribuyente[0].correo
    }
  } catch (error) {
    console.error('Error al obtener el usuario: ', error)
  }
})

/* function back() {
  router.go(-1)
} */

function handleActiveInfoFiscal() {
  activeInfoFiscal.value = !activeInfoFiscal.value
}

function handleActiveInfoPersonal() {
  activeInfoPersonal.value = !activeInfoPersonal.value
}

function handleActiveInfoContacto() {
  activeInfoContacto.value = !activeInfoContacto.value
}
</script>

<template>
  <article class="referenciados">
    <header>
      <h2>Referenciados</h2>
    </header>
    <p>Por el momento no representas referenciados.</p>
  </article>
  <VTabs>
    <template v-slot:tab1>
      <div class="groupform">
        <header class="groupfrom--header">
          <h2>Información fiscal</h2>
          <button @click="handleActiveInfoFiscal">
            <IconEdit />
          </button>
        </header>
        <label>
          RFC
          <input type="text" v-model="userDetail.rfc" :disabled="activeInfoFiscal" />
        </label>
        <label>
          Contraseña
          <input type="password" v-model="userDetail.pass" :disabled="activeInfoFiscal" />
        </label>
        <label>
          Tipo de persona
          <input
            type="text"
            v-model="TIPO_CONTRIBUYENTE[userDetail.type]"
            :disabled="activeInfoFiscal"
          />
        </label>

        <label>
          Régimen fiscal
          <template v-for="tax in userDetail.taxSystem" :key="tax">
            <input
              type="text"
              :value="REGIMEN_FISCAL_DESCRIPTION[tax]"
              :disabled="activeInfoFiscal"
            />
          </template>
        </label>
      </div>
    </template>
    <template v-slot:tab2>
      <div class="groupform">
        <header class="groupfrom--header">
          <h2>Información personal</h2>
          <button @click="handleActiveInfoPersonal">
            <IconEdit />
          </button>
        </header>
        <label>
          Nombre
          <input type="text" v-model="userDetail.name" :disabled="activeInfoPersonal" />
        </label>
        <label>
          Apellido paterno
          <input type="text" v-model="userDetail.fatherLastName" :disabled="activeInfoPersonal" />
        </label>
        <label>
          Apellido materno
          <input type="text" v-model="userDetail.motherLastName" :disabled="activeInfoPersonal" />
        </label>
      </div>
    </template>
    <template v-slot:tab3>
      <div class="groupform">
        <header class="groupfrom--header">
          <h2>Información de contacto</h2>
          <button @click="handleActiveInfoContacto">
            <IconEdit />
          </button>
        </header>
        <label>
          Teléfono
          <input type="text" v-model="userDetail.tel" :disabled="activeInfoContacto" />
        </label>
        <label>
          Correo
          <input type="text" v-model="userDetail.email" :disabled="activeInfoContacto" />
        </label>
      </div>
    </template>
  </VTabs>
</template>

<style scoped>
.nav--tabs {
  padding: 1rem;
}
.tabs {
  display: flex;
  gap: 1rem;
  list-style: none;
}
.tab {
  padding: 0.5rem 1rem;
  background-color: #2d323a;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
}
.groupform {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
}

.groupfrom--header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #1da7ff;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 13px;
    height: 2.6rem;
    width: 2.6rem;
    color: #fff;
  }
}

.referenciados {
  margin-bottom: 2rem;
}
</style>
