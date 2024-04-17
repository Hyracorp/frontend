<template>
    <div class="flex flex-col items-center gap-3">
        <div class="w-full">
            <InputText type="text" v-model="formData.username" class="p-3 w-full" placeholder="What is your Name ?" />
        </div>
        <div class="w-full">
            <InputText type="text" v-model="formData.phone" class="p-3 w-full" placeholder="Your Phone Number Please" />
        </div>
        <div class="w-full">
            <InputText type="text" v-model="formData.email" class="p-3 w-full" placeholder="Enter your correct Email ID" />
        </div>
        <div class="w-full">
            <Password type="password" v-model="formData.password" class="w-full" placeholder="Create a strong Password" toggleMask />
        </div>
        <div class="w-full">
            <Button label="Signup" severity="info" @click="formSubmit" class="p-3 w-full" raised />
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue';

    let formData = ref({
        username: "",
        phone: "",
        email: "",
        password: ""
    });

    function formSubmit() {
            console.log(formData.value);
    }
</script>

<style scoped>

</style>