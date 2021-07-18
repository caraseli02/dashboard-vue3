<template lang="">
  <div
    class="
      w-24
      sm:w-1/4
      xl:w-72
      rounded-xl
      flex flex-col
      xl:flex-row
      items-center
      px-2
      py-4
      lg:p-3
      2xl:p-4
      space-x-0
      md:mx-1
    "
  >
    <div class="p-2 rounded-lg text-blue-800 w-full lg:w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="text-secondary w-8 h-8 mx-auto"
      >
        <slot name="svg"></slot>
      </svg>
    </div>
    <div class="flex justify-center items-center flex-col xl:flex-row">
      <span
        class="
          block
          uppercase
          text-sm
          tracking-wider
          text-gray-700
          dark:text-secondary
          xl:text-xl
        "
      >
        <slot name="name"></slot>
      </span>
      <span
        class="
          block
          text-2xl
          lg:text-4xl
          font-semibold
          text-primary
          xl:ml-6 xl:text-3xl
        "
        ><slot name="number"></slot
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "infoCard",
};
</script>
<style lang=""></style>
