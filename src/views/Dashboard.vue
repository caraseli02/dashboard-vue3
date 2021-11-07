<template>
  <div v-if="!loading" class="flex flex-col h-full">
    <div class="w-full px-4">
      <monthSelector />
      <!-- WorkPlace and Users select -->
      <section
        class="
          flex
          justify-between
          items-center
          overflow-hidden
          max-w-lg
          xl:mt-4
          mx-auto
        "
      >
        <attendAdminPlaces v-model="selectedWorkplace" />
        <attendAdminUsers v-model="selectedUser" />
      </section>
      <!-- Gmaps/AttendData Toggler and Today/Month Toggler -->
      <section class="flex w-full h-full md:mt-4">
        <mapsToggler @click="showMaps = !showMaps" :showMaps="showMaps" />
        <!-- Month / Day Selector -->
        <monthDaySelect
          @click="showMonthAttends = !showMonthAttends"
          v-on:dayClick="resetToDayAttend()"
          v-on:monthClick="resetToMonthAttend()"
          :selectedUser="selectedUser"
          :filtredAttendsDay="filtredAttendsDay"
          :showMonthAttends="showMonthAttends"
        />
      </section>
      <!-- Attends Info Cards, Attend and Gmaps -->
      <section
        v-if="!loading"
        class="overflow-hidden lg:overflow-visible pb-8 lg:pb-0"
      >
        <div
          class="transform lg:transform-none transition-all duration-300"
          :class="showMaps ? '-translate-x-full' : ''"
        >
          <div class="flex mt-4 lg:mt-10 lg:space-x-10">
            <div
              class="w-full flex-shrink-0 lg:w-2/3 lg:flex-shrink rounded-xl"
            >
              <infoCards
                class="flex justify-between items-center space-x-4"
                :selectedUser="selectedUser"
              />
              <!-- Attend Rows -->
              <transition-group
                class="grid grid-flow-col auto-cols-max overflow-y-scroll mt-2"
                name="list"
                tag="section"
              >
                <attendRow
                  v-for="attend in attendList.data"
                  :key="attend.id"
                  :attend="attend"
                />
              </transition-group>
              <!-- <msgBlog /> -->
            </div>
            <div
              class="
                w-full
                h-64
                flex-shrink-0
                lg:w-1/3 lg:flex-shrink
                rounded-xl
              "
            >
              <gMaps :markers="markers" />
            </div>
          </div>
        </div>
      </section>
      <div v-else class="mx-10 mt-10 h-64">
        <div class="animate-pulse flex flex-col space-x-4">
          <div class="flex-1 space-y-4 py-1">
            <div class="space-y-2">
              <div class="h-8 bg-primary rounded"></div>
              <div class="h-8 bg-primary rounded w-5/6"></div>
            </div>
          </div>
          <ul class="mt-4 flex flex-wrap justify-center items-center">
            <li
              v-for="i in 9"
              :key="i"
              class="rounded-lg bg-primary h-24 w-1/4 m-2"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import attendRow from "@/components/dashboard/attendRow.vue";
import infoCards from "@/components/dashboard/infoCards.vue";
import monthSelector from "@/components/dashboard/monthSelector.vue";
import mapsToggler from "@/components/dashboard/gmapsToggler.vue";
import monthDaySelect from "@/components/dashboard/monthDaySelect.vue";
import gMaps from "@/components/dashboard/gMaps.vue";
import attendAdminPlaces from "@/components/attendAdminPlaces.vue";
import attendAdminUsers from "@/components/attendAdminUsers.vue";

import { defineComponent, ref, provide, watch, computed } from "vue";
import { uid } from "@/components/dashboard/comStore";
import useFirestore from "../index";
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
  setup() {
    const selectedUser = ref("users");
    const selectedWorkplace = ref("");
    const showMaps = ref(false);
    // Get User Data from Firestore
    const { data: user, loading } = useFirestore({
      queryType: "doc",
      type: "watch",
      path: "attendanceUsers/$uid",
      variables: {
        uid,
      },
    });
    // Get Month attendance from Firestore
    const getAttends = (value: number) => {
      // Set month time limit in milisegundos
      //?Used in firebase like curentTime
      setTimeLimits(value);
      const { data, loading } = useFirestore({
        queryType: "collection",
        type: "watch",
        path: "attendance",
        query(collectionRef: any) {
          return collectionRef
            .where("delete_flag", "==", "N")
            .where("data.gpsData.County", "==", selectedWorkplace.value)
            .where("curentTime", ">=", time["start"])
            .where("curentTime", "<=", time["end"])
            .orderBy("curentTime", "desc");
        },
      });
      // Sent data to comStore.ts in src/components/dashboard/comStore.ts
      attendList.data = data;
    };

    function resetToMonthAttend() {
      (filtredAttendsDay.value = null), (showMonthAttends.value = true);
    }
    function resetToDayAttend() {
      (filtredAttendsDay.value = new Date().setHours(2, 0, 0, 0)),
        (showMonthAttends.value = false);
    }
    const markers = computed(() => {
      let markers: any = [];
      if (attendList.data.length > 0) {
        attendList.data.forEach((item) => {
          if (item["data"]["gpsLoc"]) {
            markers.push({
              type: "enter",
              gps: item["data"]["gpsLoc"],
              time: item["data"]["enterTime"],
              city: item["data"]["gpsData"]["City"],
              author: usersList.data.find(
                ({ author }) => author === item["author"]
              ),
            });
          }
          if (item["data"]["gpsLocLeave"]) {
            markers.push({
              type: "leave",
              gps: item["data"]["gpsLocLeave"],
              time: item["data"]["leaveTime"],
              city: item["data"]["gpsData"]["city"],
              author: usersList.data.find(
                ({ author }) => author === item["author"]
              ),
            });
          }
        });
      }
      return markers;
    });
    // WATCH
    // Watch selectedMes & user to get attends
    // Asign first workplace to selectedWorkplace
    watch([selectedMes, user, selectedWorkplace, selectedUser], (newValues) => {
      const { workplace } = newValues[1];
      if (!newValues[2]) {
        selectedWorkplace.value = Array.isArray(workplace)
          ? workplace[0]
          : workplace;
      }
      if (newValues[3] !== "users") {
        console.log(newValues[3]);
        //
        userAttendList.data = attendList.data.filter(
          (attend) => attend.data.email === newValues[3]
        );
        return;
      }
      // Get Data from firebase for all user in selected Month
      getAttends(newValues[0]);
    });
    provide("userData", user);

    // onMounted(getAttends());

    return {
      user,
      loading,
      selectedUser,
      selectedWorkplace,
      attendList,
      userAttendList,
      showMaps,
      showMonthAttends,
      filtredAttendsDay,
      resetToMonthAttend,
      resetToDayAttend,
      markers,
    };
  },
  components: {
    attendRow,
    infoCards,
    monthSelector,
    attendAdminPlaces,
    attendAdminUsers,
    mapsToggler,
    monthDaySelect,
    gMaps,
  },
});
</script>
<style lang=""></style>
