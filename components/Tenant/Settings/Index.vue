<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const user=computed(()=>authStore.getUser)
</script>
<template>
  <div class="p-5 flex flex-col gap-5">
        <div class="text-2xl font-bold">
            Settings
        </div>
         <div class="">
            <Card v-if="user" class="w-full " >
                <template #title>
                   <div class="w-full flex justify-end ">
                    <Button text @click="authStore.logout" ><Icon name="ph:sign-out" class="text-xl" /></Button>
                   </div>
                </template>
                <template #content>
                   <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-center w-full">
                    <div class="flex gap-3 items-center">
                    <Avatar :label="user?.firstName.charAt(0)" size="xlarge" shape="circle" />
                    <div >{{ user?.firstName }}</div>
                   </div>
                   <div class="">
                    <Button rounded>
                        <Icon name="ph:pencil" class="text-xl" />
                    </Button>
                   </div>
                   </div>
                   <Divider />
                   <div class="text-gray-500">
                    {{ user?.email }}
                   </div>
                   <Divider />
               
                   </div>
                   
                </template>
            </Card>
            <div v-else>
                <Skeleton width="300px" height="100px"/>
            </div>
         </div>
       
    </div>
</template>