<script setup lang="ts">
definePageMeta({
    layout: "tenant",
    title: 'Tenant Bookings',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="h-full w-full flex items-center justify-center ">
    <TenantBookings  />
  </div>
</template>
