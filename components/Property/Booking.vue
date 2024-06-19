<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { usePropertyStore } from '@/stores/property';
const propertyStore = usePropertyStore()
const authStore=useAuthStore()
const props=defineProps({
    property: {
        type: Object,
        default: () => null
    }
})
// Booking
const visible=ref(false)
const selectedDate=ref()
const selectedSlot=ref()
const minDate=ref(new Date())

const maxDate=ref(new Date(new Date().setDate(new Date().getDate() + 15)))
const availableDates=ref([])
const availableSlots=ref([])
const toast= useToast();
const user = computed(() => authStore.getUser)
const booking = computed(() => propertyStore.getBooking)
async function handleBooking(id) {
    availableDates.value=await propertyStore.getAvailableDates(id)
    visible.value=true
}
async function handleViewSlots() {
    if(selectedDate.value){
        availableSlots.value=await propertyStore.getAvailableTimeSlots(selectedDate.value, props.property.id)
    }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a date', life: 3000 });
    }
    
}
async function handleBookingSubmit() {
    if(selectedDate.value && selectedSlot.value){
        await propertyStore.bookVisit(selectedDate.value, selectedSlot.value, props.property.id,user.value.id)
        toast.add({ severity: 'success', summary: 'Success', detail: 'Property booked successfully', life: 3000 });
        visible.value=false
        propertyStore.checkBookingStatus(props.property.id, user.value.id)
    }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a date and slot', life: 3000 });
    }
}

    
watchEffect(async () => {
    await propertyStore.checkBookingStatus(props.property.id, user.value.id)
    });
</script>
<template>
    <div class="">
   <div  v-if="property">
    <Card>
        
        <template #content>
         
            <div v-if="booking && booking.time" >
                <div class="font-bold text-xl text-black">Booked Visit at <span class="text-blue-500">{{ `${new Date(booking.date).toDateString()} ${booking.time.time}` }}</span></div>
                <div class="font-bold text-sm text-gray">Book a visit to view the property</div>
            </div>
            <div v-else>
                <div class="font-bold text-xl text-black">Book  A Visit</div>
            <div class="font-bold text-sm text-gray">Book a visit to view the property</div>
            <div class="py-2">Need more details? Get in touch with hyracorp <a href="phone:+919999999999" class="text-blue-500 text-lg"> +91 123456789</a></div>
            </div>
        </template>    
          
            <template #footer>
                <div v-if="booking && booking.time" class="" >
                    <Button  class="w-full" label="Cancel Booking" />
                </div>
                
                <Button v-else class="w-full" label="Book Now" @click="()=>handleBooking(property.id)"  />
            </template>
        </Card>
        <Dialog v-model:visible="visible" header="Book a Visit" modal>
            <div class="p-3">
                Select a Date
                <Calendar v-model="selectedDate" showIcon dateFormat="dd/mm/yy" :minDate="minDate" :maxDate="maxDate" >
                    <template #date="slotProps">
        <strong v-if="!availableDates.includes(slotProps.date.day)" class="text-red-500 line-through">{{ slotProps.date.day }}</strong>
        <template v-else>{{ slotProps.date.day }}</template>
    </template>
                </Calendar>
                <div class="py-2">
                    <Button label="View Available Slots" size="small" @click="handleViewSlots"  />
                </div>
            </div>
            <div  v-if="selectedDate && availableSlots.length > 0" class="p-3">
                <div class="text-md py-2">
                    Select a Slot
                </div>
                <SelectButton v-model="selectedSlot" :options="availableSlots" optionLabel="time" :pt="{ 'button': 'px-3 py-2', 'label': 'text-sm md:text-lg' }"  />
                <Button class="my-3 w-full" label="Book Now" @click="handleBookingSubmit"/>
            </div>
            <div v-else>
                <div class="text-sm text-red-500">No Slots Available</div>
            </div>
        </Dialog>
   </div>
   <div  v-else>
<Card>
    <template #content>
        <Skeleton class="mb-2"/>
<Skeleton width="10rem" class="mb-2"/>
<Skeleton width="5rem" class="mb-2"/>
<Skeleton height="2rem" class="mb-2"/>
<Skeleton width="10rem" height="4rem"/>
    </template>
</Card>
   </div>
    </div>
</template>