<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'

import router from '@/router'
import VTabs from '@/components/VTabs.vue'
import FiscalesData from '@/components/FiscalesData.vue'
import { useContribuyenteStore } from '@/stores/contribuyente'
import { storeToRefs } from 'pinia'

const contribuyente = useContribuyenteStore()
const { nombre, apellidoPaterno, apellidoMaterno, rfc, clave, telefono, correo, tipo, regimenes } =
  storeToRefs(contribuyente)

const uidUser = ref('')

onMounted(async () => {
  const { data: response, error } = await supabase.auth.getUser()
  if (error) throw error
  uidUser.value = response.user.id
})
async function submitForm() {
  console.log(nombre.value)
  console.log(apellidoPaterno.value)
  console.log(apellidoMaterno.value)
  console.log(telefono.value)
  console.log(correo.value)
  console.log(rfc.value)
  console.log(tipo.value)
  console.log(clave.value)

  console.log(regimenes.value)

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
        regimenes: regimenes.value
      }
    ])
    .select()

  if (error) throw error

  console.log(data)

  router.push('/')
}

const cancelEdit = () => {}
</script>

<template>
  <article class="form-edit">
    <header>
      <h2>Registro de contribuyente</h2>
      <p>Ingresa los datos del nuevo contribuyente</p>
    </header>
    <form @submit.prevent="submitForm">
      <VTabs>
        <template #tab1>
          <FiscalesData />
          <section>
            <header class="header">
              <h3>Datos de acceso</h3>
            </header>
            <label>
              RFC:
              <input type="text" v-model="rfc" required />
            </label>
            <label>
              Contraseña:
              <input type="password" v-model="clave" required />
            </label>
          </section>
        </template>
        <template #tab2>
          <section>
            <header>
              <h3>Datos personales</h3>
            </header>
            <label>
              Nombre:
              <input type="text" v-model="nombre" required />
            </label>
            <label>
              Apellido Paterno:
              <input type="text" v-model="apellidoPaterno" required />
            </label>
            <label>
              Apellido Materno:
              <input type="text" v-model="apellidoMaterno" required />
            </label>
          </section>
        </template>
        <template #tab3>
          <section>
            <header>
              <h3>Contacto</h3>
            </header>
            <label>
              Correo Electrónico:
              <input type="email" v-model="correo" required />
            </label>
            <label>
              Teléfono:
              <input type="tel" v-model="telefono" required />
            </label>
          </section>
        </template>
      </VTabs>

      <button type="submit">Guardar</button>
      <button type="button" @click="cancelEdit">Cancelar</button>
    </form>
  </article>
</template>

<style scoped>
.header {
  margin-top: 0.8rem;
}
label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
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

.form-edit {
  background-color: #171f26;
  border-radius: 1.1rem;
  padding: 1.5rem;
  margin: 1rem 0.4rem;
}
</style>
