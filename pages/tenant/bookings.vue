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
    layout: "tenant",
    title: 'Tenant Bookings',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="h-full w-full flex items-center justify-center ">
    <TenantBookings :bookings="bookings"  />
  </div>
  <FooterSection class="" />
</template>
