<script setup lang="ts">
import Map from './Map.vue';
defineProps({
    property: {
        type: Object,
        default: () => null
    }
})
</script>

<template>
    <div class="py-3">
 <div v-if="property">
    <div class="text-2xl font-bold">Location</div>
    <div class="">
        <div class="text-xl font-bold">Address</div>
        <div class="">ABC, XYZ</div>
    </div>
    <div class="">
        <Map :locationCode="property.locationCode" />
    </div>
</div>
    <Skeleton v-else class="w-full md:h-400 h-200" height="300px" width="100%"/>
</div>


</template>

