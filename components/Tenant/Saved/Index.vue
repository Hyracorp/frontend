<script setup lang="ts">
const saved=[]
</script>

<template>
    <div class="p-5 h-full w-full flex justify-center">
        <div class="" v-if="saved.length>0">
            <div v-for="property,index in saved" :key="index">
                {{ property }}
            </div>
        </div>
        <div  v-else class="">
           <div class="text-xl">
            <Icon name="ph:dog" class="text-3xl"/>
            No Saved Properties found
           </div>
        </div>
    </div>
</template>
