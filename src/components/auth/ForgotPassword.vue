<template>
  <section class="glass mt-2 p-2 flex justify-center items-center flex-col">
    <h1 class="text-center mb-4 mx-8 glass text-xs text-secondary font-bold">
      SI HAS OLVIDADO TU CONTRASEÑA, PROPORCIONA TU DIRECCIÓN DE CORREO
      ELECTRÓNICO Y TE ENVIAREMOS UN EMAIL CON INSTRUCCIONES DE CÓMO
      RECUPERARLA.
    </h1>
    <article class="md:w-3/4 p-5 border rounded bg-primary mx-auto">
      <transition name="fade">
        <p
          class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
          v-if="error"
        >
          {{ error }}
        </p>
      </transition>
      <form @submit.prevent>
        <div class="mb-4">
          <label for="email" class="font-bold text-secondary pb-1">Email</label>
          <input
            type="email"
            placeholder="apimosa@apimosa.es"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            v-model="email"
            id="emailForgot"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <button
            type="submit"
            @click="sendEmail"
            class="
              bg-secondary
              px-4
              py-2
              rounded
              text-primary
              border border-blue-600
              transition
              duration-500
              ease-in-out
              hover:bg-blue-600
            "
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Enviar</span>
              <span v-else>Sending...</span>
            </transition>
          </button>
        </div>
      </form>
    </article>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { resetPassword, showForgotPopUp } from "@/components/auth/store";

export default defineComponent({
  setup() {
    const email = ref<string>("");
    const error = ref<string | null>(null);
    const emailSending = ref<boolean>(false);

    const sendEmail = () => {
      if (!email.value) {
        error.value = "Please type in a valid email address.";
        return;
      }
      try {
        error.value = null;
        emailSending.value = true;
        resetPassword(email.value);
      } catch (error) {
        emailSending.value = false;
        error.value = error.message;
      }
      showForgotPopUp.value = false;
    };

    return { email, error, emailSending, sendEmail };
  },
});
</script>

// export default { // data() { // return { // email: "", // error: null, //
emailSending: false, // }; // }, // methods: { // sendEmail() { // if
(!this.email) { // this.error = "Please type in a valid email address."; //
return; // } // this.error = null; // this.emailSending = true; // this.$store
// .dispatch("auth/resetPassword", this.email) // .then(() => { //
this.emailSending = false; // this.$emit("closePopUp", false); //
this.$alert("Enviando"); // }) // .catch(error => { // this.emailSending =
false; // this.error = error.message; // }); // }, // }, // };
