<template>
  <section :class="`container light_bg pb-12`">
    <Header />
    <!-- <Sidebar /> -->
    <main :class="user ? 'lg:pl-24' : ''" class="container mx-auto py-5">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <div
      v-if="user"
      :class="`glass-blue fixed bottom-0 w-full rounded-none rounded-t-lg
            lg:w-20 lg:h-full lg:rounded-r-lg lg:rounded-t-none
            `"
    >
      <MainNav />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "@/components/auth/store";
import Header from "./components/Navigation/Header.vue";
import MainNav from "@/components/dashboard/MainNav.vue";

// import Sidebar from "./components/Sidebar.vue";

export default defineComponent({
  setup() {
    return { user };
  },
  components: {
    Header,
    MainNav,
    // Sidebar,
  },
});
</script>

<style scoped></style>

<style>
@import "./assets/css/icons.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;1,100;1,400&display=swap");

* {
  font-family: "Poppins";
}

.container {
  min-width: 100vw;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (min-width: 480px) {
    flex-direction: row;
  }
}

html {
  background: radial-gradient(
    circle at top left,
    #dad4cd 0%,
    #00c6fb 20%,
    #005bea 100%
  );
}

.dark {
  background: radial-gradient(
    circle at top right,
    #014393 0%,
    #020c6b 20%,
    #010948 100%
  );
}

.glass-error,
.glass-blue,
.glass-success,
.glass-light,
.glass-gray,
.glass-dark {
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  z-index: 2;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.glass-dark {
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.5);
}

.glass-blue {
  border: 2px solid rgba(25, 0, 247, 0.2);
  background: rgba(25, 0, 247, 0.5);
}

.glass-success {
  background: rgba(1, 130, 11, 0.6);
  border: 2px solid rgba(0, 255, 170, 0.2);
}

.glass-error {
  background: rgba(216, 1, 1, 0.6);
  border: 2px solid rgba(238, 4, 4, 0.2);
}

.glass-gray {
  background: rgba(138, 136, 136, 0.2);
  padding: 15px;
  border: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
