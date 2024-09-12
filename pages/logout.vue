<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
const authStore=useAuthStore()

onMounted(async() => {
    await authStore.logout()
    navigateTo('/')
})
</script>
<template>
    <div class="p-5">
        Logging out user...
    </div>
</template>