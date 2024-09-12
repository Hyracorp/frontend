<script setup lang="ts">
const {$api} = useNuxtApp()
const propertyAPI = usePropertyAPI($api) 
const propertyStore = usePropertyStore()
const bookings =ref([]) 
watchEffect(async () => {
try{
  const res = await propertyAPI.getBookings()
  if(res.results) bookings.value = res.results
}catch(err){
  console.log(err)
}
})


definePageMeta({
    layout: "landlord",
    title: 'Landlord Profile',
    middleware: "landlord-auth",
})
</script>
<template>
    <div class="w-full p-5">
       <LandlordBookings :bookings="bookings"/>
    </div>
</template>
