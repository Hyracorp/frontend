<template>
    <div class="flex flex-col items-center gap-3">
        <div class="w-full">
            <InputText type="email" v-model="formData.email" class="p-3 w-full" placeholder="Enter your email" />
        </div>
        <div class="w-full">
            <Password v-model="formData.password" :feedback="false" class="w-full" placeholder="Enter your Password" toggleMask />
        </div>
        <div class="w-full mb-4">
            <Button label="Login" severity="info" class="p-3 w-full"  @click="formSubmit" raised />
        </div>
    </div>
</template>


<script setup lang="ts">

    import { ref } from 'vue';

    let formData = ref({
        email: "",
        password: ""
    });

    function formSubmit() {
            console.log(formData.value);
    }
</script>

<style  scoped>

</style>