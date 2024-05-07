<template>
    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-[24%] p-5 overflow-y-auto h-full scrollbar-hidden md:overflow-visible md:h-auto md:scrollbar-auto">
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-xl' }">
                    <template #title>
                        <div class="rounded-lg overflow-hidden justify-center items-center text-center">
                            <Image class="rounded-2xl" src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                        </div>
                        <div class="text-center">
                            <h3 class="mt-3" >Your Name</h3>
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
        <div class="w-[100%] flex-1 p-5 items-center">
            <Card class="w-full">
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
                            <p class="text-sm font-medium text-gray-500">Complete profile </p>
                        </div>

                        <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="() => {
                                console.log('form submitted');
                            }">
                        </form>
                            <Button type="submit" @click="showCard = !showCard" severity="info" outlined>
                                <Icon name="material-symbols:edit-outline" class="ml-1 mr-1 w-6 h-6"/>Edit
                            </Button>
                        <div v-if="showCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="text-center mb-4">
                                            <h2 class="text-lg font-bold">Edit Your Profile</h2>
                                        </div>
                                        <div class="mt-4 text-sm font-medium text-black-500">
                                            
                                            <!-- First pair of inputs -->
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Your Name"/>
                                                        <small id="map-location-help">Full Name<span class="text-red-400"> *</span></small>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="emailvalue" aria-describedby="location-help" placeholder="youremail@gmail.com"/>
                                                        <small id="location-help">Email<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder="+91 8545879865"/>
                                                        <small id="rent-help">Phone<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="relative card flex justify-center">
                                                        <div class="flex flex-col gap-2 w-full">
                                                            <Dropdown v-model="selectedGender" editable :options="genders" showClear optionLabel="name" placeholder="Select your Gender" class="w-full" />
                                                            <small id="location-help">Gender<span class="text-red-400"> *</span></small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Third pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="relative card flex justify-center">
                                                        <div class="flex flex-col gap-2 w-full">
                                                            <Dropdown v-model="selectedMarital" editable :options="maritalstatus" showClear optionLabel="name" placeholder="Select your Marital Status" class="w-full" />
                                                            <small id="location-help">Marital Status<span class="text-red-400"> *</span></small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="address" aria-describedby="rent-help" placeholder="Address"/>
                                                        <small id="rent-help">Permanant Address<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Forth pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="pincode" aria-describedby="rent-help" placeholder="Pincode"/>
                                                        <small id="rent-help">Pincode<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="occupation" aria-describedby="rent-help" placeholder="Occupation"/>
                                                        <small id="rent-help">Occupation<span class="text-red-400"> *</span></small>
                                                </div>
                                                </div>
                                            </div>
                                            <!-- Fifth pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <Calendar v-model="birthday" showIcon inputId="birthday"  placeholder="Select your Birthday"/>
                                                        <small id="rent-help">Birthday<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <div class="hidden sm:flex justify-between">
                                                            <div class="w-full">
                                                                <div class="flex flex-col gap-2">
                                                                    <InputText v-model="photoValue1" placeholder="ID Proof"/>
                                                                    <small id="property-spec-help">ID Proof<span class="text-red-400"> *</span></small>
                                                                </div>
                                                            </div>
                                                            <div class="ml-4 items-center">
                                                                <div class="flex items-center text-white">
                                                                    <Button>
                                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-5 h-5 "/>
                                                                        </label>
                                                                    </Button>
                                                                    <input
                                                                        type="file"
                                                                        id="file-upload"
                                                                        ref="fileInput"
                                                                        class="hidden"
                                                                        @change="handleFileUpload"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- For small screens -->
                                                        <div class="block sm:hidden mt-4">
                                                            <div class="w-full">
                                                                <div class="flex flex-col gap-2">
                                                                    <InputText v-model="photoValue1" placeholder="ID Proof"/>
                                                                    <small id="property-spec-help">ID Proof<span class="text-red-400"> *</span></small>
                                                                </div>
                                                            </div>
                                                            <div class="mt-0 flex justify-end">
                                                                <div class="flex items-center text-white">
                                                                    <Button>
                                                                        <label for="file-upload" class="cursor-pointer flex items-center">
                                                                            <Icon name="ph:upload-simple-bold" class="ml-1 mr-1 w-6 h-6 "/>
                                                                        </label>
                                                                    </Button>
                                                                    <input
                                                                        type="file"
                                                                        id="file-upload"
                                                                        ref="fileInput"
                                                                        class="hidden"
                                                                        @change="handleFileUpload"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Save Changes</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Fifth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Marital Status</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Sixth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Permanent Address</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Seventh card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Pincode</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Eighth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Occupation</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Ninenth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Birthday</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">

                    <!-- Tenth card -->
                    <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">ID Proof</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a type="submit" @click="showCard = !showCard" class="text-blue-600">+ Add</a>
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
                        <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="() => {
                                console.log('form submitted');
                            }">
                        </form>
                        <Button type="submit" @click="showEditCard = !showEditCard" severity="info" outlined>
                            <Icon name="material-symbols:edit-outline" class="ml-1 mr-1 w-6 h-6"/>Edit
                        </Button>
                    </div>
                    <div v-if="showEditCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="mb-4">
                                            <h2 class="text-lg font-bold">Edit Your Login Details</h2>
                                        </div>
                                        <div class="mt-4 text-sm font-medium text-black-500">
                                            <!-- First pair of inputs -->
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Your Name"/>
                                                        <small id="map-location-help">Full Name<span class="text-red-400"> *</span></small>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="emailvalue" aria-describedby="location-help" placeholder="youremail@gmail.com"/>
                                                        <small id="location-help">Email<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder="+91 8545879865"/>
                                                        <small id="rent-help">Phone<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    
                                                </div>
                                            </div>
                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showEditCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Save Changes</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <a type="submit" @click="showChangePasswordCard = !showChangePasswordCard" class="text-blue-600 items-end justify-end">Change Password</a>
                    </div>
                    <div v-if="showChangePasswordCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="mb-4">
                                            <h2 class="text-lg font-bold">Change Password</h2>
                                        </div>
                                        <div class="mt-4 text-sm font-medium text-black-500">

                                            <!-- First pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder=""/>
                                                        <small id="rent-help">Your Current Password<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Enter Your New Password"/>
                                                        <small id="map-location-help">New Password<span class="text-red-400"> *</span></small>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="emailvalue" aria-describedby="location-help" placeholder="Confirm Your New Password"/>
                                                        <small id="location-help">Confirm Password<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showChangePasswordCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Change Password</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
const showCard = ref(false);
const showEditCard = ref(false);
const showChangePasswordCard = ref(false);
const address = ref();
const pincode = ref();
const occupation = ref();
const birthday = ref();
const id_proof = ref();

const selectedGender = ref();
const genders = ref([
    { name: 'Male', code: 'male' },
    { name: 'Female', code: 'female' },
    { name: 'Trans', code: 'trans' },
    { name: 'Prefer Not to Say', code: 'prefer_not_to_say' }
]);

const selectedMarital = ref();
const maritalstatus = ref([
    { name: 'Unmarried', code: 'unmarried' },
    { name: 'Married', code: 'married' }
]);

onMounted(() => {
  const fixedSection = document.querySelector('.fixed');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    fixedSection.style.top = `${scrollY}px`;
  });
});
</script>

<style scoped>

/* Adjustments for small screens */
@media screen and (max-width: 640px) {
        .flex-col .mr-64 {
            margin-right: 0; /* Remove margin right for smaller screens */
        }
    }

    /* Adjustments for medium screens */
@media screen and (min-width: 641px) and (max-width: 1024px) {
        .flex-col .mr-64 {
            margin-right: 2rem; /* Adjust margin right for medium screens */
        }
    }

    /* Adjustments for large screens */
@media screen and (min-width: 1025px) {
        .flex-col .mr-64 {
            margin-right: 4rem; /* Adjust margin right for large screens */
        }
    }
</style>