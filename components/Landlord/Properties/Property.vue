<script setup lang="ts">
import addProperty from "./addProperty.vue";
import ImageUpload from "./ImageUpload.vue";
const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);
const propertyStore = usePropertyStore();
const showAddPropertyModal = ref(false);
const showRoommateDetailsCard = ref(false);
const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case "OCCUPIED":
      return "success";

    case "VACANT":
      return "warn";

    case "SOLD":
      return "danger";

    default:
      return null;
  }
};
defineProps({
  properties: {
    type: Array,
    default: () => [],
  },
});
async function addSuccess() {
  showAddPropertyModal.value = false;
  try {
    const res = await propertyAPI.fetchProperties();
    if (res) await propertyStore.setProperties(res);
  } catch (err) {
    console.log(err);
  }
}
async function addImageSuccess() {
  showAddPropertyModal.value = false;
  try {
    const res = await propertyAPI.fetchProperties();
    if (res) await propertyStore.setProperties(res);
  } catch (err) {
    console.log(err);
  }
}
const imageUploadModal = ref(false);
const currentItem = ref({});
const editMode = ref(false);
</script>
<template>
  <div class="">
    <div class="">
      <Dialog v-model:visible="showAddPropertyModal" modal>
        <addProperty @close="showAddPropertyModal = false" @success="addSuccess" :propertyId="currentItem" :editMode="editMode" />
      </Dialog>
      <Dialog @hide="addImageSuccess" v-model:visible="imageUploadModal" modal>
        <ImageUpload :propertyId="currentItem" @success="addImageSuccess" />
      </Dialog>
    </div>
    <div class="">
      <DataView :value="properties" :data-key="'property'">
        <template #header>
          <Button @click="() => {
              editMode = false;
              showAddPropertyModal = true;
              currentItem = {};
            }
            ">
            <Icon name="ph:plus" class="text-xl" /> Add Property
          </Button>
        </template>
        <template #list="slotProps">
          <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-1">
              <div
                class="flex flex-col sm:flex-row md:flex-row p-4 gap-3 border-t border-gray-200 dark:border-gray-700">
                <div class="w-full sm:w-1/4 md:w-1/5 relative">
                  <img class="block mx-auto rounded-md w-full" :src="item.first_photo_url ??
                    'https://dummyimage.com/600x400/e3e3e3/000000&text=image+not+added'
                    " :alt="item.title" />
                  <Tag value="VACANT" :severity="getSeverity(item)" class="absolute left-4 top-4"></Tag>
                </div>
                <div
                  class="flex flex-col sm:flex-row md:flex-row justify-between sm:items-center md:items-start flex-1 gap-4">
                  <div class="flex flex-col md:flex-row justify-between items-start gap-2">
                    <div>
                      <span class="font-medium text-secondary text-sm">{{
                        item.category
                        }}</span>
                      <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80 mt-2">
                        {{ item.title }}
                      </div>
                      <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80" :class="item.approved == true
                          ? 'text-green-500'
                          : 'text-red-500'
                        ">
                        {{
                          item.approved == true ? "Approved" : "Not Approved"
                        }}
                      </div>

                      <span class="font-medium text-secondary text-sm">{{ item.city }},{{ item.state }}</span>
                      <div class="font-bold text-secondary text-sm">
                        {{ item.property_type }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:items-end gap-5">
                    <span class="text-xl font-semibold text-surface-700 dark:text-surface-0/80">₹{{
                      item.expected_rate_rent }}/Month</span>
                    <div class="flex flex-row-reverse sm:flex-row gap-2">
                      <NuxtLink :to="`/property/${item.id}`" target="_blank">
                        <Button class="py-6" size="small">
                          <Icon name="ph:eye" class="text-xl" />
                        </Button>
                      </NuxtLink>
                      <Button class="" size="small">
                        <Icon name="ph:pencil-line" class="text-xl" @click="() => {
                            currentItem = item.id;
                            editMode = true;
                            showAddPropertyModal = true;
                          }
                          " />
                      </Button>
                      <Button label="Manage Images" class="" @click="() => {
                          currentItem = item.id;
                          imageUploadModal = true;
                        }
                        " size="small"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>
