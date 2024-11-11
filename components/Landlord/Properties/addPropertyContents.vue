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
<<template>
  <div>
    
  </div>
</template>
