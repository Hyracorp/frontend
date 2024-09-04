<script setup lang="ts">
const properties = ref([])
</script>

<template>
    <div class="p-5 h-full w-full flex justify-center">
        <div class="" v-if="properties.length>0">
            <div v-for="property,index in properties" :key="index">
                {{ property }}
            </div>
        </div>
        <div  v-else class="">
           <div class="text-xl">
            <Icon name="ph:dog" class="text-3xl"/>
            No Properties found
           </div>
        </div>
    </div>
</template>
