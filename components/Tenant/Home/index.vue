<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.js';
import TenantCard from './TenantCard.vue';
const authStore=useAuthStore()
const user=computed(()=>authStore.getUser)
const cardOptions=[
    {
        title:'Properties',
        content:'0',
        link:'/tenant/properties',
        icon:'ph:building'
    },
    {
        title:'Bookings',
        content:'0',
        link:'/tenant/bookings',
        icon:'ph:calendar'
    },
    {
        title:'Saved',
        content:'0',
        link:'/tenant/bookmarks',
        icon:'ph:bookmark'
    }
]
const props = defineProps({
  bookings: {
    type: Number,
default: 0
  }
})
watchEffect(async () => {
  if(props.bookings > 0){
    cardOptions[1].content = props?.bookings
  }
})
</script>

<template>
<div class="p-5">
    <div class="text-2xl font-bold">
        
        Good {{ new Date().getHours() < 12  ? 'Morning' : new Date().getHours()>15 ? 'Evening' : 'Afternoon' }}, <span class="text-blue-500">{{ user?.first_name }}</span>
    </div>
    <div class="flex flex-wrap gap-3 my-5 justify-start items-center" >
        <div v-for="card,index in cardOptions" :key="index" >
            <TenantCard :title="card.title" :content="card.content" :link="card.link" :icon="card.icon" />
        </div>
    </div>
   
</div>
</template>
