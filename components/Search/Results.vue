<script setup lang="ts">
const searchResults = ref([
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

    }])
</script>
<template>
    <div class="">
        <div class="py-5">
            <h1 class="text-xl font-bold text-gray-600">Found 10 properties matching your search</h1>
        </div>
        <div class="flex gap-3 flex-wrap">
            <Card v-for="data in searchResults" :key="data.id" class="max-w-sm min-w-72 w-full  rounded-xl">

                <template #header>
                    <div class="overflow-hidden rounded-t-xl">
                        <img alt="user header" :src="data.image" class=" md:w-full">
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
</template>
