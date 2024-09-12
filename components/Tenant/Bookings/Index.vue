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

const imageBaseUrl = computed(() => propertyStore.getCloudinaryBaseURL);
</script>

<template>
  <div class="p-5 h-full w-full">
          
    <div class="">
      <h1 class="text-2xl font-bold py-5">Bookings</h1>
    </div>
    <div class="flex flex-col gap-3" v-if="bookings.length > 0">
      <div v-for="(booking, index) in bookings " class="p-4 gap-3 border-t border-gray-200 dark:border-gray-700"
        :key="index">
        <div class="flex flex-start items-start gap-3 flex-wrap">
          <img v-if="booking.property.photos.length > 0" :src="`${imageBaseUrl}${booking.property.photos[0].photo_url}`"
            class="md:block w-32 rounded-md" />
          <div class="w-full md:w-2/3">
            <div class="text-xl font-bold">
              {{ booking.property.title }}
            </div>
            <div class="text-sm">
      Rent:{{booking.expected_rate_rent}}
        </div>
            <div class="text-sm">
              {{ booking.property.city }} , {{ booking.property.state }}
            </div>
            <div class="text-lg font-bold text-blue-500">
              Booking: {{ booking.visit_status }}
            </div>
          
          </div>
  <NuxtLink :to="`/property/${booking.property.id}`" class="text-blue-500 underline py-2"><Button
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
