<template>
    <div>
      <div class="card max-w-sm w-full">
        <Card class="w-full mx-auto">
          <template #title> Login </template>
          <template #content>
            <div class="flex justify-center">
              <LoginEmailLogin />
            </div>
            <div class="flex items-center">
              <div class="flex-grow border-b border-gray-400"></div>
              <div class="mx-4 text-gray-600 font-bold">OR</div>
              <div class="flex-grow border-b border-gray-400"></div>
            </div>
            <div class="flex justify-center">
              <LoginGmailFacebookLogin />
            </div>
            <span class="text-xs">
              <div class="text-center mt-4">
                  By creating an account, you agree to our 
                  <a href="#" class="text-blue-500">Privacy Policy</a>
                  and 
                  <a href="#" class="text-blue-500">Terms of Use</a>. 
                  <span class="block mt-2 text-lg">Don’t have an account? <nuxt-link to="/signup" class="text-blue-500"> Signup Here</nuxt-link></span>
              </div>
          </span>
          </template>
        </Card>
      </div>
    </div>
</template>
  
