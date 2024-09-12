<script setup lang="ts">
const valueTop = ref([
    { label: 'Occupied', color1: '#34d399', color2: '#34d399', value: 50, icon: 'material-symbols-light:kid-star' },
    { label: 'Vacant', color1: '#60a5fa', color2: '#60a5fa', value: 25, icon: 'pi pi-inbox' },
    { label: 'Sold', color1: '#F87171', color2: '#F87171', value: 25, icon: 'pi pi-image' }
]);
definePageMeta({
    layout: "landlord",
    title: 'Landlord Profile',
    middleware: "landlord-auth",
})
</script>
<template>
    <div class="w-full p-5">
        <Card class="w-full" :pt="{ 'root': 'shadow-xl' }">
                <template #title class="text-gray-500 font-light">
                    <div class="card">
                        <MeterGroup :value="valueTop" labelPosition="start">
                            <template #label="{ value }">
                                <div class="flex flex-wrap gap-3">
                                    <template v-for="val,i of value" :key="i">
                                        <Card class="flex-1">
                                            <template #content>
                                                <div class="flex justify-between gap-5">
                                                    <div class="flex flex-col gap-1">
                                                        <span class="text-secondary text-sm">{{ val.label }}</span>
                                                        <span class="font-bold text-lg">{{ val.value }}%</span>
                                                    </div>
                                                    <span class="w-[2rem] h-[2rem] rounded-full inline-flex justify-center items-center text-center" :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                                                        <i :class="val.icon" />
                                                    </span>
                                                </div>
                                            </template>
                                        </Card>
                                    </template>
                                </div>
                            </template>
                         
                        </MeterGroup>
                    </div>
                </template>
            </Card>
    </div>
</template>