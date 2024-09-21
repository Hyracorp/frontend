<template>
  <VitePwaManifest />
  <div v-if="loading" class="loading-container flex justify-center items-center h-screen w-screen bg-gray-100">
    <div class="loader">
      <img src="/img/pwa-192x192.png" class="w-36 animate-spin" >
    </div>
  </div>
  <div>
    <NuxtLayout>
      <Toast class="pl-10 md:p-0" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Hyracorp - Search Across 1000s of Properties',
  ogTitle: 'Hyracorp Property Search',
  description: 'Search across 10000+ verified property listings',
  ogDescription: 'Search across 10000+ verified property listings',
  ogImage: 'https://app.hyracorp.com/img/og.jpeg',
  twitterCard: 'summary_large_image',
})

const nuxtApp = useNuxtApp();
const loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

import { useAuthStore } from "@/stores/auth";
import { usePropertyStore } from "@/stores/property";
const authStore = useAuthStore();
const propertyStore = usePropertyStore();

onMounted(async () => {
  await authStore.init();
});


</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80px;
  height: 40px;
}
</style>
