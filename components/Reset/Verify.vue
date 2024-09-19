<script setup lang="ts">
let OTP = ref(null);

const route = useRoute();
let email = route.query.email ?? null;
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="email">
      <h2 class="font-bold text-xl">Enter OTP send to your email here</h2>
<p class="text-sm text-center">OTP send to <span class="text-blue-500 font-bold">{{ email }}</span></p>
      <form class="flex flex-col gap-3 justify-center items-center py-10">
        <InputOtp v-model="OTP" integerOnly :length="6" />
        <Button label="Submit" />
      </form>
    </div>

    <div v-else>
      <h2 class="font-bold text-xl">Invalid Link</h2>
    </div>
  </div>
</template>
