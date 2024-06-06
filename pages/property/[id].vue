<template>
    <div class="">
        <h1>property</h1>
    </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'

let propertyStore = usePropertyStore()
const route = useRoute()
onMounted(async () => {
    await propertyStore.fetchProperty(route.params.id)
})


definePageMeta({
    layout: "",
    title: '',
    // middleware: "auth",
});
</script>