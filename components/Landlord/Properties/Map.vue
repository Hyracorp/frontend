<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePropertyStore } from "@/stores/property";

const propertyStore = usePropertyStore();

const props = defineProps({
  latitude: {
    type: Number, // Keep latitude as a Number
    default: 0,
  },
  longitude: {
    type: Number, // Keep longitude as a Number
    default: 0,
  },
});

// Destructure props using toRefs for reactivity
const { latitude, longitude } = toRefs(props);

const map = ref(null);
const marker = ref(null);

async function initMap() {
  map.value = L.map("map").setView([latitude.value, longitude.value], 13);

  // Use OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);
}

onMounted(async () => {
  await initMap();
});

watchEffect(() => {
  if (map.value) {
    if (marker.value) {
      marker.value.remove();
    }

    // Use latitude and longitude directly as numbers
    marker.value = L.marker([latitude.value, longitude.value]).addTo(map.value);
    marker.value.bindPopup(`<b>Your Location</b>`).openPopup();
    map.value.setView([latitude.value, longitude.value], 13);
  }
});
</script>

<template>
  <div id="map" style="height: 200px; width: 200px" />
</template>
