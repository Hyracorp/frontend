<script setup lang="ts">
const visible = ref(false)

const items = ref([
    { label: 'Home', icon: 'ph:user-circle' ,link:'/tenant'},
    { label: 'Bookings', icon: 'ph:calendar',link:'/tenant/bookings'},
    { label: 'Properties', icon: 'ph:building',link:'/tenant/properties'}, 
    { label: 'Saved', icon: 'ph:bookmark',link:'/tenant/bookmarks'},
    { label: 'Settings', icon: 'ph:gear', link:'/tenant/settings'},     
]);
const device = useDevice()
if(device.isDesktop){
    visible.value = true
}
</script>
<template>
    <div class="max-w-screen max-h-screen">
        
        <div class="flex w-full">

            <div class="md:w-80 w-0">
                <TenantSidebar v-model:visible="visible" :items="items" @sidebar-toggle="visible = !visible"  />
            </div>
            <div class="h-full w-full">
                <TenantNav class="fixed z-50 bg-white " :visible="visible" @sidebar-toggle="visible = !visible"  />
               <div class="h-full w-full overflow-y-auto my-12 ">
                <slot />
               </div>
            </div>
        </div>
        
    </div>
</template>
