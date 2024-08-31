<script setup lang="ts">


const props = defineProps({
    results: {
        type: Array,
        default: () => []
    }
})
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    { label: 'Price High to Low', value: '!expected_rate_rent' },
    { label: 'Price Low to High', value: 'expected_rate_rent' },
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
const visible = ref(false)
</script>
<template>
    <div class="max-w-screen">
        <DataView v-if="results.length > 0" :dataKey="'id'" :value="results" layout="grid" :sortOrder="sortOrder"
            :sortField="sortField">

            <template #header>
                <div class="max-w-7xl mx-auto">
                    <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price"
                        @change="onSortChange($event)" />
                </div>
            </template>
            <template #grid="results">

                <div class="flex flex-wrap max-w-7xl mx-auto my-3">
                    <div v-for="(item, index) in results.items" :key="index" class="w-full p-3 max-w-sm">
                        <Card class="max-w-sm">
                            <template #header>
                                <div class="overflow-hidden rounded-t-xl">
                                    <img alt="user header" :src="item.first_photo_url" class="w-full">
                                </div>
                            </template>
                            <template #title> {{ item.title }} ({{ item.bhk }} BHK) </template>
<template #subtitle> {{ item.city }} , {{item.state}} </template>
                            <template #content>

                            </template>
                            <template #footer>

                                <div class="flex justify-between items-center">
                                    <div class="">
                                        <h3 class="text-xl font-bold">₹ {{ item.expected_rate_rent }}</h3>
                                        <p class="text-sm font-medium text-gray-500">Per Month</p>
                                    </div>
                                    <NuxtLink :to="`/property/${item.id}`"> <Button class="">View
                                    Details</Button></NuxtLink>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </template>

        </DataView>
        <div class="" v-else>
            <p class="p-5">No Results found</p>
        </div>
    </div>
</template>
