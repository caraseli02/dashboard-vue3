<template>
  <transition name="slide-fade" mode="out-in">
    <div
      id="alertMsg"
      class="
        top-0
        flex
        justify-center
        items-start
        w-full
        bg-gray-200
        dark:bg-gray-700
        setSuperZindex
        rounded-none
        glass
      "
    >
      <span class="w-3/5 ml-4 my-6 text-primary text-xl text-left rounded-full">
        notificationMessage
      </span>
      <div class="self-center mr-8">
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <g
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              class="circle"
              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
            />
            <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
          </g>
        </svg>
      </div>
      <button class="my-1 absolute top-0 right-0">
        <!-- <span
          class="
            bg-gradient-to-r
            from-red-600
            via-pink-500
            to-red-700
            hover:bg-green-400
            text-white
            py-2
            px-4
            text-sm
            rounded
            h-24
          "
          >Recargar</span
        > -->
        <span class="hover:bg-green-400 text-white py-2 px-4 text-lg rounded"
          >❌</span
        >
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Alert",
};
</script>

<style scoped>
.setSuperZindex {
  z-index: 99999;
  position: fixed;
}

svg {
  display: block;
  height: 15vw;
  width: 15vw;
  color: #03f497;
  /* SVG path use currentColor to inherit this */
}

.circle {
  stroke-dasharray: 76;
  stroke-dashoffset: 76;
  -webkit-animation: draw 1s forwards;
  animation: draw 1s forwards;
}

.tick {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  -webkit-animation: draw 1s forwards 1s;
  animation: draw 1s forwards 1s;
}

@-webkit-keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
