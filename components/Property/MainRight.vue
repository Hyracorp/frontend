<script setup lang="ts">
import Booking from "./Booking.vue";
import { usePropertyStore } from "@/stores/property";
const store = usePropertyStore();
const property = computed(() => store.property);
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
  },
]);
const cloudinary_base_url = computed(() => store.getCloudinaryBaseURL);
</script>

<template>
  <div class="">
    <div v-if="property" class="">
<div class="bg-gray-200 rounded-xl">
<Galleria :value="property.photos" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true"
        :showItemNavigators="true" class="overflow-hidden rounded-xl">
        <template #item="slotProps">
          <img :src="slotProps.item.photo_url !== null
              ? `${cloudinary_base_url}${slotProps.item.photo_url}`
              : 'https://dummyimage.com/600x400/e3e3e3/000000&text=image+not+added'
            " :alt="slotProps.item.title" style="width: 100%; display: block"
            class="rounded-xl h-80 object-scale-down" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="`${cloudinary_base_url}${slotProps.item.photo_url}`" alt="Property"
            style="display: block; width: 100px" />
        </template>
        <template #caption="slotProps">
          <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>
        </template>
      </Galleria>



</div>      <Booking class="fixed z-50 left-0 bottom-0 md:static w-full" :property="property" />
    </div>
    <Skeleton v-else class="w-full md:h-400 h-200" height="300px" width="100%" />
  </div>
</template>
