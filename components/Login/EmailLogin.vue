
<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth';
    import { z } from "zod";
    import { loginSchema } from '@/schemas/authSchema';
    const router = useRouter();
    const authStore = useAuthStore()
    const formData = ref({
        email: "",
        password: ""
    });

    const toast = useToast();
    async function formSubmit() {
try{
    loginSchema.parse(formData.value);

    const logincheck = await authStore.login(formData.value);
            if(logincheck==true){
                toast.add({ severity: 'success', summary: 'Info', detail: 'Login Successful', life: 3000 });
                router.push('/')
                
            }else{
                toast.add({ severity: 'error', summary: 'Error', detail: 'Error Logging in', life: 3000 });
    }
}catch(err){
    if (err instanceof z.ZodError) {

    toast.add({ severity: 'error', summary: 'Error', detail: ` ${err.issues[0].path[0]}: ${err.issues[0].message}` })
    } else {
    console.error('Error:', err)
    }

}
}
</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <div class="w-full">
            <InputText v-model="formData.email" type="email"  class="p-3 w-full" placeholder="Enter your email" />
        </div>
        <div class="w-full">
            <Password v-model="formData.password" :feedback="false" class="w-full" placeholder="Enter your Password" toggleMask />
        </div>
        <div class="w-full mb-4">
            <Button label="Login" severity="info" class="p-3 w-full" raised  @click="formSubmit"  />
        </div>
    </div>
</template>



<style  scoped>

</style>