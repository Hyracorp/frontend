<template>
  <div class="p-3">
    <div class="">
      <Property v-if="property" :property="property" />
      <div v-else class="flex justify-center">Property Not Found :(</div>
      <ScrollTop />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";

const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);

const propertyStore = usePropertyStore();
const cloudinary_base_url = computed(() => propertyStore.getCloudinaryBaseURL);
const route = useRoute();
const property = computed(() => propertyStore.getProperty);
onMounted(async () => {
  try {
    const res = await propertyAPI.getProperty(route.params.id);
    await propertyStore.setProperty(res);
  } catch (err) {
    console.log(err);
  }
});

definePageMeta({
  layout: "default",
  title: "Property Details",
  middleware: "auth",
});
</script>
