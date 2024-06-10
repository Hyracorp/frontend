<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'
const store = usePropertyStore()
const featuredCollection = computed(() => store.featuredProperties)
</script>
<template>
    <div class="py-10 p-5">
        <div class="py-10">
            <h1 class="text-3xl font-bold text-gray-600">Featured Properties</h1>
        </div>
        <div class="max-w-screen overflow-hidden overflow-x-auto">
            <div class="flex gap-3">
                <Card v-for="data in featuredCollection" :key="data.id" class="max-w-md min-w-72 w-full rounded-xl">
                    <template #header>
                        <div class="overflow-hidden rounded-t-xl">
                            <img alt="user header" :src="data.images[0].itemImageSrc" class="w-72 md:w-full">
                        </div>
                    </template>
                    <template #title> {{ data.title }}  </template>
                    <template #subtitle> {{ data.location }} </template>
                    <template #content>

                        <p class="m-0">
                            {{ data.description }}
                        </p>
                    </template>
                    <template #footer>

                        <div class="flex justify-between items-center">
                            <div class="">
                                <h3 class="text-xl font-bold">₹ {{ data.price }}</h3>
                                <p class="text-sm font-medium text-gray-500">Per Month</p>
                            </div>
                            <NuxtLink :to="`/property/${data.id}`"> <Button class="">View
                                    Details</Button></NuxtLink>
                        
                        </div>
                    </template>
                </Card>
             
            </div>
        </div>
    </div>

</template>