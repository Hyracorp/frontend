<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'
const route = useRoute()
const {$api} = useNuxtApp()
const propertyAPI = usePropertyAPI($api) 
const queryData = ref({
    city: route.query.location,
    logitude: route.query.longitude,
    latitude: route.query.latitude,
    locationName: '',
    bhkNo: route.query.bhkNo,
    priceRange: [Number(route.query.priceRange[0] * 1000), Number(route.query.priceRange[1] * 1000)],
    propertyType: route.query.propertyType
})

const propertyStore = usePropertyStore()
const searchResults =ref([]) 
watchEffect(async () => {
    searchResults.value = await propertyAPI.searchProperty(queryData.value)
})

definePageMeta({
    layout: "search",
    title: 'Search',
    // middleware: "auth",
});
</script>
<template>
    <div class="p-5">
        <SearchHeader :query="queryData" />
        <SearchResults :query="queryData" :results="searchResults?.results" />
    </div>
</template>
