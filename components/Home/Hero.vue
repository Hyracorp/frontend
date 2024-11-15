<script setup lang="ts">
import { usePropertyStore } from "@/stores/property";
import { searchSchema } from "@/schemas/searchSchema";
import { z } from "zod";
let propertyStore = usePropertyStore();

const searchForm = ref({
  location: {},
  bhkNo: [{ name: "2BHK", value: 2 }],
  priceRange: [2, 80],
  propertyType: "Residential",
});
const toast = useToast();

const propertyType = ref(["Residential", "Commercial"]);
// BHK OPTIONS

const bhkOptions = ref([
  {
    name: "1BHK",
    value: 1,
  },
  {
    name: "2BHK",
    value: 2,
  },
  {
    name: "3BHK",
    value: 3,
  },
  {
    name: "3BHK+",
    value: 0,
  },
]);
// LOCATION SEARCH

const filteredSuggestions = ref([]);
const search = (event) => {
  setTimeout(async () => {
    if (!event.query.trim().length) {
      filteredSuggestions.value = [];
    } else {
      let locations = await $fetch(
        `https://photon.komoot.io/api/?q=${event.query.toLowerCase()}&limit=5`,
      );
      if (locations.features?.length > 0) {
        filteredSuggestions.value = locations.features
          .filter((feature) => feature.properties.type === "city")
          .map((feature) => ({
            name: `${feature.properties.name}, ${feature.properties.state}, ${feature.properties.country}`,
            city: feature.properties.name,
            value: {
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
            },
          }));
      }
    }
  }, 250);
};

const router = useRouter();
const searchSubmit = () => {
  try {
    searchSchema.parse(searchForm.value);
    const bhkNoQuery = searchForm.value.bhkNo.map((bhk) => bhk.value).join("+");
    router.push({
      path: "/search",
      query: {
        location: searchForm.value.location?.city,
        bhkNo: `${bhkNoQuery}`,
        priceRange: searchForm.value.priceRange,
        propertyType: searchForm.value.propertyType,
        latitude: searchForm.value.location?.value?.latitude,
        longitude: searchForm.value.location?.value?.longitude,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: ` ${err.issues[0].path[0]}: ${err.issues[0].message}`,
      });
    } else {
      console.error("Error:", err);
    }
  }
};
// onMounted

onMounted(async () => { });

function getLocation() {
  if ("geolocation" in navigator) {
    // Geolocation is supported

    navigator.geolocation.getCurrentPosition((position) => {
      $fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
      )
        .then(async (res) => {
          let city = "noname";
          if (res?.address) {
            let display_name = res.display_name;
            display_name = display_name.split(",");

            city =
              display_name[0] + "," + display_name[1] + "," + display_name[2];
          }

          searchForm.value.location = {
            name: city,
            city: city,
            value: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: `Location Auto detect error: ${err.message}`,
          });
        });
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Geolocation is not supported by this browser.",
    });
  }
}
let searchModal = ref(false);
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="absolute top-0 left-0 w-full h-1/2 -z-10 bg-blue-800 hidden md:block">
      <!-- <img src="https://assets.lummi.ai/assets/QmXiqJnBwdNhTuuWUpTdbzVGcJsgHez2Te61WcEaHxfxeo?auto=format&w=1500" alt=""
        class="h-full w-screen object-cover opacity-70" /> -->
      <img
        src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="" class="h-full w-full object-cover opacity-70 md:object-fit" />
    </div>
    <div class="w-full md:flex flex-col gap-8 p-5 py-10 hidden">
      <!-- Main Text -->
      <div class="text-center md:text-left">
        <h3 class="text-3xl font-bold text-white">
          Rent Your <span class="slanted-text">House</span> #Home
        </h3>
        <p class="text-lg text-gray-100">
          Search Across 10000+ Verified Properties
        </p>
      </div>
    </div>
    <div class="w-full">
      <Card class="md:p-5" :pt="{ root: 'shadow-xl' }">
        <template #content>
          <div class="flex gap-5 md:flex-row flex-col flex-wrap w-full justify-center items-center">
            <div class="text-center md:text-left">
              <h3 class="text-2xl font-bold text-gray-500 font-display">
                Search by Location
              </h3>
              <p class="text-sm font-medium text-gray-500">
                Find your perfect property all over india
              </p>
            </div>
            <div class="lg:w-2/3 flex flex-wrap gap-3">
              <div class="md:max-w-xs lg:max-w-md w-full">
                <InputGroup class="bg-none h-12">
                  <InputGroupAddon class="relative">
                    <Icon name="ph:magnifying-glass" class="text-gray-500 absolute top-2/4 -mt-2" />
                  </InputGroupAddon>

                  <AutoComplete v-model="searchForm.location" optionLabel="name" :suggestions="filteredSuggestions"
                    @complete="search" placeholder="Auto Detect or Search Location" required size="small" />

                  <InputGroupAddon>
                    <Button type="button" @click="getLocation" iconOnly text>
                      <Icon name="ph:map-pin" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>

                <small id="location-help">Where are you looking for the property?</small>
              </div>
              <div class="md:w-48 lg:max-w-md w-full">
                <Button @click="searchModal = true"
                  class="md:max-w-md w-full text-center md:text-right flex gap-3 md:justify-center items-center"
                  size="small">
                  <Icon name="ph:magnifying-glass" />
                  <span class="">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <Dialog v-model:visible="searchModal" modal>
      <!-- Hero Search Card -->

      <template #header>
        <div class="text-left">
          <h3 class="text-2xl font-bold text-gray-500">Search by location</h3>
          <p class="text-sm font-medium text-gray-500">
            Find your perfect property all over india
          </p>
        </div>
      </template>

      <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="searchSubmit">
        <div class="flex jsutify-center items-center flex-col">
          <label for="slider" class="text-sm font-bold text-gray-500 my-3 block">Property Type :
            <span class="text-blue-500">{{
              searchForm.propertyType
              }}</span></label>
          <SelectButton v-model="searchForm.propertyType" :options="propertyType" aria-labelledby="custom">
            <template #option="slotProps">
              <Icon :name="slotProps.option == 'Residential'
                  ? 'ph:house'
                  : 'ph:buildings'
                " class="mr-2" />
            </template>
          </SelectButton>
        </div>
        <div class="" v-if="searchForm.propertyType === 'Residential'">
          <SelectButton v-model="searchForm.bhkNo" :pt="{ button: 'px-3 py-2', label: 'text-sm md:text-lg' }"
            :options="bhkOptions" optionLabel="name" multiple aria-labelledby="multiple" />
        </div>
        <div class="w-full">
          <label for="slider" class="text-lg text-gray-500 my-3 block">Location</label>

          <InputGroup class="bg-none h-12">
            <InputGroupAddon class="relative">
              <Icon name="ph:magnifying-glass" class="text-gray-500 absolute top-2/4 -mt-2" />
            </InputGroupAddon>

            <AutoComplete v-model="searchForm.location" optionLabel="name" :suggestions="filteredSuggestions"
              @complete="search" placeholder="Auto Detect or Search Location" required />

            <InputGroupAddon>
              <Button type="button" @click="getLocation" iconOnly text>
                <Icon name="ph:map-pin" />
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <small id="location-help">Where are you looking for the property?</small>
        </div>

        <div class="w-full">
          <label for="slider" class="text-lg text-gray-500 my-3 block">Price Range(₹{{ searchForm.priceRange[0] * 1000
            }} -
            ₹{{
              searchForm.priceRange[1] * 1000
            }})</label>
          <div class="px-2">
            <Slider v-model="searchForm.priceRange" range class="w-14rem" />
          </div>
        </div>
        <Button type="submit" class="flex gap-3 w-full">
          <Icon name="ph:magnifying-glass" />
          <div class="">Find Property..</div>
        </Button>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
.slanted-text {
  display: inline-block;
  position: relative;
}

.slanted-text::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
  transform: rotate(-5deg);
}
</style>
