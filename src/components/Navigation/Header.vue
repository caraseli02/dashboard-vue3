<template>
  <header class="rounded-none pb-1 pt-2 px-4">
    <div class="mx-auto flex justify-center items-center">
      <nav class="flex items-center justify-between md:justify-between w-full">
        <!-- PROFILE ICON FOR OPEN/CLOSE SIDEBAR -->
        <div v-if="user" @click="toggleSidebar" class="flex items-center ml-2">
          <button
            class="flex justify-center items-center p-3 rounded-lg z-20"
            :class="showSidebar ? 'bg-gray-300' : 'text-primary bg-primary'"
            aria-label="Open Menu"
          ></button>
        </div>
        <!-- Home, Sing-In Sign-Up Btn -->
        <section class="flex justify-between items-center">
          <span v-for="link in links" :key="link.name">
            <router-link
              :to="link.to"
              class="
                ml-2
                flex
                justify-center
                items-center
                p-2
                rounded-lg
                text-primary
                bg-primary
              "
              v-if="!user && $route.path !== link.to"
              >{{ link.name }}
            </router-link>
          </span>
          <!-- Side Bar -->
        </section>
        <!-- LOGOUT, ThemeToggler Btn -->
        <div class="flex justify-end items-center w-40">
          <ThemeToggler class="mr-10" />
          <button
            @click="closeSession"
            class="
              flex
              justify-center
              items-center
              p-3
              rounded-lg
              text-primary
              bg-primary
              mr-2
              logOut
            "
            v-if="user"
          >
            Salir
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemeToggler from "@/components/Navigation/ThemeToggler.vue";
// import { mapGetters, mapActions, mapState } from "vuex";

interface Link {
  name: string;
  to: string;
}

export default defineComponent({
  name: "Header",
  data(): { links: Link[] } {
    return {
      links: [
        {
          name: "Inicio",
          to: "/",
        },
        {
          name: "Entrar",
          to: "/sign-in",
        },
        {
          name: "Registrate",
          to: "/sign-up",
        },
      ],
    };
  },
  components: { ThemeToggler },
  computed: {
    // ...mapGetters("auth", ["getUser"]),
    // ...mapState({
    //   showSidebar: state => state.showSidebar,
    // }),
    // user() {
    //   return this.$store.getters["auth/getUser"];
    // },
  },
  methods: {
    // ...mapActions(["toggleSidebar"]),
    // ...mapActions("auth", ["signOut"]),
    // async closeSession() {
    //   await this.signOut().then(() => this.$router.replace("sign-in"));
    // },
  },
});
</script>
