<template>
  <div>
    <infoCard>
      <template v-slot:svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="text-secondary w-8 h-8 mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      </template>
      <template v-slot:name>Operarios</template>
      <template v-slot:number>{{ usersList.data.length }}</template>
    </infoCard>
    <!-- <infoCard v-show="selectedUser && selectedUser !== 'users'">
      <template v-slot:svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          class="text-secondary w-8 h-8 mx-auto"
        >
          <path
            d="M3.74 14.47c0-2.04.51-3.93 1.52-5.66s2.38-3.1 4.11-4.11 3.61-1.51 5.64-1.51c1.52 0 2.98.3 4.37.89s2.58 1.4 3.59 2.4 1.81 2.2 2.4 3.6.89 2.85.89 4.39c0 1.52-.3 2.98-.89 4.37s-1.4 2.59-2.4 3.59-2.2 1.8-3.59 2.39-2.84.89-4.37.89c-1.53 0-3-.3-4.39-.89s-2.59-1.4-3.6-2.4-1.8-2.2-2.4-3.58-.88-2.84-.88-4.37zm2.48 0c0 2.37.86 4.43 2.59 6.18 1.73 1.73 3.79 2.59 6.2 2.59 1.58 0 3.05-.39 4.39-1.18s2.42-1.85 3.21-3.2 1.19-2.81 1.19-4.39-.4-3.05-1.19-4.4-1.86-2.42-3.21-3.21-2.81-1.18-4.39-1.18-3.05.39-4.39 1.18S8.2 8.72 7.4 10.07s-1.18 2.82-1.18 4.4zm3.29-.01c0-.23.08-.43.24-.59s.36-.24.59-.24h3.79V7.81c0-.23.08-.43.24-.59s.36-.24.59-.24.43.08.59.24.24.36.24.59v6.67c0 .23-.08.43-.24.59s-.36.24-.59.24c-.1 0-.16 0-.19-.01h-4.44c-.23 0-.43-.08-.59-.25a.876.876 0 01-.23-.59z"
          ></path>
        </svg>
      </template>
      <template v-slot:name>Horas</template>
      <template v-slot:number>
        {{ workedTime }}
        <i class="text-xs flex absolute left-0 ml-2 top-0 mt-2 text-primary"
          >{{ workedDays }} Dias</i
        >
      </template>
    </infoCard> -->
    <infoCard>
      <template v-slot:svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-green-800 dark:text-green-500 mx-auto"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>
      <template v-slot:name>Entradas</template>
      <template v-slot:number>{{ punchInCount }}</template>
    </infoCard>
    <infoCard>
      <template v-slot:svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-red-500 mx-auto"
        >
          <path
            fill-rule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>
      <template v-slot:name>Salidas</template>
      <template v-slot:number>{{ punchOutCount }}</template>
    </infoCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import infoCard from "@/components/dashboard/infoCard.vue";
import {
  attendList,
  time,
  selectedMes,
  setTimeLimits,
  userAttendList,
  showMonthAttends,
  filtredAttendsDay,
  usersList,
} from "@/components/dashboard/comStore";

export default defineComponent({
  components: {
    infoCard,
  },
  setup() {
    const punchInCount = computed(() => {
      return attendList.data.reduce((counter, obj) => {
        if (obj.data.enterTime) counter += 1;
        return counter;
      }, 0);
    });
    const punchOutCount = computed(() => {
      return attendList.data.reduce((counter, obj) => {
        if (obj.data.leaveTime) counter += 1;
        return counter;
      }, 0);
    });
    return { attendList, usersList, punchInCount, punchOutCount };
  },
  props: {
    selectedUser: {
      type: String,
      default: "users",
    },
  },
});
</script>

<style scoped></style>
