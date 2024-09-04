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
  <div class="p-5 flex flex-col gap-5">
    <div class="text-2xl font-bold">Settings</div>

    <div class="">
      <div v-if="user" class="flex flex-col gap-5">
        <Card class="w-full">
          <template #title>
            <div class="w-full flex justify-end">
              <Button text @click="logoutUser">
                Sign out
                <Icon name="ph:sign-out" class="text-xl" />
              </Button>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center w-full">
                <div class="flex gap-3 items-center">
                  <Avatar :label="user?.first_name.charAt(0)" size="xlarge" shape="circle" />
                  <div>{{ user?.first_name }} {{ user?.last_name }}</div>
                </div>
              </div>
              <Divider />
              <div class="text-gray-500">
                {{ user?.email }}
              </div>
              <Divider />
            </div>
          </template>
        </Card>
        <Card>
          <template #title>
            <div class="w-full flex justify-between">
              <div class="text-xl font-bold">Profile</div>
              <div class="">
                <Button rounded>
                  <Icon name="ph:pencil" class="text-xl" @click="profileUpdateVisible = true" />
                </Button>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-3">
              <div v-for="item in Object.entries(profileData)" :key="item">
                <Divider />
                <div class="text-lg text-gray-900">
                  <span class="text-gray-500 font-bold mr-2 capitalize">{{ item[0] }} :
                  </span>
                  : {{ item[1] }}
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <Skeleton width="300px" height="100px" />
      </div>
    </div>
    <Dialog v-model:visible="profileUpdateVisible" modal class="max-w-md w-full">
      <form>
        <div class="flex flex-col gap-3">
          <div class="text-xl font-bold">Update Profile</div>
          <div class="flex flex-col gap-3">
   <div class="flex flex-col gap-3">
              <label for="country" class="text-gray-500 font-bold">Gender</label>
              <Dropdown v-model="profileData.gender" :options="genderOptions"  placeholder="Select Gender" class="w-full" />
            </div><div class="flex flex-col gap-3">
              <label for="country" class="text-gray-500 font-bold">Marital Status</label>
              <Dropdown v-model="profileData.marital_status" :options="maritalStatusOptions"  placeholder="Select Marital Status" class="w-full" />
            </div><div class="flex flex-col gap-3">
              <label for="country" class="text-gray-500 font-bold">Occupation</label>
              <Dropdown v-model="profileData.occupation" :options="occupationOptions"  placeholder="Select Occupation" class="w-full" />
            </div>
            <div class="flex flex-col gap-3">
              <label for="phone" class="text-gray-500 font-bold">Phone</label>
              <InputText v-model="profileData.phone_number" type="text" placeholder="Phone" />
            </div>
            <div class="flex flex-col gap-3">
              <label for="Address" class="text-gray-500 font-bold">Address</label>
              <InputText v-model="profileData.address" type="text" placeholder="Address" />
            </div>
            <div class="flex flex-col gap-3">
              <label for="pincode" class="text-gray-500 font-bold">Pincode</label>
              <InputNumber v-model="profileData.zip_code" @input="fetchZipData" inputId="integeronly" :max="999999"
                :min="100000" :useGrouping="false" placeholder="Enter zipcode" class="w-full" />
            </div>
            <div class="flex flex-col gap-3">
              <label for="city" class="text-gray-500 font-bold">City</label>
              <InputText v-model="profileData.city" type="text" placeholder="City" disabled />
            </div>
            <div class="flex flex-col gap-3">
              <label for="state" class="text-gray-500 font-bold">State</label>
              <InputText v-model="profileData.state" type="text" placeholder="State" disabled />
            </div>
            <div class="flex flex-col gap-3">
              <label for="country" class="text-gray-500 font-bold">Country</label>
              <InputText v-model="profileData.country" type="text" placeholder="Country" disabled />
            </div>

            <Button label="Update" severity="info" class="p-3 w-full" raised @click="profileSubmit" />
          </div>
        </div>
      </form>
    </Dialog>
  </div>
</template>
