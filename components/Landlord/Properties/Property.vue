<script setup lang="ts">
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
    <DataView :value="properties">
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
                                                        <div v-if="showRoommateDetailsCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                                            <div class="flex justify-center items-center min-h-screen">
                                                                <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                                                    <div class="mb-4">
                                                                        <h2 class="text-lg font-bold">Tenant Details</h2>
                                                                    </div>
                                                                    <div class="mt-4 text-sm font-medium text-black-500">
                                                                        
                                                                        <!-- First pair of inputs -->
                                                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div class="flex flex-col gap-2">
                                                                                    <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" disabled placeholder="Tenant's Name"/>
                                                                                    <small id="map-location-help">Tenant's Full Name<span class="text-red-400"> *</span></small>
                                                                            </div>
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" disabled placeholder="Tenant's Phone number"/>
                                                                                    <small id="rent-help">Tenant's Phone<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Second pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="relative card flex justify-center">
                                                                                    <div class="flex flex-col gap-2 w-full">
                                                                                        <Dropdown v-model="selectedGender" editable :options="genders" disabled showClear optionLabel="name" placeholder="Tenant's Gender" class="w-full" />
                                                                                        <small id="location-help">Tenant's Gender<span class="text-red-400"> *</span></small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div class="relative card flex justify-center">
                                                                                    <div class="flex flex-col gap-2 w-full">
                                                                                        <Dropdown v-model="selectedMarital" editable :options="maritalstatus" disabled showClear optionLabel="name" placeholder="Tenant's Marital Status" class="w-full" />
                                                                                        <small id="location-help">Tenant's Marital Status<span class="text-red-400"> *</span></small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Third pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="address" aria-describedby="rent-help" disabled placeholder="Tenant's Address"/>
                                                                                    <small id="rent-help">Tenant's Permanant Address<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="pincode" aria-describedby="rent-help" disabled placeholder="Tenant's Pincode"/>
                                                                                    <small id="rent-help">Tenant's Pincode<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Fifth pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <div class="hidden sm:flex justify-between">
                                                                                        <div class="w-full">
                                                                                            <div class="flex flex-col gap-2">
                                                                                                <div class="relative rounded-lg overflow-hidden justify-center items-center text-center">
                                                                                                <Image class="rounded-2xl" src="https://www.paisabazaar.com/wp-content/uploads/2018/06/Aadhaar-helps-the-government-and-the-citizens.jpg" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                                                                                            </div>
                                                                                            <small id="property-spec-help">Tenant's ID Proof<span class="text-red-400"> *</span></small>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ml-4 items-center">
                                                                                            
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- For small screens -->
                                                                                    <div class="block sm:hidden mt-4">
                                                                                        <div class="w-full">
                                                                                            <div class="flex flex-col gap-2">
                                                                                                <div class="relative rounded-lg overflow-hidden justify-center items-center text-center">
                                                                                                <Image class="rounded-2xl" src="https://www.paisabazaar.com/wp-content/uploads/2018/06/Aadhaar-helps-the-government-and-the-citizens.jpg" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                                                                                            </div>
                                                                                            <small id="property-spec-help">Tenant's ID Proof<span class="text-red-400"> *</span></small>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    <div class="mt-6 flex justify-end">
                                                                        <Button @click="showRoommateDetailsCard = false" class="mr-4">Cancel</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
</template>