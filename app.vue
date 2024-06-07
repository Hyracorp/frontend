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
  const store=useAuthStore()
  onMounted(async ()=>{
    store.initStorage()
  })
</script>