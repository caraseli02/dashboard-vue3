<template>
  <div v-if="user && data">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        data-cy="sidebarOverlay"
        @keydown.esc="toggleSidebar"
        v-show="showSidebar"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="toggleSidebar"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="
        transform
        top-0
        left-0
        w-64
        bg-primary
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-30
      "
      :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="overflow-hidden shadow max-w-xs">
        <div class="flex justify-center">
          <img
            src="@/assets/img/apimosa.png"
            class="rounded-lg border-solid border-white border-2 mt-3 w-20 h-20"
          />
        </div>
        <div class="text-center px-3 pb-6 pt-2">
          <h2 data-cy="name" class="text-primary text-xl">
            {{ data.name }}
          </h2>
          <h3
            data-cy="surname"
            v-if="'surname' in data"
            class="text-primary text-xl"
          >
            {{ data.surname }}
          </h3>
          <p data-cy="email" class="mt-2 font-sans font-light text-primary">
            {{ user.email }}
          </p>
        </div>
      </div>
      <div class="w-full px-3 mb-6 md:mb-0 mt-4">
        <label
          class="
            flex
            justify-start
            items-center
            uppercase
            tracking-wide
            text-secondary text-xs
            font-bold
            mb-2
          "
          for="grid-state"
        >
          Horario de Trabajo
          <svg
            class="mx-2 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5.07089C16.3923 5.55612 19 8.47353 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 9.96159 5.87128 8.12669 7.26175 6.84738L5.84658 5.43221C4.09461 7.0743 3 9.40932 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C11.662 3 11.3283 3.01863 11 3.05493V9.08551H13V5.07089Z"
              fill="currentColor"
            />
            <path
              d="M7.70711 8.70708C7.31658 9.0976 7.31658 9.73077 7.70711 10.1213L10.5355 12.9497C10.9261 13.3402 11.5592 13.3402 11.9497 12.9497C12.3403 12.5592 12.3403 11.926 11.9497 11.5355L9.12132 8.70708C8.7308 8.31655 8.09763 8.31655 7.70711 8.70708Z"
              fill="currentColor"
            />
          </svg>
        </label>
        <div
          class="flex border-b-2 border-gray-500 items-center text-primary p-2"
        >
          <div class="flex">
            <span
              v-if="'schedule' in data"
              class="block font-bold text-primary mt-2 text-xl"
              >{{ data["schedule"] }} horas</span
            >
            <span
              v-if="data.eatHour"
              class="
                text-xs
                font-bold
                ml-8
                flex flex-col
                justify-center
                items-center
              "
              ><i class="gg-coffee text-xl"></i> 1 hora</span
            >
          </div>
        </div>
      </div>
      <div class="w-full px-3 mb-6 md:mb-0 mt-4">
        <label
          class="
            flex
            justify-start
            items-center
            uppercase
            tracking-wide
            text-secondary text-xs
            font-bold
            mb-2
          "
          for="grid-state"
        >
          Centro de Trabajo
          <svg
            class="mx-2 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z"
              fill="currentColor"
            />
          </svg>
        </label>
        <div class="flex items-center p-2 border-b-2 border-gray-500 relative">
          <div>
            <span class="block text-3xl font-bold"></span>
            <div
              data-cy="workplaceSidebar"
              class="workplace"
              v-if="workplaceCheck"
            >
              <span
                class="
                  block
                  cursor-pointer
                  text-xl
                  font-bold
                  text-primary
                  mb-2
                  p-1
                  px-2
                  hover:bg-indigo-800 hover:border-2
                  rounded-lg
                "
                v-for="(place, index) in data.workplace"
                :key="index"
                @click="sendWorkPlace(place)"
              >
                {{ place }}
              </span>
            </div>
            <div
              data-cy="workplaceSidebar"
              class="workplace"
              v-if="!workplaceCheck"
            >
              <span
                class="
                  block
                  cursor-pointer
                  text-xl
                  font-bold
                  text-primary
                  mb-2
                  p-1
                  px-2
                  hover:bg-indigo-800 hover:border-2
                  rounded-lg
                "
              >
                {{ data.workplace }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <legalLinks class="mt-4 my-2" />
      <ul class="absolute bottom-0 w-full">
        <li class="w-full bg-secondary">
          <button
            data-cy="sidebarLogout"
            @click="logout"
            class="flex items-center p-4 text-white w-full"
          >
            <span class="gg-log-out text-primary mr-4 ml-2"></span>
            <span class="text-primary pl-3">Cerrar Session</span>
          </button>
        </li>
        <li class="w-full bg-red-700">
          <button
            id="deleteUser"
            @click="deleteUser"
            class="flex items-center p-4 w-full"
          >
            <span class="gg-danger text-primary mr-4 ml-2"></span>
            <span class="text-primary">Borrar la cuenta</span>
          </button>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts">
import legalLinks from "@/views/Legal/legalLinks.vue";
import { defineComponent, ref, watch, computed } from "vue";
import { showSidebar, toggleSidebar } from "@/components/navigation/comStore";
import { user, logout } from "@/components/auth/comStore";
import useFirestore from "../index";
import firebase from "firebase/app";
import "firebase/auth";

export default defineComponent({
  props: {
    workplace: {
      type: [Array, String],
    },
    selectedWorkplace: {
      type: String,
    },
  },
  setup() {
    const profileImg = ref<string>("@/assets/img/apimosa.png");
    const uid = ref(user.value!.uid);

    const { data, loading, deleteDoc, updateDoc } = useFirestore({
      queryType: "doc",
      type: "watch",
      path: "attendanceUsers/$uid",
      variables: {
        uid,
      },
    });
    const deletingUser = ref(false);
    const deleteUser = async () => {
      if (window.confirm("Do you really want to leave?")) {
        try {
          deletingUser.value = true;
          firebase.auth().currentUser!.delete();
          await deleteDoc();
          deletingUser.value = false;
        } catch (e) {
          deletingUser.value = false;
          console.error(e);
        }
      }
    };

    const workplaceCheck = computed(() => {
      return typeof data.workplace !== "string";
    });

    const sendWorkPlace = async (value: string) => {
      if (data.value.workplace.length == 1) {
        return;
      }
      let workplaces = Object.values(data.value.workplace);
      workplaces = workplaces.filter((item) => item !== value);
      workplaces.unshift(value);

      await updateDoc({
        workplace: workplaces,
      });
    };

    watch(uid, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    }),
      { immediate: true };

    // let thingsDocumentProps = useThingsDocument(collectionName, {
    //   onMounted: false,
    // });
    return {
      toggleSidebar,
      showSidebar,
      user,
      profileImg,
      data,
      deleteUser,
      sendWorkPlace,
      workplaceCheck,
      logout,
    };
  },
  components: {
    legalLinks,
  },
});
</script>

<style scoped>
.workplace:first-child {
  border-b: 2px solid blue;
}

.svg-icon {
  width: 2em;
  height: 2em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #0551b5;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 2;
}
</style>
