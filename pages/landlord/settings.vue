<script setup lang="ts">
definePageMeta({
    layout: "landlord",
    title: 'Landlord Profile',
    middleware: "landlord-auth",
})
</script>
<template>
    <div class="w-full p-5 bg-gray-100">
        <LandlordSettings />
    </div>
</template>
