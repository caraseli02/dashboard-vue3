<template>
  <header class="rounded-none pb-1 pt-2 px-4">
    <div class="mx-auto flex justify-center items-center">
      <nav class="flex items-center justify-between md:justify-between w-full">
        <!-- PROFILE ICON FOR OPEN/CLOSE SIDEBAR -->
        <div
          data-cy="sidebarBtn"
          v-if="user"
          @click="toggleSidebar"
          class="flex items-center"
        >
          <button
            class="
              flex
              justify-center
              items-center
              p-3
              rounded-lg
              z-20
              bg-primary
            "
            aria-label="Open Menu"
          >
            <i class="gg-profile text-primary"></i>
          </button>
        </div>
        <!-- Home, Sing-In Sign-Up Btn -->
        <section class="flex justify-between items-center">
          <!-- Side Bar -->
        </section>
        <!-- LOGOUT, ThemeToggler Btn -->
        <div class="flex justify-end items-center w-40">
          <ThemeToggler class="mr-10" />
          <button
            @click="logout"
            id="btnLogout"
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
            <i class="gg-log-off ml-3"></i>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemeToggler from "@/components/Navigation/ThemeToggler.vue";
import { user, logout } from "@/components/auth/store";
import { showSidebar, toggleSidebar } from "./store";

interface Link {
  name: string;
  to: string;
}

export default defineComponent({
  name: "Header",
  setup() {
    return { user, logout, toggleSidebar, showSidebar };
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
