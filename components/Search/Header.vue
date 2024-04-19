<script setup lang="ts">
const value = ref('Cochin')
</script>
<template>
    <div class="">
        <div class="">
            <h1 class="text-xl font-bold text-gray-600">Search</h1>
            <div class="py-2 flex flex-col md:flex-row flex-wrap gap-2 md:items-center">
                <div class="flex gap-2">
                    <InputText v-model="value" type="text" disabled />
                    <Button class="" :pt="{ 'root': 'p-0' }">
                        <Icon name="ph:pencil" class="w-12" />
                    </Button>
                </div>
                <small class="px-2 text-gray-500">Price Range: ₹ 2,000 - ₹ 80,000</small>
            </div>
        </div>
    </div>
</template>