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
    import { useAuthStore } from '../../stores/auth';

    const authStore = useAuthStore()

    import { ref } from 'vue';

    let formData = ref({
        email: "",
        password: ""
    });

    const toast = useToast();
    async function formSubmit() {
            const logincheck = await(authStore.login(formData.value));
            console.log(logincheck);
            if(logincheck==true){
                toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
            }else{
                toast.add({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
            }
            }
</script>

<style  scoped>

</style>