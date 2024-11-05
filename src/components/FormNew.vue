<script setup>
import { onMounted, ref } from 'vue'
import { useTaxplayerStore } from '@/stores/taxpayer'
import { storeToRefs } from 'pinia'
import { supabase } from '@/supabase'

/* import API_REGIMENES_FISCALES from '@/api/RegimenesFiscales' */
import router from '@/router'

const contribuyente = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  clave: '',
  telefono: '',
  correo: '',
  tipo: 1
})

const regimenesParaMorales = ref([])
const regimenesParaFisicas = ref([])

const form = useTaxplayerStore()
const { showFormNewContribuyente } = storeToRefs(form)
const { setShowFormNewContribuyente } = form

const uidUser = ref('')

onMounted(async () => {
  const { data: response, error } = await supabase.auth.getUser()
  if (error) throw error
  uidUser.value = response.user.id

  regimenesParaMorales.value = API_REGIMENES_FISCALES.filter((regimen) => regimen.esMoral)
  regimenesParaFisicas.value = API_REGIMENES_FISCALES.filter((regimen) => regimen.esFisica)
})
async function submitForm() {
  const { data, error } = await supabase
    .from('contribuyentes')
    .insert([
      {
        nombre: contribuyente.value.nombre,
        apellido_paterno: contribuyente.value.apellidoPaterno,
        apellido_materno: contribuyente.value.apellidoMaterno,
        telefono: contribuyente.value.telefono,
        correo: contribuyente.value.correo,
        rfc: contribuyente.value.rfc,
        tipo: contribuyente.value.tipo,
        clave: contribuyente.value.clave,
        user_id: uidUser.value,
        regimenes: contribuyente.value.regimenes
      }
    ])
    .select()

  if (error) throw error

  console.log(data)
  setShowFormNewContribuyente(false)
  router.push('/')
}

const cancelEdit = () => {
  setShowFormNewContribuyente(false)
}
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div class="overlay" v-if="showFormNewContribuyente">
      <article class="form-edit">
        <header>
          <h2>Registro de contribuyente</h2>
          <p>Ingresa los datos del nuevo contribuyente</p>
        </header>
        <form @submit.prevent="submitForm">
          <section>
            <header>
              <h3>Datos personales</h3>
            </header>
            <label>
              Nombre:
              <input type="text" v-model="contribuyente.nombre" required />
            </label>
            <label>
              Apellido Paterno:
              <input type="text" v-model="contribuyente.apellidoPaterno" required />
            </label>
            <label>
              Apellido Materno:
              <input type="text" v-model="contribuyente.apellidoMaterno" required />
            </label>
          </section>
          <section>
            <header>
              <h3>Datos de acceso</h3>
            </header>
            <label>
              RFC:
              <input type="text" v-model="contribuyente.rfc" required />
            </label>
            <label>
              Contraseña:
              <input type="password" v-model="contribuyente.clave" required />
            </label>
          </section>

          <section>
            <header>
              <h3>Contacto</h3>
            </header>
            <label>
              Correo Electrónico:
              <input type="email" v-model="contribuyente.correo" required />
            </label>
            <label>
              Teléfono:
              <input type="tel" v-model="contribuyente.telefono" required />
            </label>
          </section>
          <section>
            <label>
              Tipo de contribuyente:
              <select v-model="contribuyente.tipo">
                <option value="1">Persona Física</option>
                <option value="2">Persona Moral</option>
              </select>
            </label>
          </section>
          <template v-if="contribuyente.tipo === 1">
            <section>
              <label>
                Régimen Fiscal para Personas Físicas:
                <select v-model="contribuyente.regimenes" multiple>
                  <option
                    v-for="regimen in regimenesParaMorales"
                    :key="regimen.id"
                    :value="regimen.id"
                  >
                    {{ regimen.descripcion }}
                  </option>
                </select>
              </label>
            </section>
          </template>
          <template v-else>
            <section>
              <label>
                Régimen Fiscal para Personas Morales:
                <select v-model="contribuyente.regimenes" multiple>
                  <option
                    v-for="regimen in regimenesParaFisicas"
                    :key="regimen.id"
                    :value="regimen.id"
                  >
                    {{ regimen.descripcion }}
                  </option>
                </select>
              </label>
            </section>
          </template>

          <button type="submit">Guardar</button>
          <button type="button" @click="cancelEdit">Cancelar</button>
        </form>
      </article>
    </div>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  z-index: 5;
}

.form-edit {
  width: 400px;
  height: 100%;
  background-color: #242424;
  box-shadow: -2px 0 5px rgba(0, 98, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
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
</style>
