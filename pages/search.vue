<template>
    <div class="p-5">
        <SearchHeader :query="queryData" />
        <SearchResults :query="queryData" :results="searchResults" />
    </div>
</template>
<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'
const route = useRoute()
const queryData = ref({
    locationCode: route.query.location,
    locationName: '',
    bhkNo: route.query.bhkNo,
    priceRange: [Number(route.query.priceRange[0] * 1000), Number(route.query.priceRange[1] * 1000)]
})
const propertyStore = usePropertyStore()
const searchResults = computed(() => propertyStore.getSearchResults)
onMounted(async () => {
    const city = await propertyStore.searchCityByCode(route.query.location)
    queryData.value.locationName = city[0].name
    await propertyStore.searchProperty(queryData.value)
})

definePageMeta({
    layout: "search",
    title: 'Search',
    // middleware: "auth",
});
</script>