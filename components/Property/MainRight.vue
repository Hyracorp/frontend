<script setup lang="ts">
import Booking from "./Booking.vue";
import { usePropertyStore } from "@/stores/property";
import { ref, computed } from 'vue';

const store = usePropertyStore();
const property = computed(() => store.property);
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "1024px",
    numVisible: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
  },
  {
    breakpoint: "576px",
    numVisible: 1,
  },
]);
const cloudinary_base_url = computed(() => store.getCloudinaryBaseURL);
</script>

<template>
  <div>
    <div v-if="property" class="relative w-full">
      <div class="bg-gray-200 rounded-xl shadow-lg overflow-hidden">
        <Galleria 
          :value="property.photos" 
          :responsiveOptions="responsiveOptions" 
          :numVisible="5" 
          :circular="true"
          :showItemNavigators="true" 
          class="overflow-hidden rounded-xl"
        >
          <template #item="slotProps">
            <div class="relative w-full">
              <img 
                :src="slotProps.item.photo_url !== null
                    ? `${cloudinary_base_url}${slotProps.item.photo_url}` 
                    : 'https://dummyimage.com/600x400/e3e3e3/000000&text=image+not+added'"
                :alt="slotProps.item.title" 
                class="w-full h-80 object-cover rounded-xl shadow-md transition-transform transform hover:scale-105" 
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white">
                <div class="text-xl font-bold">{{ slotProps.item.title }}</div>
              </div>
            </div>
          </template>
          <template #thumbnail="slotProps">
            <img 
              :src="`${cloudinary_base_url}${slotProps.item.photo_url}`" 
              alt="Property Thumbnail" 
              class="thumbnail-img" 
            />
          </template>
          <template #caption="slotProps">
            <div class="text-xl mb-2 font-bold text-white">{{ slotProps.item.title }}</div>
          </template>
        </Galleria>
      </div>
      <Booking class="fixed z-50 left-0 bottom-0 md:static w-full" :property="property" />
    </div>
    <Skeleton v-else class="w-full md:h-400 h-200" height="300px" width="100%" />
  </div>
</template>

<style scoped>
/* Full-width container */
.relative {
  width: 100%;
}

/* Main image hover effect */
.galleria-item img {
  transition: transform 0.3s ease;
  z-index: 1;
}

.galleria-item img:hover {
  transform: scale(1.05);
}

/* Thumbnail appearance */
.thumbnail-img {
  width: 80px;
  height: 80px;
  object-cover: cover;
  border-radius: 8px;
  border: 2px solid #ccc;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.thumbnail-img:hover {
  transform: scale(1.10);
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* Styling for active and adjacent thumbnails */
.galleria-thumbnail {
  position: relative;
  display: flex;
  justify-content: center;
}

.galleria-thumbnail .p-thumbnail {
  transition: opacity 0.3s ease;
}

.galleria-thumbnail .p-thumbnail.active {
  opacity: 1;
}

.galleria-thumbnail .p-thumbnail:not(.active) {
  opacity: 0.5;
}

/* Add a gradient overlay for better readability */
.galleria-item .overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  padding: 1rem;
}
</style>
