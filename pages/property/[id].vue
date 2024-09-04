<template>
    <div class="p-3">
        <div class="">
            <Property v-if="property.data" :property="property.data" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'

const { $api } = useNuxtApp()
const propertyAPI = usePropertyAPI($api)

const propertyStore = usePropertyStore()
const route = useRoute()
const property=await useAsyncData(() => propertyAPI.getProperty(route.params.id)) 

onMounted(async () => {
   
await propertyStore.setProperty(property.data.value)
})


definePageMeta({
    layout: "default",
    title: 'Property Details',
    middleware: "auth",
});
</script>
