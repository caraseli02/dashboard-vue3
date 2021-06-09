<template>
  <section class="mt-4 p-2 glass">
    <div>
      <label
        for="E-mail *"
        class="flex text-sm font-medium leading-5 text-secondary my-2"
        >Email
      </label>
      <input
        class="btn_auth"
        type="text"
        placeholder="Email Address"
        @input="emailField.handleChange"
        @blur="emailField.handleBlur"
        :value="emailField.value"
      />
      <p
        class="text-yellow-500 mt-2"
        :style="{
          visibility:
            emailField.meta.touched && !emailField.meta.valid
              ? 'visible'
              : 'hidden',
        }"
      >
        {{ emailField.errorMessage || "Debe rellenar este campo" }}
      </p>
    </div>
    <div>
      <label
        for="Contraseña"
        class="flex text-sm font-medium leading-5 text-secondary my-2"
        >Contraseña *
      </label>
      <input
        id="Contraseña"
        class="btn_auth"
        type="password"
        placeholder="Contraseña *"
        @input="
          passwordField.handleChange($event), confirmPasswordField.validate()
        "
        @blur="passwordField.handleBlur"
        :value="passwordField.value"
      />
      <p
        class="text-yellow-500 mt-2"
        :style="{
          visibility:
            passwordField.meta.touched && !passwordField.meta.valid
              ? 'visible'
              : 'hidden',
        }"
      >
        {{ passwordField.errorMessage || "Debe rellenar este campo" }}
      </p>
    </div>
    <template v-if="!isLogin">
      <div>
        <label
          for="Contraseña2"
          class="flex text-sm font-medium leading-5 text-secondary my-2"
          >Repetir contraseña *
        </label>
        <input
          id="Contraseña2"
          class="btn_auth"
          type="password"
          placeholder="Repetir contraseña *"
          @input="confirmPasswordField.handleChange"
          @blur="confirmPasswordField.handleBlur"
          :value="confirmPasswordField.value"
        />
        <p
          :style="{
            visibility:
              confirmPasswordField.meta.touched &&
              !confirmPasswordField.meta.valid
                ? 'visible'
                : 'hidden',
          }"
          class="text-yellow-500"
        >
          {{ confirmPasswordField.errorMessage || "Debe rellenar este campo" }}
        </p>
      </div>
      <div>
        <label
          for="Name"
          class="flex text-sm font-medium leading-5 text-secondary my-2"
          >Nombre *
        </label>
        <input
          id="Name"
          class="btn_auth"
          type="text"
          placeholder="Nombre *"
          @input="nameField.handleChange"
          @blur="nameField.handleBlur"
          :value="nameField.value"
        />
        <p
          :style="{
            visibility:
              nameField.meta.touched && !nameField.meta.valid
                ? 'visible'
                : 'hidden',
          }"
          class="text-yellow-500"
        >
          {{ nameField.errorMessage || "Debe rellenar este campo" }}
        </p>
      </div>
      <div>
        <label
          for="Surname"
          class="flex text-sm font-medium leading-5 text-secondary my-2"
          >Apellido *
        </label>
        <input
          id="Surname"
          class="btn_auth"
          type="text"
          placeholder="Apellido *"
          @input="surnameField.handleChange"
          @blur="surnameField.handleBlur"
          :value="surnameField.value"
        />
        <p
          :style="{
            visibility:
              surnameField.meta.touched && !surnameField.meta.valid
                ? 'visible'
                : 'hidden',
          }"
          class="text-yellow-500"
        >
          {{ surnameField.errorMessage || "Debe rellenar este campo" }}
        </p>
      </div>
      <div>
        <label
          for="DNI"
          class="flex text-sm font-medium leading-5 text-secondary my-2"
          >DNI / NIE *
        </label>
        <input
          id="DNI"
          class="btn_auth"
          type="text"
          placeholder="DNI / NIE *"
          @input="dniField.handleChange"
          @blur="dniField.handleBlur"
          :value="dniField.value"
        />
        <p
          :style="{
            visibility:
              dniField.meta.touched && !dniField.meta.valid
                ? 'visible'
                : 'hidden',
          }"
          class="text-yellow-500"
        >
          {{ dniField.errorMessage || "Debe rellenar este campo" }}
        </p>
      </div>
      <div class="relative">
        <label
          for="workplace"
          class="block mb-2 uppercase tracking-wide text-secondary text-xs mt-4"
        >
          Centro de Trabajo </label
        ><select
          class="selectForm"
          name="workplace"
          @input="workplaceField.handleChange"
          @blur="workplaceField.handleBlur"
          :value="workplaceField.value"
        >
          <option
            v-for="workplace in workplaceList"
            :key="workplace"
            :value="workplace"
          >
            {{ workplace }}
          </option>
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current h-8 w-8 mt-2"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            ></path>
          </svg>
        </div>
        <p
          :style="{
            visibility:
              workplaceField.meta.touched && !workplaceField.meta.valid
                ? 'visible'
                : 'hidden',
          }"
          class="text-yellow-500"
        >
          {{ dniField.errorMessage || "Debe rellenar este campo" }}
        </p>
      </div>
      <div class="flex mt-2 text-primary">
        <label class="flex items-center"
          ><input
            required="required"
            type="checkbox"
            class="form-checkbox"
            v-model="acceptTerms"
          /><span class="ml-2"
            >He leído y acepto los
            <a href="/terminos-y-condiciones" class="font-bold text-secondary"
              >Términos y condiciones
            </a>
            y la
            <a href="/politica-privacidad/" class="font-bold text-secondary">
              Política de privacidad
            </a>
          </span></label
        >
      </div>
    </template>
    <span class="text-yellow-500 mt-2" v-if="!acceptTerms && !isLogin"
      >Accepta los terminos y condiciones</span
    >
    <button
      v-if="acceptTerms || isLogin"
      class="btn-form uppercase mt-4"
      @click="submitForm"
    >
      <span>{{ isLogin ? "Entrar" : "Activar" }}</span>
      <span></span>
      <!-- <Loader
          v-if="isSubmitting"
          class="animate-spin stroke-current text-white ml-2"
          :height="16"
        /> -->
    </button>
  </section>
  <div class="text-lg leading-5 mt-4 text-center glass">
    <button
      class="
        text-base text-primary
        focus:outline-none
        focus:underline
        transition
        ease-in-out
        duration-150
        hover:opacity-50
        bg-secondary
        shadow-lg
        p-2
        rounded-lg
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
  <div
    class="
      mt-4
      glass
      rounded-none
      text-secondary
      w-full
      h-20
      text-lg
      flex
      justify-center
      sm:mx-auto
      sm:rounded-xl
    "
  >
    ¿No tienes cuenta?
    <div
      class="
        h-12
        cursor-pointer
        bg-secondary
        text-primary
        shadow-lg
        p-3
        rounded-lg
        ml-4
        font-bold
        text-xl
      "
    >
      Regístrate
    </div>
  </div>
</template>

<script lang="ts">
// import { mapActions, mapGetters } from "vuex";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";
// VUE
import { watch, defineComponent, reactive, computed } from "vue";
// SETUP
import { user, google, showForgotPopUp } from ".";
// TS INTERFACE
import IFormSchema from "@/components/auth/interface";
import { useField, useForm } from "vee-validate";
import { login, signup } from "@/components/auth/index";
import { workplaceList } from "@/components/auth/db";

export default defineComponent({
  name: "LoginForm",
  components: {
    ForgotPassword,
  },
  props: {
    isLogin: {
      type: Boolean,
      default: true,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    submitAuth: null, // null means we will not validate event
  },
  setup(props) {
    const { meta: formMeta, handleSubmit } = useForm();
    const emailField = reactive(useField("email", "email"));
    const passwordField = reactive(useField("password", "password"));

    const confirmPasswordValidator = computed(() => {
      return !props.isLogin ? "confirmPassword:password" : () => true;
    });
    const workplaceValidator = computed(() => {
      return !props.isLogin ? "workplace:workplace" : () => true;
    });
    const nameValidator = computed(() => {
      return !props.isLogin ? "name:name" : () => true;
    });
    const surnameValidator = computed(() => {
      return !props.isLogin ? "surname:surname" : () => true;
    });
    const confirmPasswordField = reactive(
      useField("confirmPassword", confirmPasswordValidator)
    );
    const dniValidator = computed(() => {
      return !props.isLogin ? "dni:dni" : () => true;
    });
    const workplaceField = reactive(useField("workplace", workplaceValidator));
    const nameField = reactive(useField("name", nameValidator));
    const surnameField = reactive(useField("surname", surnameValidator));
    const dniField = reactive(useField("dni", dniValidator));

    watch(
      () => props.isLogin,
      () => {
        confirmPasswordField.validate();
        nameField.validate();
        surnameField.validate();
        dniField.validate();
        workplaceField.validate();
      }
    );
    const submitForm = handleSubmit((formValues) => {
      if (props.isLogin) {
        login(formValues.email, formValues.password);
      }

      console.log(formValues);
      signup(formValues);
    });
    return {
      emailField,
      passwordField,
      nameField,
      surnameField,
      dniField,
      workplaceField,
      confirmPasswordField,
      submitForm,
      formMeta,
      showForgotPopUp,
      workplaceList,
    };
  },
  data() {
    return {
      acceptTerms: false,
    };
  },
});
</script>
