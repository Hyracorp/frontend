<template>
  <div>
    <NuxtLayout>
      <Toast class="pl-10 md:p-0" />
      <NuxtPage />

    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { usePropertyStore } from '@/stores/property';
  const authStore=useAuthStore()
  const propertyStore=usePropertyStore()
  onMounted(async () => {
    await authStore.init()
  })
</script>
