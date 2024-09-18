<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { z } from "zod";
import { tenantProfileSchema } from "@/schemas/profileSchema";

const { $api } = useNuxtApp();
const profileAPI = useProfileAPI($api);

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const profile = computed(() => authStore.getProfile);
const userType = computed(() => authStore.getUserType);
const fetchProfile = async () => {
  await profileAPI.getProfile(userType.value);
};
let profileData = ref({
  phone_number: "",
  address: "",
  city: "",
  state: "",
  zip_code: 0,
  country: "",
  marital_status: "",
  gender: "",
  occupation: "",
});
const genderOptions = ["Male", "Female", "Other"];
const maritalStatusOptions = ["Married", "Unmarried"];
const occupationOptions = ["Student", "Employed", "Unemployed"];
const toast = useToast();
const profileUpdateVisible = ref(false);
//utils
async function fetchZipData(input) {
  if (String(input.value).length === 6) {
    $fetch(`https://api.postalpincode.in/pincode/${input.value}`).then(
      async (res) => {
        if (res[0].Status === "Success") {
          profileData.value.city = res[0].PostOffice[0].Block;
          profileData.value.state = res[0].PostOffice[0].State;
          profileData.value.country = res[0].PostOffice[0].Country;
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
watchEffect(async () => {
  try {
    const res =
      userType.value == "tenant"
        ? await profileAPI.getProfile(userType.value)
        : null;

    if (res?.data) {
      await authStore.setUser(res.data.user_data);
      await authStore.setProfile(res.data);
      if (profile.value != null) {
        profileData.value.phone_number = profile.value.phone_number;
        profileData.value.address = profile.value.address;
        profileData.value.city = profile.value.city;
        profileData.value.state = profile.value.state;
        profileData.value.zip_code = Number(profile.value.zip_code);
        profileData.value.country = profile.value.country;
        profileData.value.marital_status = profile.value.marital_status;
        profileData.value.occupation = profile.value.occupation;
        profileData.value.gender = profile.value.gender;
      }
    }
  } catch (err) {
    if (err.response?.status === 404) {
      if (err.response._data?.data) {
        await authStore.setUser(err.response._data?.data);
      }
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Profile Not Found please add one",
        life: 3000,
      });
      profileUpdateVisible.value = true;
    }
  }
});
async function profileSubmit() {
  try {
    tenantProfileSchema.parse(profileData.value);
    if (profile.value == null) {
      const res = await profileAPI.addProfile(
        profileData.value,
        userType.value,
      );
      if (res) {
        toast.add({
          severity: "success",
          summary: "Info",
          detail: "Profile Added",
          life: 3000,
        });
        profileUpdateVisible.value = false;
      }
    } else {
      const res = await profileAPI.updateProfile(
        profileData.value,
        userType.value,
        profile.value.lId,
      );
      if (res) {
        toast.add({
          severity: "success",
          summary: "Info",
          detail: "Profile Updated",
          life: 3000,
        });
        profileUpdateVisible.value = false;
      }
    }
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      err.issues.forEach((issue) => {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: issue.message,
          life: 3000,
        });
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 3000,
      });
    }
  }
}

async function logoutUser() {
  await authStore.logout();
  navigateTo("/login");
}
</script>

<template>
  <div class="dashboard p-5 flex flex-col gap-6 bg-gray-100 min-h-screen">
    <div class="text-3xl font-bold text-gray-800">Dashboard Settings</div>
    
    <div v-if="user" class="dashboard-content flex flex-col lg:flex-row gap-6">
      <!-- Profile Card -->
      <Card class="profile-card w-full lg:w-1/3 p-5 bg-white shadow-md rounded-lg">
        <template #title>
          <div class="flex justify-between">
            <div class="text-lg font-bold text-gray-700">Profile Info</div>
            <Button text @click="logoutUser" class="text-red-500">
              Sign out
              <Icon name="ph:sign-out" class="text-xl" />
            </Button>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-5">
            <div class="flex gap-3 items-center">
              <Avatar :label="user?.first_name.charAt(0)" size="xlarge" shape="circle" class="border-gray-300" />
              <div class="text-gray-800 text-xl">{{ user?.first_name }} {{ user?.last_name }}</div>
            </div>
            <Divider />
            <div class="text-gray-500">{{ user?.email }}</div>
          </div>
        </template>
      </Card>
      
      <!-- Profile Data Card -->
      <Card class="profile-data-card w-full lg:w-2/3 p-5 bg-white shadow-md rounded-lg">
        <template #title>
          <div class="flex justify-between items-center">
            <div class="text-lg font-bold text-gray-700">Profile Details</div>
            <Button rounded @click="profileUpdateVisible = true" class="text-blue-500">
              <Icon name="ph:pencil" class="text-xl text-white" />
            </Button>
          </div>
        </template>
        <template #content>
          <!-- Responsive grid layout: 1 column on small devices, 2 columns on large -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(value, key) in profileData" :key="key" class="flex flex-col">
              <span class="text-gray-500 text-sm font-bold capitalize">{{ key }}:</span>
              <span class="text-gray-800">{{ value }}</span>
              <Divider />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Update Profile Dialog -->
    <Dialog v-model:visible="profileUpdateVisible" modal class="max-w-md w-full">
      <form class="space-y-4">
        <div class="text-xl font-bold text-gray-700">Update Profile</div>
        
        <!-- Profile Form Fields -->
        <div class="space-y-4">
          <div class="form-field">
            <label for="gender" class="text-gray-500 font-bold">Gender</label>
            <Dropdown v-model="profileData.gender" :options="genderOptions" placeholder="Select Gender" class="w-full" />
          </div>
          <div class="form-field">
            <label for="marital_status" class="text-gray-500 font-bold">Marital Status</label>
            <Dropdown v-model="profileData.marital_status" :options="maritalStatusOptions" placeholder="Select Marital Status" class="w-full" />
          </div>
          <div class="form-field">
            <label for="occupation" class="text-gray-500 font-bold">Occupation</label>
            <Dropdown v-model="profileData.occupation" :options="occupationOptions" placeholder="Select Occupation" class="w-full" />
          </div>
          <div class="form-field">
            <label for="phone_number" class="text-gray-500 font-bold">Phone</label>
            <InputText v-model="profileData.phone_number" type="text" placeholder="Phone" class="w-full" />
          </div>
          <div class="form-field">
            <label for="address" class="text-gray-500 font-bold">Address</label>
            <InputText v-model="profileData.address" type="text" placeholder="Address" class="w-full" />
          </div>
          <div class="form-field">
            <label for="zip_code" class="text-gray-500 font-bold">Pincode</label>
            <InputNumber v-model="profileData.zip_code" @input="fetchZipData" inputId="integeronly" :max="999999" :min="0" />
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button label="Cancel" icon="pi pi-times" text @click="profileUpdateVisible = false" class="text-red-500" />
          <Button label="Save" icon="pi pi-check" text @click="profileSubmit" class="text-green-500" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
/* Dashboard-specific styling */
.dashboard {
  background-color: #f7f9fc;
}

.profile-card {
  background-color: white;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.profile-data-card {
  background-color: white;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.form-field label {
  font-weight: 600;
  color: #333;
}

.form-field input {
  border-radius: 6px;
  padding: 8px;
  border: 1px solid #dfe3e8;
  width: 100%;
}

button {
  font-size: 14px;
}

.card button {
  margin-left: auto;
  display: flex;
  align-items: center;
  color: #006eff;
  font-size: 1.25rem;
}

</style>

