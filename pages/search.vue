<template>
    <div class="p-5">
        <SearchHeader />
        <SearchResults />
    </div>
</template>
<script setup lang="ts">
const route = useRoute()
onMounted(() => {
    // read url query for search
    console.log(route.query)
})

definePageMeta({
    layout: "search",
    title: 'Search',
    // middleware: "auth",
});
</script>