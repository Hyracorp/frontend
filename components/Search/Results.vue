<script setup lang="ts">
const searchResults = ref([
    {
        id: 1,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 80000,
        location: 'Dhaka, Bangladesh'

    },
    {
        id: 2,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 90000,
        location: 'Dhaka, Bangladesh'

    },
    {
        id: 3,
        title: 'Luxury House in Dhaka',
        image: 'https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 100000,
        location: 'Dhaka, Bangladesh'

    }])
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
]);
const onSortChange = (event: any) => {

    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
</script>
<template>
    <div class="max-w-screen">
        <DataView :dataKey="'id'" :value="searchResults" layout="grid" :sortOrder="sortOrder" :sortField="sortField">

            <template #header>
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
                    @change="onSortChange($event)" />
            </template>
            <template #grid="results">

                <div class="flex flex-wrap">
                    <div v-for="(item, index) in results.items" :key="index" class="w-full p-3 max-w-sm">
                        <Card class="max-w-sm">
                            <template #header>
                                <div class="overflow-hidden rounded-t-xl">
                                    <img alt="user header" :src="item.image" class="w-full">
                                </div>
                            </template>
                            <template #title> {{ item.title }} </template>
                            <template #subtitle> {{ item.location }} </template>
                            <template #content>

                                <p class="m-0">
                                    {{ item.description }}
                                </p>
                            </template>
                            <template #footer>

                                <div class="flex justify-between items-center">
                                    <div class="">
                                        <h3 class="text-xl font-bold">₹ {{ item.price }}</h3>
                                        <p class="text-sm font-medium text-gray-500">Per Month</p>
                                    </div>
                                    <Button class="">View Details</Button>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>

        </DataView>
    </div>
</template>
