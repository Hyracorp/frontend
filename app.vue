<template>
  <div v-if="loading" class="loading-container flex justify-center items-center h-screen w-screen bg-gray-100">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
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
const nuxtApp = useNuxtApp();
const loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
  setTimeout(() => {
    console.log("Loading...");
  }, 3000);
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

.dot {
  width: 12px;
  height: 12px;
  background-color: #3498db;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
}

</style>
