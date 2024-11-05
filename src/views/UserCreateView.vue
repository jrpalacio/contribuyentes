<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'

import router from '@/router'
import FiscalesData from '@/components/FiscalesData.vue'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { storeToRefs } from 'pinia'

const contribuyente = useContribuyenteStore()
const {
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  rfc,
  clave,
  telefono,
  correo,
  tipo,
  regimenes,
  empresa
} = storeToRefs(contribuyente)
const {
  setNombre,
  setApellidoMaterno,
  setApellidoPaterno,
  setClave,
  setCorreo,
  setRegimenes,
  setRfc,
  setTelefono,
  setTipo
} = contribuyente

const uidUser = ref('')

onMounted(async () => {
  const { data: response, error } = await supabase.auth.getUser()
  if (error) throw error
  uidUser.value = response.user.id
})

async function submitForm() {
  const { data, error } = await supabase
    .from('contribuyentes')
    .insert([
      {
        nombre: nombre.value,
        apellido_paterno: apellidoPaterno.value,
        apellido_materno: apellidoMaterno.value,
        telefono: telefono.value,
        correo: correo.value,
        rfc: rfc.value,
        tipo: tipo.value,
        clave: clave.value,
        user_id: uidUser.value,
        regimenes: regimenes.value,
        empresa: empresa.value
      }
    ])
    .select()

  if (error) throw error
  console.log(data)
  setNombre('')
  setApellidoMaterno('')
  setApellidoPaterno('')
  setClave('')
  setCorreo('')
  setRegimenes([])
  setRfc('')
  setTelefono('')
  setTipo(1)

  router.push('/')
}

const cancelEdit = () => {}
</script>

<template>
  <article class="form-edit">
    <header class="form-edit__title">
      <h2>Registro de contribuyente</h2>
      <p>Ingresa los datos del nuevo contribuyente</p>
    </header>
    <form @submit.prevent="submitForm">
      <FiscalesData />
      <section>
        <header>
          <h3>Información de acceso</h3>
          <p>
            La Información que debes introducir en la que te va a permitir ingresar al portal del
            SAT
          </p>
        </header>
        <div class="content--column">
          <label>
            RFC:
            <input type="text" v-model="rfc" required />
          </label>
          <label>
            Contraseña:
            <input type="password" v-model="clave" required />
          </label>
        </div>
      </section>
      <section>
        <template v-if="tipo === 1">
          <header>
            <h3>Información personal</h3>
          </header>
          <label>
            Nombre:
            <input type="text" v-model="nombre" required />
          </label>
          <div class="content--column">
            <label>
              Apellido paterno:
              <input type="text" v-model="apellidoPaterno" required />
            </label>
            <label>
              Apellido materno:
              <input type="text" v-model="apellidoMaterno" required />
            </label>
          </div>
        </template>
        <template v-else>
          <header>
            <h3>Información de la empresa</h3>
          </header>
          <label>
            Nombre de la empresa:
            <input type="text" v-model="empresa" required />
          </label>
        </template>
      </section>
      <section>
        <header>
          <h3>Información de contacto</h3>
          <p>Estos datos permitiran manterte en contacto con el contribuyente</p>
        </header>
        <div class="content--column">
          <label>
            Teléfono:
            <input type="tel" v-model="telefono" required />
          </label>
          <label>
            Correo electrónico:
            <input type="email" v-model="correo" required />
          </label>
        </div>
      </section>

      <button type="submit">Guardar</button>
      <button type="button" @click="cancelEdit">Cancelar</button>
    </form>
  </article>
</template>

<style scoped>
.form-edit {
  padding: 0;
}
.form-edit__title {
  margin: 1.16rem 0;
}

form {
  background-color: #1f2937;
  border-radius: 0.8rem;
  padding: 1.2rem 0.5rem;
}

section {
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & header {
    margin-top: 0.2rem;
  }
}

label {
  display: block;
  color: #d1d5db;
  & input {
    margin-top: 0.2rem;
  }
}

input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #404650;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  font-size: 1rem;
  height: 56px;
  padding: 6px 12px 6px 16px;
  width: 100%;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.0063rem;
  line-height: 1.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
}

button:hover {
  background-color: #0056b3;
}

button[type='button'] {
  background-color: #6c757d;
}

button[type='button']:hover {
  background-color: #5a6268;
}
.content--column {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
}
@media (width >= 1024px) {
  form {
    padding: 2rem 1.6rem;
  }
  .form-edit {
    padding: 1rem;
  }
  .content--column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
}
</style>
