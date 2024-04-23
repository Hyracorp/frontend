<template>
    <div class="max-w-7xl mx-auto overflow-hidden">
        <HomeHero />
        <HomeFeaturedSection class="" />
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const auth = useAuthStore()
const isAuthenticated = computed(() => auth.getAuthStatus)

onMounted(async () => {
    console.log(isAuthenticated.value)

})
async function login() {
    await auth.login()
    console.log(isAuthenticated.value)
}
</script>