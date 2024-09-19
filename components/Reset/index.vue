<template>
    <div>
      <div class="card max-w-sm w-full">
        <Card class="w-full mx-auto">
          <template #title> Reset Password </template>
          <template #content>
            <div class="flex justify-center">
              <ResetPassword />
            </div>
            <span class="text-xs">
              <div class="text-center mt-4">
                  By resetting your password, you agree to our 
                  <a href="#" class="text-blue-500">Privacy Policy</a>
                  and 
                  <a href="#" class="text-blue-500">Terms of Use</a>. 
              </div>
          </span>
          </template>
        </Card>
      </div>
    </div>
</template>
  

<script setup>
import FirstSignup from './FirstSignup.vue';


</script>

<style scoped>

</style>