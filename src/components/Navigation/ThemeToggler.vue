<template>
  <!-- <svg class="mr-2" width="32" height="32" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 2a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0V3.4A1.4 1.4 0 0116 2zM6.1 6.1a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 11-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm19.8 0a1.4 1.4 0 010 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99a1.4 1.4 0 011.98 0zM9 16a7 7 0 1114 0 7 7 0 01-14 0zm-7 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8H3.4A1.4 1.4 0 012 16zm23.8 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8h-1.4a1.4 1.4 0 01-1.4-1.4zm-2.87 6.93a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 01-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm-15.84 0a1.4 1.4 0 011.98 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99zM16 25.8a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0v-1.4a1.4 1.4 0 011.4-1.4z"
      fill="url(#paint0_linear)"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="2"
        y1="2"
        x2="30"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop class="transition-all duration-200" stop-color="#d4d4d8"></stop>
        <stop
          class="transition-all duration-200"
          offset="1"
          stop-color="#d4d4d8"
        ></stop>
      </linearGradient>
    </defs>
  </svg> -->
  <div id="page" :class="nightMode ? 'theme-dark' : ''">
    <input type="checkbox" id="theme-toggle" v-model="nightMode" />
    <label @click="toggleTheme" for="theme-toggle"><span></span></label>
  </div>
  <!-- <svg
    width="24"
    height="24"
    fill="currentColor"
    class="transition-colors duration-200 text-gray-900"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"
    ></path>
  </svg> -->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "ThemeToggler",
  setup() {
    let nightMode = ref<boolean>(localStorage.getItem("theme") === "dark");

    const themeInnit = (): void => {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.querySelector("html")!.classList.add("dark");
        localStorage.setItem("theme", "dark");
        nightMode.value = true;
      } else if (localStorage.theme === "dark") {
        document.querySelector("html")!.classList.add("dark");
        localStorage.setItem("theme", "dark");
        nightMode.value = true;
      }
    };

    onMounted(themeInnit);
    return {
      nightMode,
    };
  },
  methods: {
    toggleTheme(): void {
      let htmlClasses = document.querySelector("html")!.classList;
      if (localStorage.theme == "dark") {
        htmlClasses.remove("dark");
        localStorage.removeItem("theme");
      } else {
        htmlClasses.add("dark");
        localStorage.theme = "dark";
      }
    },
  },
});
</script>

<style scoped></style>

<style>
:root {
  --toggle-size: 4rem;
  --switch-w: 1.5em;
  --switch-h: 0.75em;
  --switch-handle-scale: 0.55;
  --switch-off-handle-x: -0.08em;
  --switch-on-handle-x: calc(100% - 0.08em);
  --switch-transition-duration: 0.12s;
}

#page {
  background: transparent;
}

#theme-toggle {
  display: none;
}
#theme-toggle + label {
  font-size: var(--toggle-size);
  display: flex;
  height: var(--switch-h);
  width: var(--switch-w);
  border-radius: calc(var(--switch-h) / 2);
  background-size: auto 8em;
  background-position: bottom;
  background-image: linear-gradient(
    180deg,
    #021037 0%,
    #20206a 19%,
    #4184b1 66%,
    #62e7f7 100%
  );
  transition: var(--switch-transition-duration);
  border: 0.05em solid #eef3f6;
  overflow: hidden;
}
#theme-toggle + label span {
  background: #fffad8;
  border-radius: 50%;
  height: var(--switch-h);
  width: var(--switch-h);
  transform: translateX(var(--switch-off-handle-x))
    scale(var(--switch-handle-scale));
  transition: var(--switch-transition-duration);
  cursor: pointer;
  box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
    inset -0.25em -0.25em 0 0 #fbee8e,
    inset -0.3125em -0.3125em 0 0.625em #fff5b2;
  margin-top: var(--switch-off-handle-x);
}
#theme-toggle:checked {
  font-size: var(--switch-font-size);
}
#theme-toggle:checked + label {
  background-position: top;
  border-color: #5983a6;
}
#theme-toggle:checked + label span {
  background: transparent;
  transform: translateX(var(--switch-on-handle-x))
    scale(var(--switch-handle-scale));
  box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
    inset -0.5625em -0.5625em 0 0 #fffff7;
}

#page {
  height: 5.5vh;
  width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}
</style>
