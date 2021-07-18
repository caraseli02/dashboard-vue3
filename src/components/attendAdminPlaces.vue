<template>
  <div class="w-1/2 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
      for="grid-state"
    >
      Centro
    </label>
    <div class="relative">
      <select
        class="
          block
          appearance-none
          w-full
          bg-gray-200
          border border-gray-200
          text-primary
          py-3
          px-4
          pr-8
          rounded
          leading-tight
          focus:outline-none focus:bg-white focus:border-gray-500
        "
        id="grid-state"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option disabled>Seleccionar</option>
        <option v-for="place in workplaceList" :key="place" :value="place">
          {{ place }}
        </option>
      </select>
      <div
        class="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          flex
          items-center
          px-2
          text-primary
        "
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, inject } from "vue";
export default defineComponent({
  name: "attendAdminPlaces",
  setup() {
    const userData: any = inject("userData");
    const { workplace } = userData.value;
    const workplaceList = computed(() => {
      // This will return always array and prevent erros if workplace is string
      return Array.isArray(workplace) ? workplace : [workplace];
    });
    return { workplaceList };
  },
  props: {
    modelValue: {
      type: String,
      required: false,
    },
  },
  // computed: {
  //   workplaceList() {
  //     return Array.isArray(this.modelValue)
  //       ? this.modelValue
  //       : [this.modelValue];
  //   },
  // },
});
</script>
<style lang=""></style>
