<script setup lang="ts">
definePageMeta({
    layout: "tenant",
    title: 'Tenant Properties',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="">
    <TenantProperties />
  </div>
</template>
