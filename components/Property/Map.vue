<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { usePropertyStore } from '@/stores/property';

const propertyStore = usePropertyStore();
const location = computed(() => propertyStore.property);

const map=ref(null)
async function initMap() {
      map.value = L.map('map').setView([51.505, -0.09], 13);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

        const marker = L.marker([location.value.latitude, location.value.longitude]).addTo(map.value);

        marker.bindPopup(`<b>${location.value.title}</b><br>${location.value.city}`).openPopup();
        map.value.setView([location.value.latitude, location.value.longitude], 13);
    
    }
onMounted(async () => {
    await initMap()
})
</script>

<template>
    <div id="map" ref="map" style="height: 400px; width: 100%;" />
</template>
