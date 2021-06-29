<template>
  <article class="max-h-screen flex flex-col justify-aroud items-center">
    <h1 class="text-center mb-4 font-bold text-primary text-2xl">
      APIMOSA APP ADMIN
    </h1>
    <h2 class="text-center mb-4 text-secondary text-lg">
      Registro de Asistencia.
    </h2>
    <section class="flex flex-col justify-around items-center w-full">
      <section class="flex flex-col justify-between items-center py-8">
        <router-link
          v-for="(link, index) in buttons"
          :key="index"
          :to="link.path"
          class="btn-home"
        >
          <i :class="`gg-${link.iconName}`" />{{ link.text }}
        </router-link>
      </section>
      <!-- <section class="flex flex-col justify-between items-center py-8">
        <router-link
          v-for="link in links"
          :key="link.iconName"
          :to="link.path"
          class="btn-home"
        >
          <i :class="`gg-${link.iconName}`" />{{ link.text }}
        </router-link>
      </section> -->
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/components/auth/store";

interface Link {
  text: string;
  path: string;
  iconName: string;
}

export default defineComponent({
  name: "Home",
  setup() {
    return { user };
  },
  data(): { buttons: Link[] } {
    return {
      buttons: [
        {
          text: "Asistencias",
          path: "/dashboard",
          iconName: "time",
        },
        {
          text: "Operarios",
          path: "/users",
          iconName: "user-list",
        },
      ],
      // links: [
      //   {
      //     text: "Inicia sesión",
      //     path: "/sign-in",
      //     iconName: "profile",
      //   },
      //   {
      //     text: "Regístrate",
      //     path: "/sign-up",
      //     iconName: "add",
      //   },
      // ],
    };
  },
  components: {},
});
</script>
