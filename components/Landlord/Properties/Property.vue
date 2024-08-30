<script setup lang="ts">
import addProperty from './addProperty.vue';
const showAddPropertyModal = ref(false)
const showRoommateDetailsCard = ref(false)
const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'OCCUPIED':
            return 'success';

        case 'VACANT':
            return 'warn';

        case 'SOLD':
            return 'danger';

        default:
            return null;
    }
};
defineProps({
    properties: {
        type: Array,
        default: () => []
    }
})
</script>
<template>
    <div class="">
        <div class="">
            <Dialog v-model:visible="showAddPropertyModal" modal>
                <addProperty @close="showAddPropertyModal = false" />
            </Dialog>
        </div>
        <div class="">
            <DataView :value="properties" :data-key="'property'">
                        <template #header>
                            <Button @click="showAddPropertyModal = true"> <Icon name="ph:plus" class="text-xl" /> Add Property</Button>
                        </template>
                            <template #list="slotProps">
                                <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-1">
                                        <div class="flex flex-col sm:flex-row md:flex-row p-4 gap-3 border-t border-gray-200 dark:border-gray-700">
                                            <div class="w-full sm:w-1/4 md:w-1/5 relative">
                                                <img class="block mx-auto rounded-md w-full" :src="item.image" :alt="item.name" />
                                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute left-4 top-4"></Tag>
                                            </div>
                                            <div class="flex flex-col sm:flex-row md:flex-row justify-between sm:items-center md:items-start flex-1 gap-4">
                                                <div class="flex flex-col md:flex-row justify-between items-start gap-2">
                                                    <div>
                                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                        <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80 mt-2">{{ item.name }}</div>
                                                        <a type="submit" @click="showRoommateDetailsCard = !showRoommateDetailsCard" class="items-end justify-end"><span class="font-medium text-secondary text-sm">Occupant: <span class="text-blue-500">{{ item.description }}</span></span></a><br>
                                                        
                                                        <span class="font-medium text-secondary text-sm">Tenure Ends in : <span class="text-red-400">{{ item.rating }}</span> Days</span>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col sm:items-end gap-5">
                                                    <span class="text-xl font-semibold text-surface-700 dark:text-surface-0/80">₹{{ item.price }}/Month</span>
                                                    <div class="flex flex-row-reverse sm:flex-row gap-2">
                                                        <Button label="View More" :disabled="item.inventoryStatus === 'SOLD'" class="flex-auto sm:flex-initial whitespace-nowrap"></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </DataView>
        </div>
    </div>
</template>