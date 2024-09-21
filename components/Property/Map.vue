<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePropertyStore } from '@/stores/property'

const propertyStore = usePropertyStore()
const location = computed(() => propertyStore.property)
const mapElement = ref(null)

async function initMap() {
  if (process.client) {
    const L = await import('leaflet')
    // Fix Leaflet's icon paths
    delete L.Icon.Default.prototype._getIconUrl;

    const iconRetinaUrl = new URL(
      "leaflet/dist/images/marker-icon-2x.png",
      import.meta.url,
    ).href;
    const iconUrl = new URL(
      "leaflet/dist/images/marker-icon.png",
      import.meta.url,
    ).href;
    const shadowUrl = new URL(
      "leaflet/dist/images/marker-shadow.png",
      import.meta.url,
    ).href;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
    const map = L.map(mapElement.value).setView([51.505, -0.09], 13)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const marker = L.marker([location.value.latitude, location.value.longitude]).addTo(map)
    marker.bindPopup(`<b>${location.value.title}</b><br>${location.value.city}`).openPopup()
    map.setView([location.value.latitude, location.value.longitude], 13)
  }
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div ref="mapElement" style="height: 300px; width: 100%;" />
</template>

<style>
@import 'leaflet/dist/leaflet.css';
</style>
