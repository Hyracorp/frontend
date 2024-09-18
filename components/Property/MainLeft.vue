<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
import { ref, computed, watchEffect } from 'vue';

const store = usePropertyStore();
const property = computed(() => store.property);

const faqs = ref([
  {
    question: 'Are Pets allowed?',
    answer: '',
    isOpen: false
  },
  {
    question: 'Is Furnished?',
    answer: '',
    isOpen: false
  },
  {
    question: 'Is there Power backup?',
    answer: '',
    isOpen: false
  },
  {
    question: 'Is Non-Veg allowed?',
    answer: '',
    isOpen: false
  }
]);

watchEffect(() => {
  faqs.value[0].answer = property.value.pets_allowed ? 'YES' : 'NO';
  faqs.value[1].answer = property.value.furnished ? 'YES' : 'NO';
  faqs.value[2].answer = property.value.power_backup ? 'YES' : 'NO';
  faqs.value[3].answer = property.value.non_veg_allowed ? 'YES' : 'NO';
});

const toggleFAQ = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>

<template>
  <div>
    <div v-if="property" class="flex flex-col gap-2 py-3">
      <div class="flex flex-col gap-3">
        <div class="text-3xl font-bold">
          {{ property.title }} ( {{ property.bhk }} BHK {{ property.flat_house }} )
            <div class="text-sm font-medium text-gray-500 mt-2">
              {{ property.area_sq_ft }} Square Feet {{ property.property_type }} property
            </div>
        </div>
        <div class="font-medium text-gray-500">
          {{ property.city }}, {{ property.pincode }}, {{ property.state }}
        </div>
        <div class="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 rounded-lg">
          Rent: ₹ <b>{{ property.expected_rate_rent }}</b> / month
        </div>
        <div class="text-xl font-bold">
          Deposit : ₹ {{ property.expected_deposit }}
        </div>
      </div>

      <div>
        <div class="text-xl font-bold mt-4">Amenities</div>
        <div class="flex max-w-md gap-3 flex-wrap">
          <div v-for="(amenity, index) in property.amenities" :key="index" class="flex items-center gap-3 mt-2">
            <Icon :name="amenity.icon" class="text-3xl" />
            <div class="capitalize">
              {{ amenity.name }}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="text-xl font-bold mt-6">Rules</div>
        <div class="mt-2">
          {{ property.rules }}
        </div>
      </div>
      
      <div>
        <div class="text-xl font-bold mt-6">About</div>
        <div class="max-w-sm text-sm">
          {{ property.description }}
        </div>
      </div>
      
      <div class="faq-section space-y-4">
        <h2 class="text-2xl font-bold text-black-300 mt-6">FAQ</h2>
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <button
            @click="toggleFAQ(index)"
            class="flex justify-between items-center w-full border border-blue-500 text-blue-500 bg-transparent p-4 rounded-lg focus:outline-none transition-all duration-300 ease-in-out text-left"
          >
            <span class="text-lg">{{ faq.question }}</span>
            <span>
              <svg
                v-if="!faq.isOpen"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </span>
          </button>
          <div
            v-if="faq.isOpen"
            class="mt-2 p-4 bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 ease-in-out"
          >
            {{ faq.answer }}
          </div>
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

<style scoped>

.faq-section {
  width: 100%;
  padding: 0;
  margin: 0;
}

.faq-item button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.faq-item button:hover {
  background-color: #e0f7fa;
  color: #1e90ff;
}

.faq-item button {
  text-align: left;
  width: 100%;
}

</style>
