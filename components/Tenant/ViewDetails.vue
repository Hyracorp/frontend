<script setup lang="ts">
const collectionData = ref([
    {
        id: 1,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '80,000',
        location: 'Dhaka, Bangladesh'

    },

])
</script>

<script lang="ts">

import bedroomImage from '../../assets/img/background/bedroom_1.jpg'; // Adjust the path as per your project structure

export { bedroomImage };

</script>

<template>
    <div class="py-10 p-5 flex flex-col justify-center items-center" 
     :style="{ backgroundImage: 'url(' + bedroomImage + ')', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                width: '100%', 
                height: '100%' }">

        <div class="max-w-xl flex flex-col gap-8">
            <!-- Main Text -->
            <div class="">
                <h3 class="text-xl font-bold text-white">Welcome Landlord</h3>
                <p class=" text-white">List your property with us to a wide range of audience.
                </p>
            </div>

            <!-- Hero Add Property Card -->
        </div>
    </div>
    <div class="py-10 p-5">
        <div class="py-10">
            <h1 class="text-3xl font-bold text-gray-600">Your Listed Properties</h1>
            <p>These are the properties you have already listed</p>
        </div>
        <div class="max-w-screen overflow-hidden overflow-x-auto">
            <div class="flex gap-3">
                <Card class="max-w-md min-w-72 w-full rounded-xl" v-for="data in collectionData" :key="data.id">
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
                            <Button class="">Edit</Button>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>

</template>