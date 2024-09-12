<template>
  <NuxtLink :to="link" class="w-full">
    <Card class="min-w-[300px] w-full">
        <template #title>
            <div class="text-xl  w-full">
                <div class="rounded-full w-12 h-12 flex justify-center items-center bg-blue-500 text-white">
                    <Icon :name="icon" class="text-3xl" />
                </div>
                <div class="">
                    {{ title }}
                </div>
            </div>
        </template>
        <template #content>
            <div class="flex p-3 font-bold text-4xl ">
                {{ content }}
            </div>
        </template>

    </Card>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps({
    title:String,
    content:String,
    link:String,
    icon:String
})
</script>