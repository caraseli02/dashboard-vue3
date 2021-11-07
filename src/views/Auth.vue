<template>
  <section class="max-w-sm mx-auto mt-10">
    <div class="mb-4">
      <h1 class="text-3xl leading-9 font-extrabold text-primary">
        APIMOSA APP
      </h1>
      <ul class="inline-flex justify-center items-center glass p-1">
        <li
          @click="setIsLogin(true)"
          class="cursor-pointertext-lg leading-5 text-primary max-w p-2"
          :class="{
            'bg-secondary text-primary shadow-lg rounded-lg': !isLogin,
          }"
        >
          INICIAR SESIÓN
        </li>
        <li
          id="authCreate"
          class="cursor-pointer ml-4 text-lg leading-5 text-primary max-w p-1"
          @click="setIsLogin(false)"
          :class="{
            'bg-secondary text-primary shadow-lg p-1 rounded-lg': isLogin,
          }"
        >
          CREAR CUENTA
        </li>
      </ul>
    </div>
    <SignIn :isLogin="isLogin" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SignIn from "@/components/auth/Auth.vue";
import { isLogin, setIsLogin } from "../components/auth/comStore";

export default defineComponent({
  name: "Auth",
  components: {
    SignIn,
  },
  setup() {
    return {
      isLogin,
      setIsLogin,
    };
  },
});
</script>

<style scoped></style>
