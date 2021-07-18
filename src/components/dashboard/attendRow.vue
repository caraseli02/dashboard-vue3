<template lang="">
  <ul
    v-if="userData"
    class="w-24 grid grid-flow-row grid-rows-4 ml-1 border-l-2"
  >
    <li
      class="
        w-20
        h-16
        row-span-1
        mx-auto
        flex flex-col
        justify-center
        items-center
        text-2xl
        border-none
        bg-gray-200
        dark:bg-gray-500
        rounded-lg
        text-primary
      "
    >
      <span
        class="
          text-secondary
          rounded-t-lg
          text-base
          bg-primary
          w-full
          h-full
          text-center
        "
        >{{ getDayName }}</span
      >
      {{ day }}
    </li>
    <li
      class="
        w-20
        h-16
        row-span-1
        mx-auto
        flex flex-col
        justify-center
        items-center
        text-lg
        border-none
        text-primary
        relative
      "
    >
      <span class="text-secondary capitalize">
        {{ nameTransform(userData.name) }}
      </span>
      <div
        class="
          flex
          justify-center
          items-center
          rounded-full
          font-semibold
          text-xl
          uppercase
        "
      >
        {{ speakerInitials(userData.surname) }}
      </div>
    </li>
    <li
      v-on:click="$emit('passRowToChange', { attend, gpsData: gpsData[0] })"
      class="
        mx-auto
        h-full
        flex
        justify-center
        items-center
        p-1
        text-green-800
        dark:text-green-500
      "
    >
      <span class="text-2xl mr-1"> &#8595; </span>
      <span class="text-xl">{{ enterTime }} </span>
    </li>
    <li
      v-on:click="$emit('passRowToChange', { attend, gpsData: gpsData[0] })"
      class="
        mx-auto
        h-full
        flex
        justify-center
        items-center
        text-red-700
        dark:text-red-500
      "
    >
      <span class="text-xl">{{ leaveTime }}</span>
      <!-- <button v-else class="text-xl">--:--</button> -->
      <span class="text-2xl">&#8593;</span>
    </li>
    <li
      class="
        mx-auto
        h-18
        w-full
        flex
        justify-around
        items-center
        p-1
        border-gray-600
      "
    >
      <div class="flex justify-center items-center">
        <span
          v-if="workedTime"
          class="text-gray-700 dark:text-gray-300 mr-1 ml-2 text-center"
        >
          {{ workedTime }}
        </span>
        <i v-else class="gg-time mb-2 text-green-800 dark:text-green-500"></i>
      </div>
    </li>
    <li class="h-10 flex justify-center items-center text-purple-800 my-2">
      <i
        v-if="attend.data.msg"
        class="
          gg-mail
          cursor-pointer
          self-center
          shadow-lg
          text-green-700
          dark:text-green-400
        "
        @click="showMsg(attend.data.msg)"
      >
      </i>
      <span v-else class="text-xs mx-4 text-center text-secondary"
        >No tiene Mensajes</span
      >
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { days, usersList, timeConvert } from "@/components/dashboard/comStore";

export default defineComponent({
  name: "attendRow",
  setup(props) {
    const day = new Date(props.attend.curentTime).getDay();
    const userData = computed(() => {
      return usersList.data.find((user) => user.author === props.attend.author);
    });
    const enterTime = computed(() => {
      return props.attend.data.enterTime.slice(11, 16);
    });
    const leaveTime = computed(() => {
      if (props.attend.data.leaveTime) {
        return props.attend.data.leaveTime.slice(11, 16);
      } else {
        return "--:--";
      }
    });
    const workedTime = computed(() => {
      if (props.attend.closedAt) {
        const { enterTime, leaveTime } = props.attend.data;
        return timeConvert(enterTime, leaveTime, userData);
      } else {
        return null;
      }
    });
    function nameTransform(value: string): string {
      const name = value.split(" ");
      if (name[1] && name[0].length < name[1].length) {
        return name[1].toLowerCase();
      } else {
        return name[0].toLowerCase();
      }
    }
    function speakerInitials(speaker: string) {
      const name = speaker.split(" ");
      return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ""}`;
    }
    function showMsg(msg: string) {
      window.alert(msg);
    }
    const getDayName = computed(() => {
      return days.value[day];
    });
    return {
      days,
      getDayName,
      day,
      nameTransform,
      userData,
      speakerInitials,
      usersList,
      enterTime,
      leaveTime,
      workedTime,
      showMsg,
    };
  },
  props: {
    attend: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style scoped></style>
