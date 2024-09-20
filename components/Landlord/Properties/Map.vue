<script setup lang="ts">
import { ref, onMounted, toRefs, watchEffect } from 'vue'
import { usePropertyStore } from "@/stores/property"

const propertyStore = usePropertyStore()

const props = defineProps({
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
})

const { latitude, longitude } = toRefs(props)
const mapElement = ref(null)
const map = ref(null)
const marker = ref(null)

async function initMap() {
  if (process.client) {
    const L = await import('leaflet')
    map.value = L.map(mapElement.value).setView([latitude.value, longitude.value], 13)
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value)

    updateMarker(L)
  }
}

function updateMarker(L: any) {
  if (map.value) {
    if (marker.value) {
      marker.value.remove()
    }
    marker.value = L.marker([latitude.value, longitude.value]).addTo(map.value)
    marker.value.bindPopup(`<b>Your Location</b>`).openPopup()
    map.value.setView([latitude.value, longitude.value], 13)
  }
}

onMounted(() => {
  initMap()
})

watchEffect(async () => {
  if (process.client && map.value) {
    const L = await import('leaflet')
    updateMarker(L)
  }
})
</script>

<template>
  <div ref="mapElement" style="height: 200px; width: 200px" />
</template>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
