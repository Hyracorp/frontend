<script setup lang="ts">
// import necessary imports
import Map from "./Map.vue";
import MapPicker from "./MapPicker.vue";
import {
  residentialPropertySchema,
  commercialPropertySchema,
} from "@/schemas/propertySchema";
import { z } from "zod";
const { $api } = useNuxtApp();
const propertyAPI = usePropertyAPI($api);

// toast for notification
const toast = useToast();

// the main form variable
const addPropertyForm = ref({
  propertyType: "Residential", // or "Commercial"
  serviceType: "Rent", // or "Lease" or "Management"
  areaSqFt: 0,
  floorNo: "",
  expectedRateRent: 0,
  expectedDeposit: 0,
  description: "",
  propertyOwner: "",
  propertyInsured: false,
  title: "",
  latitude: 0,
  longitude: 0,
  addressLine1: "",
  addressLine2: "", // optional
  pincode: 0,
  city: "",
  state: "",
  amenities: [], // array of numbers
  rules: "", // optional
  // Residential-specific fields
  bhk: "1 BHK", // or "2 BHK", "3 BHK", "4 BHK"
  flatHouse: "",
  petsAllowed: false,
  furnished: false,
  powerBackup: false,
  nonVegAllowed: false,
  landmark: "", // optional
  // Commercial-specific fields
  tenantPreference: "",
  fireSafetyStatus: false,
  washroomFacility: false,
  generator: false,
  noOfCarParkings: 0,
  noOfBikeParkings: 0,
});

// Device Recognition
const device = useDevice();

// util functions
// Fetch POSTAL ZIP CODES
async function fetchZipData(input) {
  if (String(input.value).length === 6) {
    $fetch(`https://api.postalpincode.in/pincode/${input.value}`).then(
      async (res) => {
        if (res[0].Status === "Success") {
          addPropertyForm.value.city = res[0].PostOffice[0].Block;
          addPropertyForm.value.state = res[0].PostOffice[0].State;
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Invalid Pincode",
            life: 3000,
          });
        }
      },
    );
  }
}
// Fetch current location
let location = ref(false);
async function getLocation() {
  if ("geolocation" in navigator) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition((position) => {
      addPropertyForm.value.latitude = position.coords.latitude;
      addPropertyForm.value.longitude = position.coords.longitude;
    });
    location.value = true;
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Geolocation not supported",
      life: 3000,
    });
  }
}

// convert camelCase to snake_case
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function convertKeysToSnake(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToSnake(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[camelToSnake(key)] = convertKeysToSnake(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

function convertKeysToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamel(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[snakeToCamel(key)] = convertKeysToCamel(obj[key]);
      return result;
    }, {});
  }
  return obj;
}
//function end

// Location from Map
const op = ref();
async function openMap(event) {
  op.value.toggle(event);
}
async function setLocation(loc) {
  location.value = false;
  addPropertyForm.value.latitude = loc.lat;
  addPropertyForm.value.longitude = loc.longi;
  op.value.hide();
  location.value = true;
}

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  propertyId: {
    type: Number,
    default: null,
  },
});

// property

let propertyTypeCommercial = ref(false);
const amenities = ref([]);
const bhkOptions = { 1: "1 BHK", 2: "2 BHK", 3: "3 BHK", 4: "4 BHK" };
onMounted(async () => {
  try {
    const res = await propertyAPI.fetchAmenities();

    if (res) {
      amenities.value = res;
    }
  } catch (err) {
    console.log(err);
  }

  if (props.editMode == true && props.propertyId != null) {
    try {
      const res = await propertyAPI.getProperty(props.propertyId);
      if (res) {
        let formattedRes = convertKeysToCamel(res);
        addPropertyForm.value = formattedRes;
        addPropertyForm.value.bhk = bhkOptions[formattedRes.bhk];
        addPropertyForm.value.pincode = Number(formattedRes.pincode);
        if (addPropertyForm.value.latitude && addPropertyForm.value.longitude) {
          setLocation({
            lat: addPropertyForm.value.latitude,
            longi: addPropertyForm.value.longitude,
          });
        }
        if (formattedRes.amenities) {
          formattedRes.amenities.forEach((amenity, index) => {
            addPropertyForm.value.amenities[index] = amenity.id;
          });
        }
        if (addPropertyForm.value.propertyType == "Residential") {
          propertyTypeCommercial.value = false;
        } else {
          propertyTypeCommercial.value = true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
const emits = defineEmits(["close", "success"]);

async function submitForm() {
  console.log(addPropertyForm.value);
  if (location.value == false) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Please provide your location",
      life: 3000,
    });
    return;
  } else {
    let formattedData = ref(null);
    try {
      console.log("Commercial check", propertyTypeCommercial.value);
      if (propertyTypeCommercial.value == true) {
        const commercialCheck = commercialPropertySchema.parse(
          addPropertyForm.value,
        );
        formattedData.value = convertKeysToSnake(commercialCheck);
      } else {
        const residentialCheck = residentialPropertySchema.parse(
          addPropertyForm.value,
        );
        formattedData.value = convertKeysToSnake(residentialCheck);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: `${err.issues[0].path[0]}: ${err.issues[0].message}`,
          life: 3000,
        });
      } else {
        console.log(err);
      }
    }
    if (formattedData.value) {
      try {
        if (props.editMode == false) {
          const res = await propertyAPI.addProperty(formattedData.value);
          emits("success");
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Property added successfully",
            life: 3000,
          });
          emits("success");
          return;
        } else {
          await propertyAPI.updateProperty(
            formattedData.value,
            props.propertyId,
          );
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Property updated successfully",
            life: 3000,
          });
          emits("success");
          return;
        }
      } catch (err) {
        console.log(err);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      }
    }
  }
}
</script>
<template>
  <div>
    <Stepper linear :orientation="device?.isDesktop ? 'horizontal' : 'vertical'" class="min-w-sm w-full">
      <StepPanels>
        <StepPanel header="Property Type">
          <!-- Screen 1 : Property Type -->
  <template #content="{ nextCallback }">
    <div class="flex justify-center items-center gap-3 flex-wrap">
      <Card :class="`w-full max-w-xs ${!propertyTypeCommercial ? 'outline outline-2' : 'outline-0'}`" @click="() => {
                  propertyTypeCommercial = false;
                  addPropertyForm.propertyType = 'Residential';
                }
                ">
        <template #content>
          <Icon name="ph:house" class="text-3xl" />
          <div class="">Residential Property</div>
        </template>
      </Card>
      <Card :class="`w-full max-w-xs ${propertyTypeCommercial ? 'outline outline-2' : 'outline-0'}`" @click="() => {
                  propertyTypeCommercial = true;
                  addPropertyForm.propertyType = 'Commercial';
                }
                ">
        <template #content>
          <Icon name="ph:buildings" class="text-3xl" />
          <div class="">Commercial property</div>
        </template>
      </Card>
    </div>
    <div class="flex pt-4 justify-between items-center">
      <div class="px-2 font-bold">
        {{
        propertyTypeCommercial
        ? "Commercial property"
        : "Residential property"
        }}
      </div>
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
    </div>
  </template>
  </StepPanel>
  <!-- Screen 1 : Property Type End -->
  <!-- Screen 2 : Property Details -->
  <StepPanel header="Basic Details">
    <template #content="{ prevCallback, nextCallback }">
      <div class="w-full flex gap-3 flex-col">
        <div class="">
          <label for="property title" class="block">Property Title*</label>
          <InputText v-model="addPropertyForm.title" placeholder="Enter a title" class="w-full" />
        </div>
        <div class="">
          <label for="property_service" class="block">Property Service Type*</label>
          <Select v-model="addPropertyForm.serviceType" :options="['Rent', 'Lease']"
            placeholder="Select Property Service Type" class="w-full" />
        </div>
        <div class="">
          <label for="property_area" class="block">Property Area (sqft)*</label>
          <InputNumber v-model="addPropertyForm.areaSqFt" placeholder="Enter Property Area" class="w-full" :min="1" />
        </div>
        <div class="">
          <label for="property_floor" class="block">Floor Number (0 for ground)*</label>
          <InputText v-model="addPropertyForm.floorNo" placeholder="Enter Floor Number" class="w-full" :min="0" />
        </div>
        <div class="">
          <label for="property_owner" class="block">Property Ownership (self or others)*</label>
          <InputText v-model="addPropertyForm.propertyOwner" placeholder="Enter Property Owner" class="w-full" />
        </div>
        <div class="">
          <label for="property_rent" class="block">Expected Rent*</label>
          <InputNumber v-model="addPropertyForm.expectedRateRent" placeholder="Enter Expected Rent" class="w-full"
            :min="1" />
        </div>
        <div class="">
          <label for="property_deposit" class="block">Expected Deposit*</label>
          <InputNumber v-model="addPropertyForm.expectedDeposit" placeholder="Enter Expected Deposit" class="w-full"
            :min="1" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="property_address" class="block">Address*</label>
          <InputText v-model="addPropertyForm.addressLine1" placeholder="Enter Address Line 1" class="w-full" />
          <InputText v-model="addPropertyForm.addressLine2" placeholder="Enter Address Line 2(optional)"
            class="w-full" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="property_pincode" class="block">Pincode*</label>
          <InputNumber v-model="addPropertyForm.pincode" placeholder="Enter Pincode" class="w-full" :min="100000"
            :useGrouping="false" @input="fetchZipData" inputId="integeronly" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="property_city" class="block">City*</label>
          <InputText v-model="addPropertyForm.city" placeholder="Enter City" class="w-full" disabled />
        </div>
        <div class="flex flex-col gap-2">
          <label for="property_city" class="block">State*</label>
          <InputText v-model="addPropertyForm.state" placeholder="Enter State" class="w-full" disabled />
        </div>

        <div class=" ">
          <label for="property city" class="block">location* :
            {{
            location
            ? `${addPropertyForm.latitude} ,
            ${addPropertyForm.longitude}`
            : "--"
            }}</label>
          <div>
            <Map v-if="location" :latitude="addPropertyForm.latitude" :longitude="addPropertyForm.longitude" />
          </div>
          <div class="flex gap-3">
            <Button type="button" @click="getLocation">
              Get Location
              <Icon name="ph:map-pin" />
            </Button>
            <Button type="button" @click="openMap">
              Pick from map
              <Icon name="ph:map-trifold-bold" />
            </Button>
          </div>
          <Popover ref="op">
            <MapPicker @location-picked="setLocation" />
          </Popover>
        </div>
        <div class="flex flex-col gap-2">
          <label for="property_description" class="block">Description*</label>
          <Textarea v-model="addPropertyForm.description" placeholder="Enter Description" class="w-full" />
        </div>
        <div class="flex gap-4">
          <label for="property_insured" class="block">Property Insured*</label>
          <ToggleSwitch v-model="addPropertyForm.propertyInsured" />
        </div>
        <!-- residential specific fields -->
        <div v-if="addPropertyForm.propertyType === 'Residential'" class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <label for="property_bhk" class="block">BHK*</label>
            <Select v-model="addPropertyForm.bhk" :options="['1 BHK', '2 BHK', '3 BHK', '4 BHK']" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="property_flat_house" class="block">Flat/House*</label>
            <InputText v-model="addPropertyForm.flatHouse" placeholder="Enter Flat/House" class="w-full" />
          </div>
          <div class="flex gap-4">
            <label for="property_pets" class="block">Pets Allowed*</label>
            <ToggleSwitch v-model="addPropertyForm.petsAllowed" />
          </div>
          <div class="flex gap-4">
            <label for="property_furnished" class="block">Furnished*</label>
            <ToggleSwitch v-model="addPropertyForm.furnished" />
          </div>

          <div class="flex gap-4">
            <label for="property_power" class="block">Power Backup*</label>
            <ToggleSwitch v-model="addPropertyForm.powerBackup" />
          </div>

          <div class="flex gap-4">
            <label for="property_non_veg" class="block">Non Veg*</label>
            <ToggleSwitch v-model="addPropertyForm.nonVegAllowed" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="property_landmark" class="block">landmark*</label>
            <InputText v-model="addPropertyForm.landmark" placeholder="Enter landmark" class="w-full" />
          </div>
        </div>
        <!-- end of residential specific fields -->
        <!-- commercial specific fields -->
        <div v-if="addPropertyForm.propertyType === 'Commercial'">
          <div class="flex flex-col gap-2">
            <label for="property_tenant_preference" class="block">Tenant Preference*</label>
            <InputText v-model="addPropertyForm.tenantPreference"
              placeholder="For Offices / For any Commercial work etc... " />
          </div>
          <div class="flex flex-col gap-2">
            <label for="property_fire" class="block">Fire and Safety*</label>
            <ToggleSwitch v-model="addPropertyForm.fireSafetyStatus" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="property_washroom" class="block">Washroom Facilities*</label>
            <ToggleSwitch v-model="addPropertyForm.washroomFacilities" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="property_genator" class="block">Generator*</label>
            <ToggleSwitch v-model="addPropertyForm.generator" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="property_car" class="block">Car Parking*</label>
            <InputNumber v-model="addPropertyForm.noOfCarParkings" placeholder="Enter Car Parking" :min="0" />
          </div>

          <div class="flex flex-col gap-2">
            <label for="property_bike" class="block">Bike Parking*</label>
            <InputNumber v-model="addPropertyForm.noOfBikeParkings" placeholder="Enter Bike Parking" :min="0" />
          </div>
        </div>
        <!-- end of commercial specific fields -->
        <div class="flex pt-4 justify-between">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          <Button label="Next" icon="pi pi-arrow-right" @click="nextCallback" />
        </div>
      </div>
    </template>
  </StepPanel>
  <!-- Screen 2 : Property Details End -->
  <!-- Screen 3 : Property Amenities and Rules -->
  <StepPanel header="select amenities">
    <template #content="{ prevCallback }">
      <div class="flex flex-col gap-3">
        <div class="max-w-sm h-40 overflow-y-auto w-full flex gap-3 flex-wrap">
          <label for="amenities" class="text-gray-500 font-bold py-3">Select Available Amenities</label>
          <div class="flex items-center gap-2" v-for="(amenity, index) in amenities" :key="index">
            <Checkbox v-model="addPropertyForm.amenities" :inputId="String(index)" name="amenity" :value="amenity.id" />
            <Icon :name="amenity.icon" class="text-xl" />
            <label :for="amenity.key">{{ amenity.name }}</label>
          </div>
        </div>
        <div>
          <label for="rules" class="text-gray-500 font-bold">Add Property Rules</label>
          <Textarea v-model="addPropertyForm.rules" rows="5" cols="30" class="w-full"
            placeholder="Enter Property Rules" />
        </div>
        <div class="flex pt-4 justify-between">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          <Button label="Submit" @click="submitForm" />
        </div>
      </div>
    </template>
  </StepPanel>
  </StepPanels>
  <!-- Screen 3 : Property Amenities and Rules End -->
  </Stepper>
  </div>



</template>
