<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { z } from "zod";
import { loginSchema } from "@/schemas/authSchema";
const router = useRouter();
const authStore = useAuthStore();
const { $api } = useNuxtApp();
const authAPI = useAuthAPI($api);
const profileAPI = useProfileAPI($api);
const props = defineProps({
  redirect_url: {
    type: String,
    default: "",
  },
});
const formData = ref({
  email: "",
  password: "",
});
const userType = computed(() => authStore.getUserType);
const toast = useToast();
let emailNotVerified = ref(false);
async function formSubmit() {
  try {
    loginSchema.parse(formData.value);
    try {
      const login = await authAPI.loginUser(formData.value);
      const logincheck = await authStore.login(login);

      if (logincheck == true) {
        toast.add({
          severity: "success",
          summary: "Info",
          detail: "Login Successful",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error Logging in",
          life: 3000,
        });
      }
    } catch (err) {
      if (
        err.response?.status === 401 &&
        err.response?._data?.detail == "Email not verified"
      ) {
        emailNotVerified.value = true;
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Email Not Verified",
          life: 3000,
        });
      } else {
        emailNotVerified.value = false;
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error Logging in",
          life: 3000,
        });
      }
    }
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

  const loggedIn = await authStore.getAuthStatus;
  if (loggedIn) {
    try {
      const res = await profileAPI.getProfile(userType.value);
      if (res?.data) {
        await authStore.setUser(res.data.user_data);
      }

      if (props.redirect_url) {
        router.push(props.redirect_url);
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        router.push(`/${userType.value}/settings`);
      } else {
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <Message severity="warn" v-if="emailNotVerified">
      <template #icon>
        <Icon name="ph:alert-circle" />
      </template>
      <span class="ml-2">Email id is not verified yet,
        <a class="text-red-500 underline font-bold" :href="`/verify?email=${formData.email}`">Click here</a>
        to verify.</span>
    </Message>
    <div class="w-full">
      <InputText v-model="formData.email" type="email" class="p-3 w-full" placeholder="Enter your email" />
    </div>
    <div class="w-full">
      <Password v-model="formData.password" :feedback="false" class="w-full" placeholder="Enter your Password"
        toggleMask />
    </div>
    <div class="w-full mb-4">
      <Button label="Login" severity="info" class="p-3 w-full" raised @click="formSubmit" />
    </div>
  </div>
</template>

<style scoped></style>
