<script setup lang="ts">

const props = defineProps({
    query: Object
})

</script>
<template>
    <div class="">
        <div class="">
            <div class="flex gap-3">
                <Button class="" :pt="{ 'root': 'p-0' }" text @click="$router.back()">
                    <Icon name="ph:arrow-left" class="text-xl" />
                </Button>
                <h1 class="text-xl font-bold text-gray-600">Search</h1>
            </div>
            <div class="py-2 flex flex-col md:flex-row flex-wrap gap-2 md:items-center max-w-7xl mx-auto">
                <div class="flex gap-2 ">
                    <InputText v-model="query.locationName" type="text" disabled />
                    <Button class="" :pt="{ 'root': 'p-0' }" @click="$router.push('/')">
                        <Icon name="ph:pencil" class="text-xl w-12" />
                    </Button>
                </div>
                <small class="px-2 text-gray-500">Price Range {{ query.priceRange[0] }} - {{ query.priceRange[1]

                    }}</small>
            </div>
        </div>

    </div>
</template>