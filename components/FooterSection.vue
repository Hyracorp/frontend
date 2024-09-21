<script setup lang="ts">
const emits = defineEmits(['searchClick']);

</script>

<template>
  <footer class="md:relative fixed bottom-0 w-full bg-blue-50 text-gray-700 py-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center px-6">
      <!-- Logo Section (Visible only on medium screens and larger) -->
      <div class="hidden md:block">
        <img src="/img/logo.png" alt="logo" class="w-32" />
      </div>

      <!-- Navigation Icons (Responsive) -->
      <div class="flex justify-around w-full md:max-w-md space-x-4 md:space-x-6 md:hidden">
        <!-- Home Icon -->
        <div class="flex flex-col items-center">
          <a href="/" class="text-gray-500 hover:text-blue-600 transition duration-300">
            <Icon name="ph:house-fill" class="text-gray-500 hover:text-blue-600 transition duration-300" />
          </a>
          <span class="text-xs mt-1">Home</span>
        </div>

        <!-- Property Icon (New) 
        <div class="flex flex-col items-center" @click="emits('searchClick')">
          <div class="text-gray-500 hover:text-blue-600 transition duration-300">
            <Icon name="ph:magnifying-glass-fill" class="text-gray-500 hover:text-blue-600 transition duration-300" />
          </div>
          <span class="text-xs mt-1">Search</span>
        </div>
-->
        <!-- Contact Us Icon -->
        <div class="flex flex-col items-center">
          <a href="https://hyracorp.com/#contact" class="text-gray-500 hover:text-blue-600 transition duration-300"
            target="_blank">
            <Icon name="ph:phone-fill" class="text-gray-500 hover:text-blue-600 transition duration-300" />
          </a>
          <span class="text-xs mt-1">Contact Us</span>
        </div>

        <!-- Profile Icon -->
        <div class="flex flex-col items-center">
          <div class="text-gray-500 hover:text-blue-600 transition duration-300">
            <Icon name="ph:bell-fill" class="text-gray-500 hover:text-blue-600 transition duration-300" />
          </div>
          <span class="text-xs mt-1">Notifications</span>
        </div>
      </div>
    </div>
  </footer>
</template>
