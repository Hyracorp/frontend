<script setup lang="ts">
import Booking from './Booking.vue';
defineProps({
    property: {
        type: Object,
        default: () => null
    }
})
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 2
    }
]);
</script>

<template>
    
<div class="">
    <div v-if="property" class="">
    <Galleria :value="property.images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" :showItemNavigators="true" class="overflow-hidden rounded-xl">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" class=" rounded-xl" >
    </template>
    <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;"  />
            </template>
            <template #caption="slotProps">
        <div class="text-xl mb-2 font-bold">{{ slotProps.item.title }}</div>
       
    </template>
    </Galleria>
    <Booking class="fixed left-0 bottom-0 md:static w-full"/>
</div>
<Skeleton v-else class="w-full md:h-400 h-200" height="300px" width="100%"/>
</div>
</template>