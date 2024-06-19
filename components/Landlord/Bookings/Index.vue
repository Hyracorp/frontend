<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {usePropertyStore} from '@/stores/property'
const authStore  = useAuthStore()
const user = computed(() => authStore.getUser)
const propertyStore = usePropertyStore()
const bookings = computed(() => propertyStore.getLandlordBookings)
onMounted(async () => {
    await propertyStore.fetchLandlordBookings(user.value.id)
})
</script>

<template>
    <div class="p-5 h-full w-full ">
        <div class="flex flex-col gap-3" v-if="bookings.length>0">
         
            <div v-for="booking,index in bookings" :key="index">
                <Card>
                    <template #content>
                    <div class="">
                    <div class="font-bold text-xl">
                        {{ booking.property.title }} <span class="text-blue-500">
                            ({{ booking.bookings.length }})
                        </span>
                    </div>
                    <div class="">
                        <Card v-if="booking.bookings.length>0">
                            <template #content>
                                <div v-for="item,index in booking.bookings" :key="index">
                                    <div class="font-bold text-xl text-black">Booked Visit at <span class="text-blue-500">{{ `${new Date(item.date).toDateString()} ${item.time.time}` }}</span></div>
                                </div>
                            </template>
                        </Card>
                        <div v-else class="">
                            No Bookings for this Property
                        </div>
                    </div>
                    </div>
                    </template>
                </Card>
            </div>
        </div>
        <div  v-else class="flex justify-center">
           <div class="text-xl">
            <Icon name="ph:dog" class="text-3xl"/>
            No Bookings found
           </div>
        </div>
    </div>
</template>


