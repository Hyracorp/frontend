<script setup lang="ts">
let collectionData = ref([
    {
        id: 1,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '80,000',
        location: 'Dhaka, Bangladesh'

    },
    {
        id: 2,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '80,000',
        location: 'Dhaka, Bangladesh'

    },
    {
        id: 3,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '80,000',
        location: 'Dhaka, Bangladesh'

    },

])
</script>
<template>
    <div class="py-10 p-5">
        <div class="py-10">
            <h1 class="text-3xl font-bold text-gray-600">Featured Properties</h1>
        </div>
        <div class="w-screen overflow-hidden overflow-x-auto">
            <div class="flex gap-3">
                <Card class="max-w-md min-w-72 w-full rounded-xl" v-for="data in collectionData" :key="data.id">
                    <template #header>
                        <div class="overflow-hidden rounded-t-xl">
                            <img alt="user header" :src="data.image" class="w-72 md:w-full" />
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
                            <Button class="">View Details</Button>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>

</template>