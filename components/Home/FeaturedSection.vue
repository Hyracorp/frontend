<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'
const store = usePropertyStore()
const featuredCollection = computed(() => store.featuredProperties)
const visible = ref(false)



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
                            <img alt="user header" :src="data.image" class="w-72 md:w-full">
                        </div>
                    </template>
                    <template #title> {{ data.title }} </template>
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
                            <!-- <NuxtLink :to="`/property/${data.id}`"> <Button class="">View
                                    Details</Button></NuxtLink> -->
                            <Button class="" @click="visible = true">View
                                Details</Button>
                        </div>
                    </template>
                </Card>
                <Dialog v-model:visible="visible">
                    <div class="p-5 flex justify-center items-center flex-col gap-3">
                        <Icon name="ph:info" class="text-5xl text-red-400" />
                        <p>

                            Please login into view more
                        </p>
                        <Button class="" @click="visible = !visible">Login</Button>
                    </div>
                </Dialog>
            </div>
        </div>
    </div>

</template>