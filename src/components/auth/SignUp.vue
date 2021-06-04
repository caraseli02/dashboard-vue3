<template>
  <div
    class="
      mx-auto
      w-full
      max-w-sm
      flex-1
      z-10
      transform
      p-2
      flex
      justify-center
      items-center
      flex-col
    "
  >
    <div class="mx-auto w-full max-w-sm z-10 transform p-2 self-center mb-6">
      <h1
        class="
          w-screen
          text-3xl
          justiyf-start
          leading-9
          font-extrabold
          text-primary
        "
      >
        APIMOSA APP
      </h1>
      <span class="mt-2 text-lg leading-5 text-secondary max-w">
        Crear Cuenta
      </span>
    </div>
    <!-- <transition name="fade">
          <p
            class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
            v-if="error"
          >
            {{ error }}
            <button
              @click="error = null"
              class="w-full flex justify-center py-2 px-4 border mt-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Cerrar
            </button>
          </p>
        </transition> -->
    <DynamicForm
      class="w-full"
      :validation-schema="formSchema.validation"
      :schema="formSchema"
      :initial-values="formSchema.values"
      :acceptTerms="acceptTerms"
    />
    <div class="flex mt-6 text-primary">
      <label class="flex items-center"
        ><input
          required="required"
          type="checkbox"
          class="form-checkbox"
          v-model="acceptTerms"
        /><span class="ml-2"
          >¿ He leído y acepto los
          <a href="/terminos-y-condiciones" class="font-bold text-secondary"
            >Términos y condiciones
          </a>
          y la
          <a href="/politica-privacidad/" class="font-bold text-secondary">
            Política de privacidad</a
          >
          ?
        </span></label
      >
    </div>
    <!-- <form @submit.prevent="validate">
              <div v-for="(field, index) in inputs" :key="index" class="mt-6">
                <label
                  :for="field.id"
                  class="block text-sm font-medium leading-5 text-secondary"
                >
                  {{ field.placeholder }}
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    :placeholder="field.placeholder"
                    :type="field.type"
                    v-model="field.model"
                    :id="field.id"
                    :pattern="field.pattern"
                    required
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      placeholder-gray-400
                      focus:outline-none
                      focus:ring-blue
                      focus:border-blue-300
                      transition
                      duration-150
                      ease-in-out
                      sm:text-sm
                      sm:leading-5
                    "
                  />
                </div>
              </div>
              <div class="relative">
                <label
                  class="
                    block
                    mb-2
                    uppercase
                    tracking-wide
                    text-secondary text-xs
                    mt-4
                  "
                  for="grid-state"
                >
                  Centro de Trabajo
                </label>
                <select
                  class="
                    block
                    appearance-none
                    w-full
                    bg-primary
                    border border-gray-200
                    text-secondary
                    py-3
                    px-4
                    pr-8
                    rounded
                    leading-tight
                    focus:outline-none
                    focus:bg-white
                    focus:border-gray-500
                  "
                  v-model="workplace"
                  id="grid-state"
                  required
                >
                  <option value="Palma">Palma de Mallorca</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Malaga">Malaga</option>
                  <option value="Tenerife">Tenerife</option>
                  <option value="Ibiza">Ibiza</option>
                </select>
                <div
                  class="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-0
                    flex
                    items-center
                    px-2
                    text-secondary
                  "
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex mt-6 text-primary">
                <label class="flex items-center">
                  <input required type="checkbox" class="form-checkbox" />
                  <span class="ml-2"
                    >¿ He leído y acepto los
                    <router-link
                      class="font-bold text-secondary"
                      to="/terminos-y-condiciones"
                      >Términos y condiciones
                    </router-link>
                    y la
                    <router-link
                      class="font-bold text-secondary"
                      to="/politica-privacidad/"
                    >
                      Política de privacidad</router-link
                    >
                    ?
                  </span>
                </label>
              </div>
              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button type="submit" class="btn-form uppercase">
                    Crear cuenta
                  </button>
                </span>
              </div>
            </form> -->
  </div>
</template>

<script lang="ts">
// import { mapActions, mapGetters } from "vuex";
// import ForgotPassword from "@/components/auth/ForgotPassword.vue";
// VUE
import { watch, defineComponent, ref } from "vue";
// SETUP
import { user, google } from ".";
import router from "@/router";
// TS INTERFACE
import IFormSchema from "@/components/auth/interface";
// COMPONENTS
import DynamicForm from "@/components/auth/DynamicForm.vue";
// FORM Validation
import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "Debe rellenar este campo",
  },
  string: {
    email: "Por favor introduzca un email valido",
    required: "Debe rellenar este campo",
  },
});

export default defineComponent({
  name: "Login",
  props: {
    loginReturnUrl: { type: String, default: "/dashboard" },
  },
  setup(props) {
    const acceptTerms = ref<boolean>(false);
    const formSchema = {
      fields: [
        {
          label: "E-mail *",
          name: "email",
          as: "input",
          type: "email",
        },
        {
          label: "Contraseña *",
          name: "password",
          as: "input",
          type: "password",
        },
        {
          label: "Repetir contraseña *",
          name: "password2",
          as: "input",
          type: "password",
        },
        {
          label: "Nombre *",
          name: "name",
          as: "input",
          type: "text",
        },
        {
          label: "Apellido *",
          name: "surname",
          as: "input",
          type: "text",
        },
        {
          label: "DNI NIE *",
          name: "dniNie",
          as: "input",
          type: "text",
        },
      ],
      values: {
        email: "test@test.com",
      },
      validation: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
        password2: yup.string().required(),
        name: yup.string().required(),
        surname: yup.string().required(),
        dniNie: yup.string().required(),
      }),
    } as unknown | IFormSchema;

    watch(
      () => user.value,
      (newUser) => {
        if (newUser) {
          router.push(props.loginReturnUrl);
        }
      }
    );

    return {
      google,
      user,
      formSchema,
      acceptTerms,
    };
  },
  components: {
    DynamicForm,
  },
});
</script>
