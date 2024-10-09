<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VTabs from '@/components/VTabs.vue'
import IconEdit from '@/icons/IconEdit.vue'

const route = useRoute()
const router = useRouter()
const activeInfoFiscal = ref(true)
const activeInfoPersonal = ref(true)
const activeInfoContacto = ref(true)

const item = route.params.id

function back() {
  router.go(-1)
}

function handleActiveInfoFiscal() {
  activeInfoFiscal.value = !activeInfoFiscal.value
}

function handleActiveInfoPersonal() {
  activeInfoPersonal.value = !activeInfoPersonal.value
}

function handleActiveInfoContacto() {
  activeInfoContacto.value = !activeInfoContacto.value
}
const user = {
  id: 1,
  name: 'José',
  fatherLastName: 'Reyes',
  motherLastName: 'Palacio',
  tel: '7223563625',
  email: 'jrpalacio.dev@gmail.com',
  rfc: 'REPJ891214QE8',
  pass: '@jRP180914',
  type: 1,
  taxSystem: ['603', '603']
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
          <input type="text" :value="user.rfc" :disabled="activeInfoFiscal" />
        </label>
        <label>
          Contraseña
          <input type="password" :value="user.pass" :disabled="activeInfoFiscal" />
        </label>
        <label>
          Tipo de persona
          <input type="text" :value="user.type" :disabled="activeInfoFiscal" />
        </label>

        <label>
          Régimen fiscal
          <input type="text" :value="user.taxSystem" :disabled="activeInfoFiscal" />
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
          <input type="text" :value="user.name" :disabled="activeInfoPersonal" />
        </label>
        <label>
          Apellido paterno
          <input type="text" :value="user.fatherLastName" :disabled="activeInfoPersonal" />
        </label>
        <label>
          Apellido materno
          <input type="text" :value="user.motherLastName" :disabled="activeInfoPersonal" />
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
          <input type="text" :value="user.tel" :disabled="activeInfoContacto" />
        </label>
        <label>
          Correo
          <input type="text" :value="user.email" :disabled="activeInfoContacto" />
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
