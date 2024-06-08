
<script setup lang="ts">


 defineProps({
    property: {
        type: Object,
        default: () => null
    }

})


</script>
<template>
<div class="">
   
    <div v-if="property" class="flex flex-col gap-2">
    
    <div class="flex flex-col gap-2">
        <div class="text-3xl font-bold">
        {{ property.title }}
    </div>
    <div class=" font-medium text-gray-500">
        {{ property.location }}
    </div>
    <div class="text-2xl font-bold">
        ₹ {{ property.price }}
    </div>
    
    </div>

    <div class="">
        <div class="text-xl font-bold">Amenities</div>
        <div class="flex max-w-md gap-3 flex-wrap">
            <div  v-for="amenity,index in property.amenities" :key="index" class="flex items-center gap-3">
                <Icon :name="amenity.icon" class="text-3xl" />
                <div class="capitalize">
                    {{ amenity.name }}
                </div>
          
            </div>
        </div>
    </div>
    <div class="">
        <div class="text-xl font-bold">Rules</div>
        <div class="">
            <ul v-for="rule,index in property.rules" :key="index">
                <li>{{ rule }}</li>
            </ul>
        </div>
    </div>
    <div class="">
        <div class="text-xl font-bold">About</div>
        <div class="max-w-sm text-sm">
        {{ property.description }}
    </div>
    </div>
   
</div>
<div  v-else>
<Skeleton class="mb-2"/>
<Skeleton width="10rem" class="mb-2"/>
<Skeleton width="5rem" class="mb-2"/>
<Skeleton height="2rem" class="mb-2"/>
<Skeleton width="10rem" height="4rem"/>
</div>
</div>
</template>
