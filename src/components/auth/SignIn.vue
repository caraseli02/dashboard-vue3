<template>
  <section id="signIn" class="h-screen">
    <div
      class="
        flex-1 flex flex-col
        md:flex-row
        justify-center
        pb-16
        md:px-16
        p-4
        sm:px-6
        lg:flex-none
        lg:px-20
        xl:px-24
      "
    >
      <div class="mx-auto w-full max-w-sm z-10 transform p-2 self-center my-10">
        <div class="mb-4">
          <h1 class="text-3xl leading-9 font-extrabold text-primary">
            APIMOSA APP
          </h1>
          <span class="mt-2 text-lg leading-5 text-secondary max-w">
            Login
          </span>
        </div>
        <div class="mt-6">
          <!-- <form>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-secondary"
              >
                Email address
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  type="email"
                  placeholder="apimosa@apimosa.com"
                  v-model="email"
                  id="email"
                  required
                  class="btn_auth"
                />
                <span>{{ emailError }}</span>
              </div>
            </div>

            <div class="mt-6">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-secondary"
              >
                Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  required
                  class="btn_auth"
                />
                <span>{{ passwordError }}</span>
              </div>
            </div>

            <div class="mt-6 flex flex-col items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  class="
                    form-checkbox
                    h-4
                    w-4
                    text-indigo-600
                    transition
                    duration-150
                    ease-in-out
                  "
                />
                <label
                  for="remember_me"
                  class="ml-2 block text-sm leading-5 text-secondary"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  @click.prevent="login(email, password)"
                  type="submit"
                  class="btn-form"
                >
                  Inicia sesión
                </button>
              </span>
            </div>
          </form> -->

          <DynamicForm
            :validation-schema="formSchema.validation"
            :schema="formSchema"
            :initial-values="formSchema.values"
          />
          <div class="text-lg leading-5 mt-4 text-center glass">
            <button
              class="
                font-medium
                text-xs text-primary
                focus:outline-none
                focus:underline
                transition
                ease-in-out
                duration-150
              "
              @click="showForgotPopUp = !showForgotPopUp"
            >
              ¿Has olvidado tu contraseña?
            </button>
            <transition name="slide-fade">
              <forgot-password
                v-on:closePopUp="showForgotPopUp = $event"
                v-if="showForgotPopUp"
              >
                <button
                  class="
                    bg-transparet
                    px-4
                    py-2
                    rounded
                    text-red-500
                    border border-red-600
                    transition
                    duration-500
                    ease-in-out
                    hover:bg-red-600
                    mt-4
                  "
                  type="button"
                  aria-label="like"
                  @click="showForgotPopUp = !showForgotPopUp"
                >
                  Cerrar
                </button>
              </forgot-password>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        glass
        rounded-none
        text-secondary
        w-full
        h-20
        text-lg
        flex
        justify-center
        items-center
        sm:max-w-sm
        sm:mx-auto
        sm:rounded-xl
      "
    >
      ¿No tienes cuenta?
      <router-link
        class="
          bg-secondary
          text-primary
          shadow-lg
          p-3
          rounded-lg
          ml-4
          font-bold
          text-xl
        "
        to="/sign-up"
      >
        Regístrate
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
// import { mapActions, mapGetters } from "vuex";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";
// VUE
import { watch, defineComponent } from "vue";
// SETUP
import { user, google, showForgotPopUp } from ".";
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
      ],
      values: {
        email: "example@example.com",
        password: "p@$$vv0rd",
      },
      validation: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
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
      showForgotPopUp,
    };
  },
  components: {
    DynamicForm,
    ForgotPassword,
  },
});

// export default {
//   data() {
//     return {
//       email: "",
//       password: "",
//       error: null,
//       showForgotPopUp: false,
//     };
//   },
//   components: { ForgotPassword },
//   computed: {
//     // mix the getters into computed with object spread operator
//     // ...mapGetters("notifi", ["notificationMessage"]),
//     // ...mapGetters({ theme: "theme/getTheme" }),
//   },
//   methods: {
//     // ...mapActions("auth", ["signInAction"]),
//     // ...mapActions("notifi", ["showNotification"]),
//     async signIn() {
//       //   this.error = null;
//       //   var pattern = /^\w+@apimosa.es$/;
//       //   if (!pattern.test(this.email) && this.email !== "vladwebapp@gmail.com") {
//       //     this.$alert("Solo se acceptan corros de @apimosa", "warning");
//       //     return;
//       //   }
//       //   await this.signInAction({
//       //     email: this.email,
//       //     password: this.password,
//       //   })
//       //     .then(() => {
//       //       if (this.notificationMessage) {
//       //         return;
//       //       }
//       //       this.$router.replace("dashboard");
//       //     })
//       //     .catch(error => {
//       //       console.log(error);
//       //     });
//     },
//   },
// };
</script>
