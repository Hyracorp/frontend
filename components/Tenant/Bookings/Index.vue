<script setup lang="ts">
import {usePropertyStore} from '@/stores/property'
import {useAuthStore} from '@/stores/auth'
const authStore  = useAuthStore()
const user = computed(() => authStore.getUser)
const propertyStore = usePropertyStore()
const bookings = computed(() => propertyStore.getTenantBookings)

onMounted(async () => {
    await propertyStore.fetchTenantBookings(user.value.id)
})
    


</script>

<template>
    <div class="p-5 h-full w-full flex">
        <div class="flex gap-3 flex-wrap" v-if="bookings.length>0">
            <div v-for="booking,index in bookings" :key="index" class="">
                <Card class=" w-full">
                 
                    <template #content>
                       <div class="flex justify-between gap-3">
                        <div class="font-bold text-xl text-black">Booked Visit at <span class="text-blue-500">{{ `${new Date(booking.date).toDateString()} ${booking.time.time}` }}</span></div>
                        <div class="font-bold text-xl text-gray-500">
                            {{ booking.status }}
                        </div>
                       </div>
                       <div class="py-3">
                           {{ booking.property.title }}
                       </div>
                       <div class="py-3 font-bold">
                        Rent:   {{ booking.property.price }}
                       </div>
                    </template>
                    <template #footer>
                       <div class="flex gap-3">
                        <Button label="View Details" size="small" />
                        <Button label="Cancel" size="small" />
                       </div>
                    </template>
                </Card>
            </div>
        </div>
        <div  v-else class="flex justify-center">
           <div class="text-xl">
            <Icon name="ph:dog" class="text-3xl"/>
            No Bookings found <NuxtLink to="/" class="text-blue-500">Start Exploring Now</NuxtLink>
           </div>
        </div>
    </div>
</template>


