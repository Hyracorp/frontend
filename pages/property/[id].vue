<template>
    <div class="p-3">
        <div class="">
            <Property v-if="property" :property="property" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'

const { $api } = useNuxtApp()
const propertyAPI = usePropertyAPI($api)

const propertyStore = usePropertyStore()
const route = useRoute()
const property=computed(() => propertyStore.getProperty)
onMounted(async () => {
try{
  const res = await propertyAPI.getProperty(route.params.id)
  await propertyStore.setProperty(res)
}catch(err){
  console.log(err)
}
})


definePageMeta({
    layout: "default",
    title: 'Property Details',
    middleware: "auth",
});
</script>
