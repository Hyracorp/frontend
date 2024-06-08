<script setup lang="ts">
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
    <div class="p-3 max-w-7xl mx-auto flex justify-between flex-wrap flex-col-reverse  md:flex-row">
        <MainLeft :property="property"/>
        <MainRight class="md:w-1/2" :property="property"/>
    </div>
</template>
