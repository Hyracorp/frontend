<template>
    <footer class="md:relative fixed bottom-0 w-full bg-blue-50 text-gray-700 py-4 shadow-lg">
        <div class="container mx-auto flex justify-between items-center px-6">

            <!-- Logo Section (Visible only on medium screens and larger) -->
            <div class="hidden md:block">
                <img src="/img/logo.png" alt="logo" class="w-32">
            </div>

            <!-- Navigation Icons (Responsive) -->
            <div class="flex justify-around w-full md:max-w-md space-x-4 md:space-x-6">
                <!-- Home Icon -->
                <div class="flex flex-col items-center">
                    <a href="/" class="text-gray-500 hover:text-blue-600 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 1.293a1 1 0 00-1.414 0L2.343 8.243a1 1 0 101.414 1.414L10 3.414l6.243 6.243a1 1 0 001.414-1.414l-7-7z"/>
                            <path d="M5.5 9.5a.5.5 0 00-.5.5v5.5h4v-3h2v3h4V10a.5.5 0 00-.5-.5h-9z"/>
                        </svg>
                    </a>
                    <span class="text-xs mt-1">Home</span>
                </div>

                <!-- Property Icon (New) -->
                <div class="flex flex-col items-center">
                    <a href="#property" class="text-gray-500 hover:text-blue-600 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9.5V20h4v-6h10v6h4V9.5l-9-5.5-9 5.5zM22 7.68v-2.68l-10-6-10 6v2.68l10-5.68 10 5.68z"/>
                        </svg>
                    </a>
                    <span class="text-xs mt-1">Notification</span>
                </div>

                <!-- Contact Us Icon -->
                <div class="flex flex-col items-center">
                    <a href="https://hyracorp.com/#contact" class="text-gray-500 hover:text-blue-600 transition duration-300" target="_blank" >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884l8 4.8a1 1 0 00.994 0l8-4.8A1 1 0 0018 5H2a1 1 0 00-.997.884z"/>
                            <path d="M18 8.118l-8 4.8-8-4.8V14a1 1 0 001 1h14a1 1 0 001-1V8.118z"/>
                        </svg>
                    </a>
                    <span class="text-xs mt-1">Contact Us</span>
                </div>

                <!-- Profile Icon -->
                <div class="flex flex-col items-center">
                    <a href="#profile" class="text-gray-500 hover:text-blue-600 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z"/>
                        </svg>
                    </a>
                    <span class="text-xs mt-1">Profile</span>
                </div>
            </div>
        </div>
    </footer>
</template>
