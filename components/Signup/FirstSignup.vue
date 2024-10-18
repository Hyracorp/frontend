<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { z } from "zod";
import { signupSchema } from "@/schemas/authSchema";
const { $api } = useNuxtApp();
const authAPI = useAuthAPI($api);
const authStore = useAuthStore();

const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
  password2: "",
  password: "",
  userType: "tenant",
});
const userTypes = ref(["tenant", "landlord"]);

const toast = useToast();
async function formSubmit() {
  try {
    signupSchema.parse(formData.value);
    const signupcheck = await authAPI.registerUser(formData.value);

    if (signupcheck.data) {
      toast.add({
        severity: "success",
        summary: "Info",
        detail: "Signup Successful",
        life: 3000,
      });
      navigateTo("/verify?email=" + formData.value.email);
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error Signup",
        life: 3000,
      });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: ` ${err.issues[0].path[0]}: ${err.issues[0].message}`,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Error Signup",
        life: 3000,
      });
    }
  }
}
</script>
<template>
  <div class="flex flex-col items-center gap-3">
    <div class="w-full">
      <InputText v-model="formData.first_name" type="text" class="p-3 w-full" placeholder="What is your First Name ?" />
    </div>
    <div class="w-full">
      <InputText v-model="formData.last_name" type="text" class="p-3 w-full" placeholder="What is your Last Name ?" />
    </div>
    <!-- <div class="w-full">
            <InputText type="text" v-model="formData.phone" class="p-3 w-full" placeholder="Your Phone Number Please" />
        </div> -->
    <div class="w-full">
      <InputText v-model="formData.email" type="text" class="p-3 w-full" placeholder="Enter your correct Email ID" />
    </div>
    <div class="w-full">
      <Password v-model="formData.password" type="password" class="w-full" placeholder="Create a strong Password"
        toggleMask />
    </div>
    <div class="w-full">
      <InputText v-model="formData.password2" type="password" class="w-full" placeholder="Create a strong Password" />
    </div>

    <div class="w-full">
      <Dropdown v-model="formData.userType" :options="userTypes" placeholder="Select User Type" class="w-full" />
    </div>
    <div class="w-full">
      <Button label="Signup"  class="p-3 w-full"  @click="formSubmit" />
    </div>
  </div>
</template>

<style scoped></style>
