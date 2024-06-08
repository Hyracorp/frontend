<template>
    <div class="p-3">
        <div class="">
            <Property :property="property" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'

const propertyStore = usePropertyStore()
const route = useRoute()
const property=computed(()=>propertyStore.property)
onMounted(async () => {
    await propertyStore.fetchProperty(route.params.id)
})


definePageMeta({
    layout: "default",
    title: 'Property Details',
    middleware: "auth",
});
</script>