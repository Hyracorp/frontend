<template>
    <div class="p-3 flex gap-3 items-center ">
        <Button  class="md:hidden block" size="small" text @click="$emit('sidebar-toggle')"  >
            <Icon name="ph:list" class="text-2xl" />
        </Button>
        <h1 class="font-bold text-xl">Landlord Profile</h1>
       
    </div>
</template>
<script setup lang="ts">

defineEmits(['sidebar-toggle'])
</script>