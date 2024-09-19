<template>
  <VitePwaManifest />
<div v-if="loading" class="flex justify-center items-center h-screen bg-gray-100 w-screen">Loading..</div>
  <div>
    <NuxtLayout>
      <Toast class="pl-10 md:p-0" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(false);
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
