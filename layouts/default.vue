<script setup lang="ts">
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
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
    <div>
        <Nav v-if="showMenu" class="fixed top-0 w-full z-50 bg-white" />
        <div class="">
            <slot />
        </div>
    </div>
</template>
