<script setup lang="ts">
import Property from './Property.vue';
import { usePropertyStore } from '@/stores/property';
const { $api } = useNuxtApp()
const propertyAPI = usePropertyAPI($api)
const propertyStore = usePropertyStore()
watchEffect(async () => {
  try{
  const res = await propertyAPI.fetchProperties()
  if(res) await propertyStore.setProperties(res)
  }catch(err){
   console.log(err) 
  }
})
const properties = computed(() => propertyStore.getProperties) 
</script>
<template>
    <div class="p-5 flex flex-col gap-5">
        <div class="">
            <h1 class="text-2xl font-bold">My Properties</h1>
        </div>
      <div class="">
        <Property :properties="properties"/>
      </div>
    </div>
</template>
