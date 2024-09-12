<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
import { useAuthStore } from "@/stores/auth";
const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
import { bookingSchema } from "@/schemas/bookingSchema";
import { z } from "zod";
const property = computed(() => propertyStore.property);
const userType = computed(() => authStore.getUserType);
let booking = ref(null);
const visible = ref(false);
const cancelWarning = ref(false);
const resheduleWarning = ref(false);
const route = useRoute();
const router = useRouter();
const bookingInfo = ref({
  phone: "",
  gender: "",
});
const selectedDate = ref();
const selectedSlot = ref();
const minDate = ref(new Date());
minDate.value.setHours(12, 0, 0, 0);
const maxDate = ref(new Date(new Date().setDate(new Date().getDate() + 15)));
const availableDates = ref([]);
let availableSlots = ref([]);

const toast = useToast();
const bookingActions = computed(() => {
  if (!booking.value) return null;

  const status = booking.value.visit_status;

  const actions = {
    Pending: {
      action: () => (cancelWarning.value = true),
      buttonText: "Cancel Booking",
      title: "Your booking is pending",
      description:
        "Your booking is currently pending. You can cancel it if you wish.",
    },
    "No Show": {
      action: goDashboard,
      buttonText: "Go to Dashboard",
      title: "You missed your appointment",
      description:
        "You did not attend the appointment. Please contact us for further assistance.",
    },
    Approved: {
      action: () => (cancelWarning.value = true),
      buttonText: "Cancel Booking",
      title: "Your booking is approved",
      description:
        "Your booking has been approved. You can still cancel it if necessary.",
    },
    Cancelled: {
      action: goDashboard,
      buttonText: "Go to Dashboard",
      title: "Your booking was cancelled",
      description:
        "Your booking has been cancelled. You can schedule a new one from your dashboard.",
    },
    Rejected: {
      action: contactSupport,
      buttonText: "Contact Support",
      title: "Your booking was rejected",
      description:
        "Unfortunately, your booking was rejected. Please contact support for assistance.",
    },
    Visited: {
      action: goDashboard,
      buttonText: "Go to Dashboard",
      title: "You have visited",
      description:
        "Thank you for visiting. You can view your details on the dashboard.",
    },
    Finalized: {
      action: goDashboard,
      buttonText: "Go to Dashboard",
      title: "Your booking is finalized",
      description:
        "Your booking has been finalized. You can check the details on your dashboard.",
    },
    Expired: {
      action: () => (visible.value = true),
      buttonText: "Book Again",
      title: "Your booking has expired",
      description:
        "Your booking has expired. Please contact support for rescheduling.",
    },
    Rescheduled: {
      action: goDashboard,
      buttonText: "Go to Dashboard",
      title: "Your booking was rescheduled",
      description:
        "Your booking has been rescheduled. Please check your dashboard for new details.",
    },
  };

  return actions[status] || null;
});

const goDashboard = () => {
  if (userType.value === "tenant") {
    router.push("/tenant");
  }
  if (userType.value === "landlord") {
    router.push("/landlord");
  }
};

const contactSupport = () => {
  console.log("Contacting support");
};
const bookNow = () => {
  console.log("Book Now");
};

async function updateProperty() {
  let property = await propertyAPI.getProperty(route.params.id);

  await propertyStore.setProperty(property);
}
function getFormattedDate(date) {
  let inputDate = new Date(date);
  inputDate.setHours(12, 0, 0, 0);
  return inputDate.toISOString().split("T")[0];
}
async function handleViewSlots() {
  if (selectedDate.value) {
    // fix invalid date by adding 12 hours
    const formattedDate = getFormattedDate(selectedDate.value);

    let slots = await propertyAPI.getAvailableSlots(
      property.value.id,
      formattedDate,
    );

    availableSlots.value = await propertyStore.getAvailableTimeSlots(slots);
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please fill required fields",
      life: 3000,
    });
  }
}

async function handleBookingSubmit() {
  try {
    if (selectedDate.value && selectedSlot.value) {
      const formattedDate = getFormattedDate(selectedDate.value);

      const bookingPayload = {
        property: String(property.value.id),
        date: formattedDate,
        time: selectedSlot.value.value,
        phone: bookingInfo.value.phone,
        gender: bookingInfo.value.gender,
      };
      bookingSchema.parse(bookingPayload);
      const res = await propertyAPI.bookVisit(bookingPayload);
      if (res.id) await updateProperty();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Property booked successfully",
        life: 3000,
      });
      visible.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Please select a date and slot",
        life: 3000,
      });
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
      console.log(err);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "something went wrong",
        life: 3000,
      });
    }
  }
}

async function handleCancelBooking() {
  try {
    const res = await propertyAPI.cancelBooking(booking.value.id);
    if (res) await updateProperty();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Booking cancelled successfully",
      life: 3000,
    });
    await updateProperty();
    cancelWarning.value = false;
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "something went wrong",
      life: 3000,
    });
  }
}
watchEffect(() => {
  if (property.value.bookings.length > 0) {
    booking.value = property.value.bookings[0];
  }
});
</script>

<template>
  <div>
    <!-- Booking Card -->
    <div>
      <div v-if="property && booking">
        <Card :pt="{ body: 'pt-2 md:pt-5','footer': 'pt-2 md:pt-5','content': 'pt-2 md:pt-5'}" >
          <template #content>
            <div v-if="bookingActions">
              <div class="font-bold text-xl text-black">
                {{ bookingActions.title }}
                <span class="text-blue-500">{{
                  `${new Date(booking.date).toDateString()} ${booking.time}`
                  }}</span>
              </div>
              <div class="font-bold text-sm text-gray">
                {{ bookingActions.description }}
              </div>
            </div>
          </template>
          <template #footer>
            <div v-if="bookingActions">
              <Button @click="bookingActions.action">{{
                bookingActions.buttonText
                }}</Button>
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <Card>
          <template #content>
            <div class="font-bold text-xl text-black">Book A visit</div>
            <div class="font-bold text-sm text-gray">
              Book and appoitment to view your property <br />
              For any further assistance contact us : +91 9876543210
            </div>
          </template>
          <template #footer>
            <Button @click="visible = true">Book Now</Button>
          </template>
        </Card>
      </div>
    </div>
    <!-- Booking Card End -->

    <!-- Booking Dialog -->

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
            <strong>{{ slotProps.date.day }}</strong>
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
    <!-- Booking Dialog End -->
    <!-- Warning Dialog -->
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
    <!-- Warning Dialog End -->
  </div>
</template>
