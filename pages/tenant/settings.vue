<script setup lang="ts">
definePageMeta({
    layout: "tenant",
    title: 'Tenant Settings',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="">
    <TenantSettings/>
  </div>
</template>
