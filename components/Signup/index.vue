<template>
    <div>
      <div class="card max-w-sm w-full">
        <Card class="w-full mx-auto">
          <template #title> Signup </template>
          <template #content>
            <div class="flex justify-center">
              <FirstSignup />
            </div>
            <span class="text-xs">
              <div class="text-center mt-4">
                  By creating an account, you agree to our 
                  <a href="#" class="text-blue-500">Privacy Policy</a>
                  and 
                  <a href="#" class="text-blue-500">Terms of Use</a>. 
                  <span class="block mt-2">Already have an account? <nuxt-link to="/login" class="text-blue-500"> Login Here</nuxt-link></span>
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