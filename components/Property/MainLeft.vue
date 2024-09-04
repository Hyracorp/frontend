<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
const store = usePropertyStore();
const property = computed(() => store.property);
</script>

<template>
  <div class="">
    <div v-if="property" class="flex flex-col gap-2 py-3">
      <div class="flex flex-col gap-3">
        <div class="text-3xl font-bold">
          {{ property.title }}
        </div>
        <div class="font-medium text-gray-500">
{{ property.city }}, {{property.state}}
        </div>
        <div class="text-2xl font-bold">
          ₹ {{ property.expected_rate_rent }}
        </div>
      </div>

      <div class="">
        <div class="text-xl font-bold">Amenities</div>
        <div class="flex max-w-md gap-3 flex-wrap">
          <div v-for="(amenity, index) in property.amenities" :key="index" class="flex items-center gap-3">
            <Icon :name="amenity.icon" class="text-3xl" />
            <div class="capitalize">
              {{ amenity.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="">
<div class="text-xl font-bold">Rules</div>
<div>
{{property.rules}}

</div>

</div>
      <div class="">
        <div class="text-xl font-bold">About</div>
        <div class="max-w-sm text-sm">
          {{ property.description }}
        </div>
      </div>
    </div>
    <div v-else>
      <Skeleton class="mb-2" />
      <Skeleton width="10rem" class="mb-2" />
      <Skeleton width="5rem" class="mb-2" />
      <Skeleton height="2rem" class="mb-2" />
      <Skeleton width="10rem" height="4rem" />
    </div>
  </div>
</template>
