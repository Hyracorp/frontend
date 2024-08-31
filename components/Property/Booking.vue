<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { usePropertyStore } from "@/stores/property";
import { bookingSchema } from "@/schemas/bookingSchema";
import { z } from "zod";
/**/
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
const props = defineProps({
  property: {
    type: Object,
    default: () => null,
  },
});

const selectedDate = ref();
const selectedSlot = ref();
const minDate = ref(new Date());

const maxDate = ref(new Date(new Date().setDate(new Date().getDate() + 15)));
const availableDates = ref([]);
const availableSlots = ref([]);
const toast = useToast();
const user = computed(() => authStore.getUser);
const booking = computed(() => propertyStore.getBooking);
// Booking
const visible = ref(false);
const bookingInfo = ref({
  phone: "",
  gender: "",
});
async function handleBooking(id) {
  availableDates.value = await propertyStore.getAvailableDates(id);
  visible.value = true;
}
async function handleViewSlots() {
  if (bookingInfo.value.phone && bookingInfo.value.gender) {
    if (selectedDate.value) {
      availableSlots.value = await propertyStore.getAvailableTimeSlots(
        selectedDate.value,
        props.property.id,
      );
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Please select a date",
        life: 3000,
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please enter your phone number and gender",
      life: 3000,
    });
  }
}
async function handleBookingSubmit() {
try{
    if(selectedDate.value && selectedSlot.value){
        await propertyStore.bookVisit(selectedDate.value, selectedSlot.value, props.property.id,user.value.id)
        toast.add({ severity: 'success', summary: 'Success', detail: 'Property booked successfully', life: 3000 });
        visible.value=false
        propertyStore.checkBookingStatus(props.property.id, user.value.id)
    }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a date and slot', life: 3000 });
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: ` ${err.issues[0].path[0]}: ${err.issues[0].message}`,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "something went wrong",
        life: 3000,
      });
    }
  }
}

// CANCEL BOOKING
let cancelWarning = ref(false);
async function handleCancelBooking() {

  const cancelcheck = await propertyStore.cancelBooking(booking.value.id);
  if (cancelcheck == true) {
    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Booking Cancelled",
      life: 3000,
    });
    cancelWarning.value = false;
   await propertyStore.checkBookingStatus(props.property.id, user.value.id);
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error Booking",
      life: 3000,
    });
  }
}

watchEffect(async () => {
  await propertyStore.checkBookingStatus(props.property.id, user.value.id);
console.log(booking.value)
});
</script>
<template>
  <div class="">
    <div v-if="property">
      <Card>
        <template #content>
          <div v-if="booking && booking.time">
            <div v-if="(booking.status = 'pending')">
              <div class="font-bold text-xl text-black">
                Booked Visit at
                <span class="text-blue-500">{{
                  `${new Date(booking.date).toDateString()} ${booking.time}`
                  }}</span>
              </div>
              <div class="font-bold text-sm text-gray">
                please reach before time, Phone:+919999999999
              </div>
            </div>
            <div v-else-if="(booking.status = 'completed')">
              <div class="font-bold text-xl text-black">
                Completed Visit at
                <span class="text-blue-500">{{
                  `${new Date(booking.date).toDateString()} ${booking.time}`
                  }}</span>
              </div>
              <div class="font-bold text-sm text-gray">
                Check Status of the visit, Phone:+919999999999
              </div>
            </div>
            <div v-else-if="
              booking.staus == 'cancelled' || booking.staus == 'cancelledLate'
            ">
              <div v-if="booking.staus == 'cancelled'">
                <div class="font-bold text-xl text-black">
                  Cancelled Visit at
                  <span class="text-blue-500">{{
                    `${new Date(booking.date).toDateString()} ${booking.time}`
                    }}</span>
                </div>
                <div class="font-bold text-sm text-gray">
                  Check Status of the visit, Phone:+919999999999
                </div>
              </div>
              <div v-if="booking.staus == 'cancelledLate'">
                <div class="text-red-400 text-sm">
                  Warning you cancelled booking very late last time, your
                  account maybe deleted if you cancell a booking on or before 8
                  hours of scheduled visit multiple times.
                </div>
              </div>
            </div>
            <div v-else-if="booking.status == 'rejected'">
              <div class="font-bold text-xl text-black">
                Rejected Visit at
                <span class="text-blue-500">{{
                  `${new Date(booking.date).toDateString()} ${booking.time}`
                  }}</span>
              </div>
              <div class="font-bold text-sm text-gray">
                Check Status of the visit, Phone:+919999999999
              </div>
            </div>
            <div v-else>
              <div>Unkown booking status please reach Phone:+919999999999</div>
            </div>
          </div>

          <div v-else>
            <div class="font-bold text-xl text-black">Book A Visit</div>
            <div class="font-bold text-sm text-gray">
              Book a visit to view the property
            </div>
            <div class="py-2">
              Need more details? Get in touch with hyracorp
              <a href="phone:+919999999999" class="text-blue-500 text-lg">
                +91 123456789</a>
            </div>
          </div>
        </template>

        <template #footer>
          <div v-if="booking && booking.time" class="">
{{ booking.status }}
            <div v-if="booking.status == 'pending'">
              <Button class="w-full" label="Cancel Booking" @click="cancelWarning = true" />
<Dialog v-model:visible="cancelWarning">
<template #header>
  <h3>Warning</h3>
</template>
<template #footer>
  <Button label="No" icon="pi pi-times" @click="cancelWarning = false" />
  <Button label="Yes" icon="pi pi-check" @click="handleCancelBooking()" autofocus />
</template>
Are you sure you want to cancel booking?
</Dialog>            
</div>
            <div v-else-if="
              booking.status == 'cancelled' ||
              booking.status == 'cancelledLate'
            ">
              <Button class="w-full" label="Book Now" @click="() => handleBooking(property.id)" />
            </div>
            <div v-else>* No action available</div>
          </div>

          <Button v-else class="w-full" label="Book Now" @click="() => handleBooking(property.id)" />
        </template>
      </Card>
      <Dialog v-model:visible="visible" header="Book a Visit" modal>
        <div class="p-3">
          <div class="py-2">
            Enter Phone
            <InputText v-model="bookingInfo.phone" class="w-full" type="text" placeholder="Phone Number" />
          </div>
          <div class="py-2">
            Select Gender
            <Dropdown v-model="bookingInfo.gender" :options="['Male', 'Female', 'Other']" placeholder="Select Gender"
              class="w-full" />
          </div>
          Select a Date
          <Calendar v-model="selectedDate" showIcon dateFormat="dd/mm/yy" :minDate="minDate" :maxDate="maxDate">
            <template #date="slotProps">
              <strong v-if="!availableDates.includes(slotProps.date.day)" class="text-red-500 line-through">{{
                slotProps.date.day }}</strong>
              <template v-else>{{ slotProps.date.day }}</template>
            </template>
          </Calendar>
          <div class="py-2">
            <Button label="View Available Slots" size="small" @click="handleViewSlots" />
          </div>
        </div>
        <div v-if="selectedDate && availableSlots.length > 0" class="p-3">
          <div class="text-md py-2">Select a Slot</div>
          <SelectButton v-model="selectedSlot" :options="availableSlots" optionLabel="time"
            :pt="{ button: 'px-3 py-2', label: 'text-sm md:text-lg' }" />
          <Button class="my-3 w-full" label="Book Now" @click="handleBookingSubmit" />
        </div>
        <div v-else>
          <div class="text-sm text-red-500">No Slots Available</div>
        </div>
      </Dialog>
    </div>
    <div v-else>
      <Card>
        <template #content>
          <Skeleton class="mb-2" />
          <Skeleton width="10rem" class="mb-2" />
          <Skeleton width="5rem" class="mb-2" />
          <Skeleton height="2rem" class="mb-2" />
          <Skeleton width="10rem" height="4rem" />
        </template>
      </Card>
    </div>
  </div>
</template>
