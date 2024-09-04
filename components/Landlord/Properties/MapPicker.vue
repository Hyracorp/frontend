<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const location = {
    lat:9.93988000,
    longi:76.2602200
}
const marker = ref(null)
const mapPicker=ref(null)
async function initMap() {
      mapPicker.value = L.map('mapPicker').setView([51.505, -0.09], 13);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapPicker.value);
      marker.value = L.marker([location.lat, location.longi]).addTo(mapPicker.value);
        mapPicker.value.setView([location.lat, location.longi], 8);
        
    }
onMounted(async () => {
    await initMap()
    if(mapPicker.value){
 
 mapPicker.value.on('click', (e) => { 
    location.lat = e.latlng.lat
    location.longi = e.latlng.lng
   if(marker.value){marker.value.remove()}
    marker.value = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mapPicker.value);
    mapPicker.value.setView([e.latlng.lat, e.latlng.lng], 13);

  })
}
})
defineEmits(['location-picked'])
</script>

<template>
    <div id="mapPicker" ref="mapPicker" style="height: 200px; width: 200px" />
    <div class="flex justify-end">
        <Button @click="$emit('location-picked',location)" >Set Location</Button>
    </div>
</template>
