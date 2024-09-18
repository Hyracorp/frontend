<script setup lang="ts">
const {$api} = useNuxtApp()
const propertyAPI = usePropertyAPI($api) 
const propertyStore = usePropertyStore()
const bookings =ref([]) 
watchEffect(async () => {
try{
  const res = await propertyAPI.getBookings()
  if(res.results) bookings.value = res
    }catch(err){
  console.log(err)
}
})
definePageMeta({
    layout: "tenant",
    title: 'Tenant Profile',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="h-full">
 
    <TenantHome :bookings="bookings?.count"/>
  </div>
  
  <FooterSection class="" />
</template>
