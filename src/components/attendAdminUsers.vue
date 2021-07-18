<template>
  <div class="w-1/2 px-3 mb-6 md:mb-0 overflow-hidden">
    <label
      class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
      for="grid-state"
    >
      Empleado
    </label>
    <div v-if="usersList" class="relative">
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
        :value="modelValue"
        id="grid-state"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option value="users">Todos</option>
        <option
          :value="user.email"
          v-for="(user, index) in workplaceUsers"
          :key="index"
        >
          {{ user.name }} {{ user.surname ? user.surname : "" }}
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

<script>
import { defineComponent, computed } from "vue";
import { attendList, usersList } from "@/components/dashboard/comStore.ts";
import useFirestore from "../index";

export default defineComponent({
  setup() {
    const { data, loading } = useFirestore({
      type: "get",
      queryType: "collection",
      path: "attendanceUsers",
    });
    usersList.data = data;
    const workplaceUsers = computed(() => {
      const data = [...new Set(attendList["data"].map((o) => o.data.email))];
      // console.log(data);
      return usersList.data.filter((user) => data.includes(user.email));
    });

    return { usersList, loading, workplaceUsers };
  },
  name: "attendAdminUsers",
  props: {
    modelValue: {
      type: [String, Boolean],
      required: true,
    },
  },
});
</script>
<style lang=""></style>
