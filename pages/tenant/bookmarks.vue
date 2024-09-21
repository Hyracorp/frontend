<script setup lang="ts">
definePageMeta({
    layout: "tenant",
    title: 'Tenant Bookmarks',
    middleware: "tenant-auth",
})
</script>
<template>
  <div class="">
    <TenantSaved />
  </div>

</template>
