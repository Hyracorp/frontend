<template>
  <div class="p-3">
    <div class="">
      <Property v-if="property" :property="property" />
      <div v-else class="flex justify-center">Property Not Found :(</div>
      <ScrollTop />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";

const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);

const propertyStore = usePropertyStore();
const cloudinary_base_url = computed(() => propertyStore.getCloudinaryBaseURL);
const route = useRoute();
const property = computed(() => propertyStore.getProperty);
onMounted(async () => {
  try {
    const res = await propertyAPI.getProperty(route.params.id);
    await propertyStore.setProperty(res);
  } catch (err) {
    console.log(err);
  }
});
useSeoMeta({
  title: "Hyracorp - Search Across 1000s of Properties",
  ogTitle: "Hyracorp Property Search",
  description: "Search across 10000+ verified property listings",
  ogDescription: "Search across 10000+ verified property listings",
  ogImage: property.value?.photos[0]?.photo_url
    ? `${cloudinary_base_url.value}${property.value?.photos[0]?.photo_url}`
    : "https://app.hyracorp.com/img/og.jpeg",
  twitterCard: "summary_large_image",
});
definePageMeta({
  layout: "default",
  title: "Property Details",
  middleware: "auth",
});
</script>
