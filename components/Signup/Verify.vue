<script setup lang="ts">
const { $api } = useNuxtApp();
const authAPI = useAuthAPI($api);

let OTP = ref(null);

const route = useRoute();
let email = route.query.email ?? null;
let otp = route.query.otp ?? null;
const toast = useToast();
async function verifyOTP() {
  try {
    if (OTP.value == null) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid OTP",
        life: 3000,
      });
      return;
    }
    const res = await authAPI.verifyUser({ otp: OTP.value, email });
    if (res.message) {
      toast.add({
        severity: "success",
        summary: "Info",
        detail: "OTP Verified",
        life: 3000,
      });
      navigateTo("/login");
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid OTP",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Invalid OTP",
      life: 3000,
    });
  }
}
async function resendOTP() {
  if (email) {
    try {
      const res = await authAPI.resendOTP({  email });
      if (res.message) {
        toast.add({
          severity: "success",
          summary: "Info",
          detail: "OTP Resend Successful",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "OTP Resend Failed",
          life: 3000,
        });
      }
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "OTP Resend Failed",
        life: 3000,
      });
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="email">
      <h2 class="font-bold text-xl">Enter OTP send to your email here</h2>
      <p class="text-sm text-center">
        OTP send to <span class="text-blue-500 font-bold">{{ email }}</span>
      </p>
      <form class="flex flex-col gap-3 justify-center items-center py-10">
        <InputOtp v-model="OTP" integerOnly :length="6" />
        <Button label="Submit" @click="verifyOTP" />
        <p class="text-sm text-center flex jsustify-center items-center gap-2">
          Didn't get OTP? <Button @click="resendOTP" label="Resend" text />
        </p>
      </form>
    </div>

    <div v-else>
      <h2 class="font-bold text-xl">Invalid Link</h2>
    </div>
  </div>
</template>
