<template>
    <div class="flex flex-col items-center gap-3">
        <div class="w-full">
            <InputText type="email" v-model="value" class="p-3 w-full" placeholder="Enter your email" />
        </div>
        <div class="w-full">
            <Password v-model="value" class="w-full" placeholder="Enter your Password" toggleMask />
        </div>
        <div class="w-full mb-4">
            <Button label="Login" severity="info" class="p-3 w-full" raised />
        </div>
    </div>
</template>


<script setup>

</script>

<style  scoped>

</style>