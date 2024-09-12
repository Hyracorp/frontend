<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { usePropertyStore } from "@/stores/property";
const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const propertyStore = usePropertyStore();
const props = defineProps({
  bookings: {
    type: Array,
  },
});
const formattedBookings = ref([]);

async function formatBookings(bookings: []) {
  const propertyMap = {};

  // Group properties by their ID
  bookings.forEach((booking) => {
    const propertyId = booking.property.id;
    if (!propertyMap[propertyId]) {
      propertyMap[propertyId] = {
        ...booking.property,
        booking_count: 0,
      };
    }
    propertyMap[propertyId].booking_count += 1;
  });

  // Convert the propertyMap object back to an array
  const finalResults = Object.values(propertyMap);
  
  return finalResults;
}

watchEffect(async () => {
  if (props.bookings.length > 0) {
    formattedBookings.value = await formatBookings(props.bookings);
  }
});
const imageBaseUrl = computed(() => propertyStore.getCloudinaryBaseURL);
</script>

<template>
  <div class="p-5 h-full w-full">
          
    <div class="">
      <h1 class="text-2xl font-bold py-5">Bookings</h1>
    </div>
    <div class="flex flex-col gap-3" v-if="bookings.length > 0">
      <div v-for="(booking, index) in formattedBookings" class="p-4 gap-3 border-t border-gray-200 dark:border-gray-700"
        :key="index">
        <div class="flex flex-start items-start gap-3 flex-wrap">
          <img v-if="booking.photos.length > 0" :src="`${imageBaseUrl}${booking.photos[0].photo_url}`"
            class="md:block w-32 rounded-md" />
          <div class="w-full md:w-2/3">
            <div class="text-xl font-bold">
              {{ booking.title }}
            </div>
            <div class="text-sm">
      Rent:{{booking.expected_rate_rent}}
        </div>
            <div class="text-sm">
              {{ booking.city }} , {{ booking.state }}
            </div>
            <div class="text-lg font-bold text-blue-500">
              Bookings: {{ booking.booking_count }}
            </div>
          
          </div>
  <NuxtLink :to="`/property/${booking.id}`" class="text-blue-500 underline py-2"><Button
                label="View Property" size="small" /></NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <div class="text-xl">
        <Icon name="ph:dog" class="text-3xl" />
        No Bookings found
      </div>
    </div>
  </div>
</template>
