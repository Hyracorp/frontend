<template>
    <div class="flex flex-col items-center gap-3">
        <div class="w-full">
            <InputText type="text" v-model="value" class="p-3 w-full" placeholder="What is your Name ?" />
        </div>
        <div class="w-full">
            <InputText type="text" v-model="value" class="p-3 w-full" placeholder="Enter your correct Email ID" />
        </div>
        <div class="w-full">
            <Password type="password" v-model="value" class="w-full" placeholder="Create a strong Password" toggleMask />
        </div>
        <div class="w-full">
            <Button label="Login" severity="info" class="p-3 w-full" raised />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>