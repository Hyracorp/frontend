<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {usePropertyStore} from '@/stores/property'

const propertyStore = usePropertyStore()

const props = defineProps({
    locationCode: {
        type: String,
        default: () => null
    }
})

const map=ref(null)
async function initMap() {
      map.value = L.map('map').setView([51.505, -0.09], 13);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

      const [location] = await propertyStore.searchCityByCode(props.locationCode)
        const marker = L.marker([location.lat, location.longi]).addTo(map.value);

        marker.bindPopup(`<b>${location.name}</b><br>${location.name}`).openPopup();
        map.value.setView([location.lat, location.longi], 13);
    
    }
onMounted(async () => {
    await initMap()
})
</script>

<template>
    <div id="map" ref="map" style="height: 400px; width: 100%;" class="w-screen" />
</template>