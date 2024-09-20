<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

// nav
const showMenu = ref(true)
let lastScrollY = 0
const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down, hide the menu
        showMenu.value = false
    } else {
        // Scrolling up, show the menu
        showMenu.value = true
    }
    lastScrollY = window.scrollY
}
const authStore=useAuthStore()
const loginStatus=computed(()=>authStore.getAuthStatus)
const user=computed(()=>authStore.getUser)
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
    <div class="max-w-screen overflow-hidden">
        <NavBar v-if="showMenu" class="fixed top-0 w-full z-50 bg-white" :user="user" :loginStatus="loginStatus" />
        <div class="md:py-32 py-[80px] min-h-[90vh]">
            <slot />
        </div>
        <FooterSection />
    </div>
</template>
