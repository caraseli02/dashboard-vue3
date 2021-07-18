<template>
  <div
    class="
      rounded-xl
      flex
      justify-around
      w-32
      mx-auto
      shadow-lg
      border-none
      lg:h-10
    "
  >
    <span
      class="
        w-full
        h-full
        rounded-xl
        flex
        justify-center
        items-center
        text-primary
        font-semibold
        text-xl
      "
      :class="showMonthAttends ? 'bg-blue-800' : ''"
      >{{ filtredAttendsDay ? today : "Hoy" }}</span
    >
    <span
      class="
        w-full
        h-full
        rounded-xl
        flex
        justify-center
        items-center
        text-primary
        font-semibold
        text-xl
      "
      :class="!showMonthAttends ? 'bg-blue-600 dark:bg-blue-800' : ''"
      >Mes</span
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MonthDaySelect",
  props: {
    selectedUser: {
      type: String,
      default: null,
    },
    filtredAttendsDay: {
      type: [Number, Boolean],
      default: null,
    },
    showMonthAttends: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    today() {
      return new Date(this.filtredAttendsDay).getDate();
    },
  },
  watch: {
    showMonthAttends: function (val) {
      if (val) {
        this.$emit("monthClick", "monthClick");
      }
      if (!val && !this.filtredAttendsDay) {
        this.$emit("dayClick", "dayClick");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
