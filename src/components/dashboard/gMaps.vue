<template>
  <section class="relative">
    <GoogleMap
      v-if="markers.length > 0"
      :api-key="map_api"
      style="width: 100%; height: 500px"
      :center="position ? position : markers[0]['gps']"
      :zoom="11"
      :zoomControl="false"
      :mapTypeControl="false"
      :scaleControl="false"
      :streetViewControl="false"
      :rotateControl="false"
      :fullscreenControl="true"
      :disableDefaultUI="false"
    >
      <Marker
        :clickable="true"
        @click="openInfoWindowTemplate(m)"
        :key="index"
        v-for="(m, index) in filtredMarkers"
        :options="{ position: m['gps'] }"
      />
    </GoogleMap>
    <div
      class="flex items-center justify-center p-2 ml-2 absolute top-0 left-0"
    >
      <button
        @click="addMarkersFilter('leave')"
        :class="filterBy === 'leave' ? 'bg-transparent' : 'bg-primary'"
        class="
          mt-1
          ml-2
          w-8
          h-8
          rounded-xl
          flex
          justify-center
          items-center
          font-semibold
          text-xl text-primary
        "
      >
        ↑
      </button>
      <button
        @click="addMarkersFilter('enter')"
        :class="filterBy === 'enter' ? 'bg-transparent' : 'bg-primary'"
        class="
          mt-1
          ml-2
          w-8
          h-8
          rounded-xl
          flex
          justify-center
          items-center
          font-semibold
          text-xl text-primary
        "
      >
        ↓
      </button>
    </div>
    <div
      class="flex items-center justify-center p-2 ml-24 absolute top-0 left-0"
    >
      <div class="relative inline-block text-left dropdown">
        <select
          class="
            py-1
            h-10
            w-32
            pl-3
            pr-6
            text-base
            placeholder-gray-600
            border
            rounded-lg
            appearance-none
            focus:shadow-outline
          "
          placeholder="Ciudades"
          v-model="city"
        >
          <option
            disabled
            selected
            class="
              text-primary
              flex
              justify-between
              w-full
              px-4
              py-2
              text-sm
              leading-5
              text-left
              cursor-pointer
            "
            role="menuitem"
          >
            Ciudades
          </option>
          <option
            :value="workplace"
            @click="setWorkplace(workplace)"
            v-for="(workplace, index) in workplaces"
            :key="index"
            class="
              text-primary
              flex
              justify-between
              w-full
              px-4
              py-2
              text-sm
              leading-5
              text-left
              cursor-pointer
            "
            role="menuitem"
          >
            {{ workplace }}
          </option>
        </select>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-2
            pointer-events-none
          "
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
export default defineComponent({
  name: "Gmaps",
  components: { GoogleMap, Marker },
  setup(props) {
    const filterBy = ref(null);
    const filtredMarkers = ref(props.markers);
    const city = ref(null);
    const position = ref(null);
    const map_api = process.env.VUE_APP_GOOGLE_API_KEY;
    const openInfoWindowTemplate = (marker) => {
      const { time, author } = marker;
      window.alert(
        `${author.name} ${author.surname} ${time.replace("T", " ")}`
      );
    };
    const workplaces = computed(() => {
      return [
        ...new Set(
          props.markers
            .map((marker) => marker.city)
            .filter((marker) => marker !== undefined)
        ),
      ];
    });
    const addMarkersFilter = (filter) => {
      if (filter === filterBy.value) filterBy.value = null;
      filterBy.value = filter;
      filtredMarkers.value = props.markers.filter(
        (marker) => marker.type === filter
      );
    };

    watch(
      city,
      (newValue) => {
        if (newValue) {
          position.value = props.markers.filter(
            (marker) => marker.city === newValue
          )[0]["gps"];
        }
      },
      { immediate: true }
    );
    // watch(
    //   filterBy,
    //   (newValue) => {
    //     if (newValue) {
    //       if (newValue === filterBy.value) filterBy.value = null;
    //       filterBy.value = newValue;
    //       filtredMarkers.value = props.markers.filter(
    //         (marker) => marker.type === newValue
    //       );
    //     } else {
    //       filtredMarkers.value = props.markers;
    //     }
    //   },
    //   { immediate: true }
    // );
    watch(
      () => props.markers,
      (newValue) => {
        if (newValue.length > 0) {
          filtredMarkers.value = props.markers;
        }
      },
      { immediate: true }
    );
    return {
      map_api,
      openInfoWindowTemplate,
      workplaces,
      city,
      position,
      filterBy,
      addMarkersFilter,
      filtredMarkers,
    };
  },
  props: {
    markers: {
      type: Array,
      required: false,
    },
  },
});
</script>
<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
