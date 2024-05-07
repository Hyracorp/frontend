<template>
    <div class="flex flex-col md:flex-row">
        <div class="fixed left-0 top-0 w-full md:w-[24%] p-5 overflow-y-auto h-full scrollbar-hidden md:static md:overflow-visible md:h-auto md:scrollbar-auto">
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-xl' }">
                    <template #title>
                        <div class="rounded-lg overflow-hidden justify-center items-center text-center">
                            <Image class="rounded-lg" src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                        </div>
                        <div class="text-center">
                            <h3>Your Name</h3>
                            <p class="text-sm font-medium text-gray-500">Landlord Profile</p>
                        </div>

                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="addInputField" class="flex items-center" outlined >
                                <Icon name="material-symbols:account-box" class="ml-1 mr-1 w-6 h-6"/>
                                    Profile
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="addInputField" class="flex items-center" outlined >
                                <Icon name="ic:baseline-log-in" class="ml-1 mr-1 w-6 h-6"/>
                                    Login Details
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="addInputField" class="flex items-center" outlined >
                                <Icon name="material-symbols:list-alt" class="ml-1 mr-1 w-6 h-6"/>
                                    Listed Properties
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="addInputField" class="flex items-center" outlined >
                                <Icon name="tabler:report" class="ml-1 mr-1 w-6 h-6"/>
                                    Report
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="addInputField" class="flex items-center" outlined >
                                <Icon name="ic:baseline-log-out" class="ml-1 mr-1 w-6 h-6"/>
                                    Logout
                             </Button>
                        </div>
                        
                    </template>

                    <template #content>

                    </template>
                </Card>
            </div>
        </div>
        <div class="w-full md:w-[76%] p-5 items-center mt-20 md:mt-0">
            <Card>
                <template #title class="text-gray-500 font-light">
                    Complete Your Profile
                    <p class="text-sm font-medium text-gray-500">Great ! Your have completed {{ value }}% of your profile.</p>
                </template>
                <template #content>
                    <div class="card">
                        <ProgressBar :value="40"> {{ value }}/100 </ProgressBar>
                    </div>
                </template>
            </Card>

            <!-- Profile -->
            <Card class="mt-10">
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            Profile
                            <p class="text-sm font-medium text-gray-500">Complete basic info for better experience</p>
                        </div>
                        <Button severity="info" outlined>
                            <Icon name="material-symbols:edit-outline" class="ml-1 mr-1 w-6 h-6"/>Edit
                        </Button>
                    </div>
                </template>
                <template #content class="flex flex-col">
                    <!-- First card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Name</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">Your Name</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Second card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Email</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">youremail@gmail.com</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Third card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Phone</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">+91 8965963256</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Fourth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Gender</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Fifth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Marital Status</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Sixth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Permanent Address</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Seventh card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Pincode</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Eighth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Occupation</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Ninenth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Birthday</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Tenth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">ID Proof</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">
                </template>
            </Card>

            <!-- Login Details -->
            <Card class="mt-10">
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            Login Details
                            <p class="text-sm font-medium text-gray-500">Manage your login details</p>
                        </div>
                        <Button severity="info" outlined>
                            <Icon name="material-symbols:edit-outline" class="ml-1 mr-1 w-6 h-6"/>Edit
                        </Button>
                    </div>
                </template>
                <template #content class="flex flex-col">
                    <!-- First card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">User Name</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">Your Name</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Second card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Email</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">youremail@gmail.com</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Third card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Phone</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">+91 8965963256</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Fourth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Password</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <h6 class="text-black font-bold">***********</h6>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Fifth card -->
                    <div class="flex items-end justify-end">
                        <a href="" class="text-blue-600 items-end justify-end">Change Password</a>
                    </div>

                </template>
            </Card>

            <!-- Listed Properties -->
            <Card class="mt-10">
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            Listed Properties
                            <p class="text-sm font-medium text-gray-500">View all of your listed properties</p>
                        </div>
                    </div>
                </template>
                <template #content class="flex flex-col">

                    <!-- First card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 1</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Details</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Second card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 2</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Details</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">
                </template>
            </Card>

            <!-- Report -->
            <Card class="mt-10">
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            View Your Reports
                            <p class="text-sm font-medium text-gray-500">View/Print your reports</p>
                        </div>
                    </div>
                </template>
                <template #content class="flex flex-col">

                    <!-- First card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 1</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Report</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Second card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 2</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Report</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
const value = ref(30);

onMounted(() => {
  const fixedSection = document.querySelector('.fixed');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    fixedSection.style.top = `${scrollY}px`;
  });
});
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 768px) {
  .fixed {
    position: static !important;
    overflow: visible !important;
    height: auto !important;
    scrollbar-width: auto !important;
  }
}
</style>