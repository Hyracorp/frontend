<script setup lang="ts">

import { ref } from 'vue';

const showCard = ref(false);

const selectedSpec = ref();
const spec = ref([
    { name: '1 BHK', code: 'one_bhk' },
    { name: '2 BHK', code: 'two_bhk' },
    { name: '3 BHK', code: 'three_bhk' },
    { name: '3+ BHK', code: 'three_plus_bhk' }
]);

const value = ref(null);
const rentValue = ref(null);
const mapValue = ref(null);
const photoValue1 = ref(null);
const aminityInputs = ref([]);
const photoInputs = ref([]);

const wifi = ref(null);
const power = ref(null);
const water = ref(null);
const parking = ref(null);
const elevator = ref(null);
const ac = ref(null);
const paper = ref(null);
const laundry = ref(null);
const pool = ref(null);
const cctv = ref(null);
const extinguisher = ref(null);
const alarm = ref(null);
const gym = ref(null);
const firstaid = ref(null);
const security = ref(null);
const storage = ref(null);
const restaurant = ref(null);
const furnished = ref(null);
const hospital = ref(null);
const helper = ref(null);
const selectedOption = ref(null);

const addInputField = () => {
  aminityInputs.value.push({ value: '' });
};

const removeInputField = (index) => {
  aminityInputs.value.splice(index, 1);
};

const addPhotoField = () => {
  photoInputs.value.push({ value: '' });
};

const removePhotoField = (index) => {
  photoInputs.value.splice(index, 1);
};

const searchForm = ref({
  location: '',
  bhkNo: [{ name: '2BHK', value: 2 }]
});

// BHK OPTIONS
const bhkOptions = ref([
  { name: '1BHK', value: 1 },
  { name: '2BHK', value: 2 },
  { name: '3BHK', value: 3 },
  { name: '3BHK+', value: 0 }
]);

// LOCATION SEARCH
const locations = ref([]);
const filteredSuggestions = ref([]);
const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredSuggestions.value = [...locations.value];
    } else {
      filteredSuggestions.value = locations.value.filter((location) => {
        return location.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  // Set the value of photoValue1 to the file name or path
  photoValue1.value = file.name; // or file.path if you want the full path
};

</script>
<script lang="ts">
import bedroomImage from '../../assets/img/background/bedroom_1.jpg'; // Adjust the path as per your project structure

export { bedroomImage };
</script>

<template>
      <div class="py-10 p-5 flex flex-col justify-center items-center" 
     :style="{ backgroundImage: 'url(' + bedroomImage + ')', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                width: '100%', 
                height: '100%' }">

        <div class="max-w-xl flex flex-col gap-8">
            <!-- Main Text -->
            <div class="">
                <h3 class="text-xl font-bold text-white">Welcome Landlord</h3>
                <p class=" text-white">List your property with us to a wide range of audience.
                </p>
            </div>

            <!-- Hero Add Property Card -->
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-2xl' }">
                    <template #title>
                        <div class="text-center">
                            <h3>Add Your Property</h3>
                            <p class="text-sm font-medium text-gray-500">Add your property so that we can show it to our users</p>
                        </div>
                    </template>


                    <template #content>
                        <div class="overflow-auto" style="max-height: 80vh;">
                            <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="() => {
                                console.log('form submitted');
                            }">
                                <div class="">
                                    <SelectButton v-model="searchForm.bhkNo"
                                        :pt="{ 'button': 'px-3 py-2', 'label': 'text-sm md:text-lg' }" :options="bhkOptions"
                                        optionLabel="name" multiple aria-labelledby="multiple" />

                                </div>
                                <div class="w-full">
                                    <InputGroup class="bg-none">
                                        <InputGroupAddon class="relative">
                                            <Icon name="ph:magnifying-glass" class="text-gray-500 absolute top-2/4 -mt-2" />
                                        </InputGroupAddon>
                                        <AutoComplete v-model="searchForm.location" optionLabel="name"
                                            :suggestions="filteredSuggestions" @complete="search"
                                            placeholder="Auto Detect or Search Location" />
                                    </InputGroup>
                                    <small id="location-help">Your property location?</small>
                                </div>
                                <Button type="submit" @click="showCard = !showCard" class="w-full flex justify-center items-center gap-3">
                                    <div class="">
                                        Fill the rest
                                    </div>
                                </Button>
                            </form>
                            <div v-if="showCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="text-center mb-4">
                                            <h3 class="text-lg font-bold">Add Your Property</h3>
                                            <p class="text-sm text-gray-500">Add your property so that we can show it to our users</p>
                                        </div>
                                        <div class="mt-4">
                                            <!-- First pair of inputs -->
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="relative">
                                                    <Dropdown v-model="selectedSpec" :options="spec" showClear optionLabel="Property Specification" placeholder="Select a City" class="w-full" />
                                                    <small id="property-spec-help">Property Specification<span class="text-red-400"> *</span></small>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="value" aria-describedby="location-help" placeholder="Your property location"/>
                                                        <small id="location-help">Area<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder="Rent"/>
                                                        <small id="rent-help">Price per month<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Map location"/>
                                                        <small id="map-location-help">Exact map location<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Line -->
                                            <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                            <!-- Amenities -->
                                            <div class="mb-4">
                                                <h3 class="text-lg font-bold mt-3">Amenities</h3>
                                                <p class="text-sm text-gray-500">Select all that apply</p>
                                            </div>
                                                <!-- Amenities Grid -->
                                                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- WiFi -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="wifi" inputId="wifi" name="wifi" value="wifi" />
                                                        <label for="wifi" class="ml-2">WiFi</label>
                                                        <Icon name="ph:wifi-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Power -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="power" inputId="power" name="power" value="power" />
                                                        <label for="power" class="ml-2">Power</label>
                                                        <Icon name="ph:power-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Water -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="water" inputId="water" name="water" value="water" />
                                                        <label for="water" class="ml-2">Water</label>
                                                        <Icon name="ph:drop-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Parking -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="parking" inputId="parking" name="parking" value="parking" />
                                                        <label for="parking" class="ml-2">Parking</label>
                                                        <Icon name="ph:car-profile-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>
                                                <!-- Row 2 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Elevator -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="elevator" inputId="elevator" name="elevator" value="elevator" />
                                                        <label for="elevator" class="ml-2">Elevator</label>
                                                        <Icon name="ph:elevator-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- AC -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="ac" inputId="ac" name="ac" value="ac" />
                                                        <label for="ac" class="ml-2">AC</label>
                                                        <Icon name="ph:snowflake-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Paper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="paper" inputId="paper" name="paper" value="paper" />
                                                        <label for="paper" class="ml-2">Paper</label>
                                                        <Icon name="ph:newspaper-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Laundry -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="laundry" inputId="laundry" name="laundry" value="laundry" />
                                                        <label for="laundry" class="ml-2">Laundry</label>
                                                        <Icon name="ph:washing-machine-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 3 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Pool -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="pool" inputId="pool" name="pool" value="pool" />
                                                        <label for="pool" class="ml-2">Pool</label>
                                                        <Icon name="ph:person-simple-swim-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- CCTV -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="cctv" inputId="cctv" name="cctv" value="cctv" />
                                                        <label for="cctv" class="ml-2">CCTV</label>
                                                        <Icon name="ph:security-camera-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Extinguisher -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="extinguisher" inputId="extinguisher" name="extinguisher" value="extinguisher" />
                                                        <label for="extinguisher" class="ml-2 text-sm">Extinguisher</label>
                                                        <Icon name="ph:fire-extinguisher-bold" class="ml-1 w-6 h-6" />
                                                    </div>
                                                    <!-- Alarm -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="alarm" inputId="alarm" name="alarm" value="alarm" />
                                                        <label for="alarm" class="ml-2">Alarm</label>
                                                        <Icon name="ph:speaker-simple-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 4 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Gym -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="gym" inputId="gym" name="gym" value="gym" />
                                                        <label for="gym" class="ml-2">Gym</label>
                                                        <Icon name="ph:person-arms-spread-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- First-Aid -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="firstaid" inputId="firstaid" name="firstaid" value="firstaid" />
                                                        <label for="firstaid" class="ml-2">First-Aid</label>
                                                        <Icon name="ph:bandaids-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Security -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="security" inputId="security" name="security" value="security" />
                                                        <label for="security" class="ml-2">Security</label>
                                                        <Icon name="material-symbols:security" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Storage -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="storage" inputId="storage" name="storage" value="storage" />
                                                        <label for="storage" class="ml-2">Storage</label>
                                                        <Icon name="streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 5 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Restaurant -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="restaurant" inputId="restaurant" name="restaurant" value="restaurant" />
                                                        <label for="restaurant" class="ml-2 text-sm">Restaurant</label>
                                                        <Icon name="ion:restaurant-outline" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Furnished -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="furnished" inputId="furnished" name="furnished" value="furnished" />
                                                        <label for="furnished" class="ml-2">Furnished</label>
                                                        <Icon name="streamline:shopping-catergories-sofa-decoration-furniture-interior-design-couch-sofa-decorate" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Hospital -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="hospital" inputId="hospital" name="hospital" value="hospital" />
                                                        <label for="hospital" class="ml-2">Hospital</label>
                                                        <Icon name="mdi:hospital-building" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Helper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="helper" inputId="helper" name="helper" value="helper" />
                                                        <label for="helper" class="ml-2">Helper</label>
                                                        <Icon name="mdi:human-dolly" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for larger screens) -->
                                                <div class="hidden sm:block mt-4 flex justify-between">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for larger screens) -->
                                                <div class="hidden sm:block">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4 flex justify-between">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="ml-4 items-center">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for smaller screens) -->
                                                <div class="block sm:hidden mt-4">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for smaller screens) -->
                                                <div class="block sm:hidden">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="mt-2 flex justify-end">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <!-- Line -->
                                        <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                        <!-- Photo Upload -->
                                        <div class="mb-4">
                                            <h3 class="text-lg font-bold mt-3">Photos</h3>
                                            <p class="text-sm text-gray-500">Add a minimum of 5 to a maximum of 10 photos</p>
                                        </div>
                                        
                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="mt-0 flex justify-end">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="mt-0 flex justify-end">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Bedroom<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Bedroom<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="mt-0 flex justify-end">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Kitchen<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Kitchen<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="mt-0 flex justify-end">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Bathroom<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture of Bathroom<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="mt-0 flex justify-end">
                                                <div class="flex items-center text-white">
                                                    <Button>
                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                        </label>
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        ref="fileInput"
                                                        class="hidden"
                                                        @change="handleFileUpload"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Add Photo (for larger screens) -->
                                        <div class="hidden sm:block mt-4 flex justify-between">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for larger screens) -->
                                        <div class="hidden sm:block">
                                            <div v-for="(input, index) in photoInputs" :key="index" class="mt-4 flex justify-between">
                                                <div class="w-full">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="ml-4 items-center">
                                                    <div class="flex items-center text-white">
                                                        <Button>
                                                            <label for="file-upload" class="cursor-pointer flex items-center">
                                                                <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                            </label>
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            id="file-upload"
                                                            ref="fileInput"
                                                            class="hidden"
                                                            @change="handleFileUpload"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="ml-4 items-center">
                                                    <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                        <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Add Photo (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div v-for="(input, index) in photoInputs" :key="index" >
                                                <div class="w-full mt-4">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="flex items-center mt-0 justify-end">
                                                    <div class="flex items-center text-white mr-2">
                                                        <Button> 
                                                            <label for="file-upload" class="cursor-pointer flex items-center">
                                                                <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                            </label>
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            id="file-upload"
                                                            ref="fileInput"
                                                            class="hidden"
                                                            @change="handleFileUpload"
                                                        />
                                                    </div>
                                                    <div class="flex items-center text-white">
                                                        <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                            <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                                <!-- Line -->
                                                <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                                <!-- Other Info Upload -->
                                                <div class="mb-4">
                                                    <h3 class="text-lg font-bold mt-3">Other Information</h3>
                                                    <p class="text-sm text-gray-500">Select only one that best suits.</p>
                                                </div>
                                                <div class="mt-4">
                                                    <div class="flex items-center">
                                                        <input type="radio" id="maleOnly" v-model="selectedOption" value="maleOnly" class="mr-2">
                                                        <label for="maleOnly" class="ml-2">I am renting this only to Bachelors (male)</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="femaleOnly" v-model="selectedOption" value="femaleOnly" class="mr-2">
                                                        <label for="femaleOnly" class="ml-2">I am renting this only to Bachelors (female)</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="familyOnly" v-model="selectedOption" value="familyOnly" class="mr-2">
                                                        <label for="familyOnly" class="ml-2">I am renting this only to Families</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="professionalsOnly" v-model="selectedOption" value="professionalsOnly" class="mr-2">
                                                        <label for="professionalsOnly" class="ml-2">I am renting this only to Working Professionals</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="anyOne" v-model="selectedOption" value="anyOne" class="mr-2">
                                                        <label for="anyOne" class="ml-2">I am renting this to anyone who is interested</label>
                                                    </div>
                                                </div>


                                                <!-- Line -->
                                                <hr class="w-full mt-8 border-t border-gray-300">

                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Add Property</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>