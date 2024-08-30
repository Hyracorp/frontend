<script setup lang="ts">
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {usePropertyStore} from '@/stores/property'

const propertyStore = usePropertyStore()

const props = defineProps({
   location:{
    type:Object,
    default:()=>{}
   }
})

const map=ref(null)
const marker = ref(null)
async function initMap() {
      map.value = L.map('map').setView([51.505, -0.09], 13);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map.value);

     
       
    
    }
onMounted(async () => {
    await initMap()
})
watchEffect(()=>{ 
  if(map.value){
    if(marker.value){
      marker.value.remove()
    }
 

    marker.value =L.marker([props.location.lat, props.location.longi]).addTo(map.value);
    marker.value.bindPopup(`<b>Your Location</b>`).openPopup();
    map.value.setView([props.location.lat, props.location.longi], 13);
  }
})

</script>

<template>
    <div id="map" ref="map" style="height: 200px; width: 200px" />
</template>