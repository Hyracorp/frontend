<script setup lang="ts">
definePageMeta({
    layout: "tenant",
    title: 'Tenant Profile',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="h-full">
    <TenantHome />
  </div>
</template>
