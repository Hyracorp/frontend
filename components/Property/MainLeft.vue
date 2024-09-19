<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
import { ref, computed, watchEffect } from 'vue';

const store = usePropertyStore();
const property = computed(() => store.property);

const resi_faq = ref([
  { question: 'Are Pets allowed?', answer: null, isOpen: false },
  { question: 'Is Furnished?', answer: null, isOpen: false },
  { question: 'Is there Power backup?', answer: null, isOpen: false },
  { question: 'Is Non-Veg allowed?', answer: null, isOpen: false }
]);

const comm_faq = ref([
  { question: 'Are Fire-Safety measures adapted?', answer: null, isOpen: false },
  { question: 'Is there Washroom facility?', answer: null, isOpen: false },
  { question: 'Is there Generator?', answer: null, isOpen: false }
]);

watchEffect(() => {
  resi_faq.value.forEach((faq1, index) => {
    switch (index) {
      case 0:
        faq1.answer = property.value.pets_allowed === undefined ? null : property.value.pets_allowed ? 'YES' : 'NO';
        break;
      case 1:
        faq1.answer = property.value.furnished === undefined ? null : property.value.furnished ? 'YES' : 'NO';
        break;
      case 2:
        faq1.answer = property.value.power_backup === undefined ? null : property.value.power_backup ? 'YES' : 'NO';
        break;
      case 3:
        faq1.answer = property.value.non_veg_allowed === undefined ? null : property.value.non_veg_allowed ? 'YES' : 'NO';
        break;
    }
  });

  comm_faq.value.forEach((faq2, index) => {
    switch (index) {
      case 0:
        faq2.answer = property.value.fire_safety_status === undefined ? null : property.value.fire_safety_status ? 'YES' : 'NO';
        break;
      case 1:
        faq2.answer = property.value.washroom_facility === undefined ? null : property.value.washroom_facility ? 'YES' : 'NO';
        break;
      case 2:
        faq2.answer = property.value.generator === undefined ? null : property.value.generator ? 'YES' : 'NO';
        break;
    }
  });
});

const toggleFAQ01 = (index: number) => {
  resi_faq.value[index].isOpen = !resi_faq.value[index].isOpen;
};

const filteredFaqs01 = computed(() => resi_faq.value.filter(faq1 => faq1.answer !== null));

const toggleFAQ02 = (index: number) => {
  comm_faq.value[index].isOpen = !comm_faq.value[index].isOpen;
};

const filteredFaqs02 = computed(() => comm_faq.value.filter(faq2 => faq2.answer !== null));
</script>


<template>
  <div>
    <div v-if="property" class="flex flex-col gap-2 py-3">
      <!-- Property Title -->
      <div v-if="property.title" class="flex flex-col gap-3">
        <div class="text-3xl font-bold">
          {{ property.title }} 
          <span v-if="property.bhk"> ( {{ property.bhk }} BHK {{ property.flat_house }} )</span>
          <div v-if="property.area_sq_ft && property.property_type" class="text-sm font-medium text-gray-500 mt-2">
            {{ property.area_sq_ft }} Square Feet {{ property.property_type }} property
          </div>
        </div>

        <!-- Property Location -->
        <div v-if="property.city && property.pincode && property.state" class="font-medium text-gray-500">
          {{ property.city }}, {{ property.pincode }}, {{ property.state }}
        </div>

        <!-- Rent -->
        <div v-if="property.expected_rate_rent" class="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4 rounded-lg">
          Rent: ₹ <b>{{ property.expected_rate_rent }}</b> / month
        </div>

        <!-- Deposit -->
        <div v-if="property.expected_deposit" class="text-xl font-bold">
          Deposit : ₹ {{ property.expected_deposit }}
        </div>
      </div>

      <!-- Amenities -->
      <div v-if="property.amenities && property.amenities.length">
        <div class="text-xl font-bold mt-4">Amenities</div>
        <div class="flex max-w-md gap-3 flex-wrap">
          <div v-for="(amenity, index) in property.amenities" :key="index" class="flex items-center gap-3 mt-2">
            <Icon v-if="amenity.icon" :name="amenity.icon" class="text-3xl" />
            <div class="capitalize">
              {{ amenity.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Rules -->
      <div v-if="property.rules">
        <div class="text-xl font-bold mt-6">Rules</div>
        <div class="mt-2">
          {{ property.rules }}
        </div>
      </div>

      <!-- About -->
      <div v-if="property.description">
        <div class="text-xl font-bold mt-6">About</div>
        <div class="max-w-sm text-sm">
          {{ property.description }}
        </div>
      </div>

      <!-- Preference -->
      <div v-if="property.tenant_preference">
        <div class="text-xl font-bold mt-6">Preferred tenants</div>
        <div class="max-w-sm text-sm">
          {{ property.tenant_preference }}
        </div>
      </div>

      <!-- FAQ Section -->
      <div v-if="property.property_type === 'Residential'">
        <div class="faq-section space-y-4">
          <h2 class="text-2xl font-bold text-black-300 mt-6">FAQ</h2>
          <div v-for="(faq, index) in filteredFaqs01" :key="index" class="faq-item">
            <button
              @click="toggleFAQ01(index)"
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
              v-if="faq.isOpen && faq.answer"
              class="mt-2 p-4 bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 ease-in-out"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="property.property_type === 'Commercial'">
        <div class="faq-section space-y-4">
          <h2 class="text-2xl font-bold text-black-300 mt-6">FAQ</h2>
          <div v-for="(faq, index) in filteredFaqs02" :key="index" class="faq-item">
            <button
              @click="toggleFAQ02(index)"
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
              v-if="faq.isOpen && faq.answer"
              class="mt-2 p-4 bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 ease-in-out"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
      

    </div>

    <!-- Loading Skeleton -->
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