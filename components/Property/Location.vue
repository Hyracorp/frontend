<script setup lang="ts">
import { usePropertyStore } from '@/stores/property';

const propertyStore = usePropertyStore();
const property = computed(() => propertyStore.property);
import Map from './Map.vue';

</script>

<template>
    <div class="py-3">
 <div v-if="property">
    <div class="text-2xl font-bold">Location</div>
    <div class="">
        <div class="text-xl font-bold">Address</div>
<div class="max-w-xs py-3">{{property.address_line1}}</div><div class="">{{property.address_line2}}</div>

    </div>
    <div class="">
<Map  :location="property" class="z-40" />
    </div>
</div>
    <Skeleton v-else class="w-full md:h-400 h-200" height="300px" width="100%"/>
</div>


</template>

