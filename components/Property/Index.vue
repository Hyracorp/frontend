<script setup lang="ts">
import Location from './Location.vue';
import MainLeft from './MainLeft.vue';
import MainRight from './MainRight.vue';
defineProps({
    property: {
        type: Object,
        default: () => null
    }
})
</script>

<template>
    <div class="max-w-7xl mx-auto">

        <div class="p-3  flex justify-between flex-wrap flex-col-reverse  md:flex-row">
        <MainLeft :property="property"/>
        <MainRight class="md:w-1/2" :property="property"/>
        
    </div>
    <div class="">
        <Location :property="property"/>
    </div>
    </div>
</template>
