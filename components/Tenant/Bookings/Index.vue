<script setup lang="ts">
const bookings=[]
</script>

<template>
    <div class="p-5 h-full w-full flex justify-center">
        <div class="" v-if="bookings.length>0">
            <div v-for="booking,index in bookings" :key="index">
                {{ booking }}
            </div>
        </div>
        <div  v-else class="">
           <div class="text-xl">
            <Icon name="ph:dog" class="text-3xl"/>
            No Bookings found
           </div>
        </div>
    </div>
</template>


