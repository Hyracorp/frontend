<script setup lang="ts">
const device=useDevice()
defineProps({
    visible: Boolean,
    items: {
        type: Array,
        default: () => []
    }
})
defineEmits(['sidebar-toggle'])


</script>
<template>
    <div>
        <Sidebar :visible="visible" :modal="device.isMobileOrTablet" :pt="{ 'root': 'w-64' }"> 
            <template #container>

        <div class="flex flex-col ">
            <div   class="flex justify-between">
            <NuxtLink to="/" >
                <div class="p-3">
                <img src="/img/logo.png" alt="logo" class="w-40">
            </div>
            </NuxtLink>
                <span class="md:hidden">
                    <Button type="button" text @click="$emit('sidebar-toggle')"    >
                    <Icon name="ph:x" class="text-2xl" />
                    </Button>
                </span>
            </div>
        </div>
        <div class="">
            <Menu :model="items" :pt="{ 'root': 'border-0 px-2','content':'py-3' }" >
                <template #item="{item}">
                    <NuxtLink    :to="item.link"  @click="()=>{if(device.isMobileOrTablet) $emit('sidebar-toggle')}">
                    <div :class="`p-2 ${item.link==$route.path?'font-bold':'hover:font-bold'}`"  >
                        
                        <Icon :name="item.icon" class="text-3xl" />
                        <span class="ml-2">{{ item.label }}</span>
                   
                    </div>
                </NuxtLink>
                </template>
            </Menu>
        </div>
        </template>
</Sidebar>
    </div>
</template>
