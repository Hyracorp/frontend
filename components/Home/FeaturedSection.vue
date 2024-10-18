<script setup lang="ts">
import Button from 'primevue/button';
import { usePropertyStore } from "@/stores/property";
const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);

const store = usePropertyStore();

const featuredCollection = computed(() => store.featuredProperties);

onMounted(async () => {
  let featuredProperties = await propertyAPI.getFeaturedProperties();
  await store.setFeaturedProperties(featuredProperties);
});
</script>
<template>
  <div class="p-5">
    <div class="py-10">
      <h1 class="text-3xl font-bold text-gray-600">Featured Properties</h1>
    </div>
    <div class="max-w-screen overflow-hidden overflow-x-auto">
      <div v-if="featuredCollection?.length > 0" class="flex gap-3 py-2">
        <Card v-for="data in featuredCollection" :key="data.id" class="max-w-md min-w-72 w-full rounded-xl">
          <template #header>
            <div class="overflow-hidden rounded-t-xl">
              <img alt="user header" :src="data.first_photo_url ??
                'https://dummyimage.com/600x400/e3e3e3/000000&text=image+not+added'
                " class="w-full h-56 object-cover" />
            </div>
          </template>
          <template #title> {{ data.title }} </template>
          <template #subtitle> {{ data.city }} , {{ data.state }} </template>
          <template #content> </template>
          <template #footer>
            <div class="flex justify-between items-center">
              <div class="">
                <h3 class="text-xl font-bold">
                  ₹ {{ data.expected_rate_rent }}
                </h3>
                <p class="text-sm font-medium text-gray-500">Per Month</p>
              </div>
              <NuxtLink :to="`/property/${data.id}`">
                <Button class="">View Details</Button>
              </NuxtLink>
            </div>
          </template>
        </Card>
      </div>
      <div v-else  class="flex gap-3" >
        <div v-for="index in 3" :key="index" class="max-w-md min-w-72 w-full rounded-xl">
          <Skeleton height="7rem" />
          <Skeleton class="mt-2" />
          <Skeleton class="mt-2" />
          <Skeleton class="mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>
