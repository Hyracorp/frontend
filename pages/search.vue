<template>
    <div class="p-5">
        <SearchHeader />
        <SearchResults />
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "search",
    title: 'Search',
    // middleware: "auth",
});
</script>