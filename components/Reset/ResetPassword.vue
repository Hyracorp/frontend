<script setup lang="ts">
import { ref } from 'vue';

// Data structure for the form
const formData = ref({
  email: '',
  newPassword: '',
  confirmPassword: ''
});

// Function to handle form submission
const formSubmit = () => {
  if (formData.value.newPassword !== formData.value.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  // Handle form submission logic here
  console.log('Password reset request submitted', formData.value);
};
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="w-full">
        <!-- Show the email ID to which the OTP will be shared. Make it Disabled -->
      <InputText v-model="formData.email" type="text" class="p-3 w-full" placeholder="Enter your registered Email" disabled/>
    </div>
    <div class="w-full">
      <Password v-model="formData.newPassword" type="password" class="w-full" placeholder="Enter your new Password" toggleMask />
    </div>
    <div class="w-full">
      <Password v-model="formData.confirmPassword" type="password" class="w-full" placeholder="Confirm your new Password" toggleMask />
    </div>
    <div class="w-full">
      <Button label="Reset Password" severity="info" class="p-3 w-full" raised @click="formSubmit" />
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>
