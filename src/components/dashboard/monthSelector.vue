<template>
  <!-- Month selector  -->
  <section
    :class="`w-full max-w-md mx-auto mb-4 h-12 px-2 flex justify-between`"
  >
    <button
      data-cy="prevMonth"
      class="text-lg bg-secondary text-primary rounded-lg m-1 w-24"
      v-if="selectedMes > 0"
      @click="prevMonth()"
    >
      ←{{ meses[selectedMes - 1] }}
    </button>
    <span
      data-cy="actualMonth"
      class="
        text-lg text-primary
        flex
        justify-center
        items-center
        m-1
        w-24
        capitalize
        font-medium
        border-b-2
      "
      >{{ selectedMes }} / {{ meses[selectedMes] }}</span
    >
    <button
      @click="nextMonth()"
      v-if="selectedMes < 11"
      data-cy="nextMonth"
      class="text-lg bg-secondary text-primary rounded-lg m-1 w-24"
    >
      {{ meses[selectedMes + 1] }}→
    </button>
  </section>
</template>

<script lang="ts">
// import Alerts from "@/components/utils/Alerts.vue";
import { defineComponent, inject } from "vue";
import { selectedMes } from "./comStore";

export default defineComponent({
  setup() {
    const nextMonth = () => {
      if (selectedMes.value > 12) {
        selectedMes.value = 0;
      }
      selectedMes.value++;
    };
    const prevMonth = () => {
      if (selectedMes.value < 0) {
        selectedMes.value = 12;
      }
      selectedMes.value--;
    };
    const userData = inject("userData");

    return { selectedMes, prevMonth, nextMonth, userData };
  },
  data() {
    return {
      meses: [
        "0",
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      today: null,
    };
  },
  props: {
    // getAsistFunc: {
    //   type: Boolean,
    //   default: false,
    // },
    // bindAsistFunc: {
    //   type: Boolean,
    //   default: false,
    // },
    // workplace: {
    //   type: [Array, String],
    // },
  },
});
</script>

<style scoped>
.swipAnimation {
  animation: slidein 5s infinite;
}

@keyframes slidein {
  0% {
    opacity: 0.25;
    left: 0;
  }

  99% {
    opacity: 0.95;
    left: 80%;
  }
}
</style>
