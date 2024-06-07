<template>
    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-[24%] p-5 overflow-y-auto h-full scrollbar-hidden md:overflow-visible md:h-auto md:scrollbar-auto">
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-xl' }">
                    <template #title>
                        <div class="relative rounded-lg overflow-hidden justify-center items-center text-center">
                            <Image class="rounded-2xl" src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                            <Button type="submit" @click="showProfileEditCard = !showProfileEditCard" rounded aria-label="Filter" class="absolute bottom-2 right-2 transform translate-x-3/3 -translate-y-3/3">
                                <Icon name="bx:bxs-pencil" class="w-6 h-6"/>
                            </Button>
                        </div>
                        <div v-if="showProfileEditCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="mb-4">
                                            <h2 class="text-lg font-bold">Add/Change Profile Picture</h2>
                                        </div>
                                        <div class="mt-4 text-sm font-medium text-black-500">
                                            <!-- Fifth pair of inputs -->
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <div class="hidden sm:flex justify-between">
                                                            <div class="w-full">
                                                                <div class="flex flex-col gap-2">
                                                                    <InputText v-model="photoValue1" placeholder="Upload Profile Picture"/>
                                                                    <small id="property-spec-help">Upload Profile Picture<span class="text-red-400"> *</span></small>
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
                                                                    <InputText v-model="photoValue1" placeholder="Upload Profile Picture"/>
                                                                    <small id="property-spec-help">Upload Profile Picture<span class="text-red-400"> *</span></small>
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

                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showProfileEditCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Save Changes</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <h3 class="mt-3" >Your Name</h3>
                            <p class="text-sm font-medium text-gray-500">Landlord Profile</p>
                        </div>

                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="scrollToTarget('profileDivision')" class="flex items-center" outlined >
                                <Icon name="material-symbols:add-home-work" class="ml-1 mr-1 w-6 h-6"/>
                                    Listed Properties
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button type="submit" @click="showLoginDetails = !showLoginDetails" class="flex items-center" outlined >
                                <Icon name="ic:baseline-log-in" class="ml-1 mr-1 w-6 h-6"/>
                                    Login Details
                            </Button>
                            <div v-if="showLoginDetails" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <Card id="loginDivision" class="mt-10" :pt="{ 'root': 'shadow-xl' }">
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
                                                                        <InputText id="map-location" disabled v-model="mapValue" aria-describedby="map-location-help" placeholder="Your Name"/>
                                                                            <small id="map-location-help">Full Name<span class="text-red-400"> *</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <div class="flex flex-col gap-2">
                                                                            <InputText id="location" disabled v-model="emailvalue" aria-describedby="location-help" placeholder="youremail@gmail.com"/>
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
                                                            <Button @click="showLoginDetails = false" class="mr-4">Cancel</Button>
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
                        </div>
                    </div>
                </div>
                        <!-- <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="scrollToTarget('propertiesDivision')" class="flex items-center" outlined >
                                <Icon name="material-symbols:list-alt" class="ml-1 mr-1 w-6 h-6"/>
                                    Listed Properties
                             </Button>
                        </div>
                        <div class="flex flex-col gap-2 mt-4">
                            <Button label="Submit" @click="scrollToTarget('reportsDivision')" class="flex items-center" outlined >
                                <Icon name="tabler:report" class="ml-1 mr-1 w-6 h-6"/>
                                    Report
                             </Button>
                        </div> -->
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
            <Card class="w-full" :pt="{ 'root': 'shadow-xl' }">
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
            <div>
                <br/>
            </div>
            <Card class="w-full" :pt="{ 'root': 'shadow-xl' }">
                <template #title class="text-gray-500 font-light">
                    <div class="card">
                        <MeterGroup :value="valueTop" labelPosition="start">
                            <template #label="{ value }">
                                <div class="flex flex-wrap gap-3">
                                    <template v-for="val of value" :key="i">
                                        <Card class="flex-1">
                                            <template #content>
                                                <div class="flex justify-between gap-5">
                                                    <div class="flex flex-col gap-1">
                                                        <span class="text-secondary text-sm">{{ val.label }}</span>
                                                        <span class="font-bold text-lg">{{ val.value }}%</span>
                                                    </div>
                                                    <span class="w-[2rem] h-[2rem] rounded-full inline-flex justify-center items-center text-center" :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                                                        <i :class="val.icon" />
                                                    </span>
                                                </div>
                                            </template>
                                        </Card>
                                    </template>
                                </div>
                            </template>
                            <template #meter="slotProps">
                                <span :class="slotProps.class" :style="{ background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`, width: slotProps.size }" />
                            </template>
                            <template #start="{ totalPercent }">
                                <div class="flex justify-between mt-3 mb-2 relative">
                                    <span>Your Properties</span>
                                    <!-- <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                                    <span class="font-medium">1TB</span> -->
                                </div>
                            </template>
                            <!-- <template #end>
                                <div class="flex justify-between mt-3">
                                    <Button label="Manage Storage" outlined size="small" />
                                    <Button label="Update Plan" size="small" />
                                </div>
                            </template> -->
                        </MeterGroup>
                    </div>
                </template>
            </Card>

            <!-- Profile -->
            <Card id="profileDivision" class="mt-10" :pt="{ 'root': 'shadow-xl' }">
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            Listed Properties
                            <p class="text-sm font-medium text-gray-500">See below for your total listed properties </p>
                        </div>

                        <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="() => {
                                console.log('form submitted');
                            }">
                        </form>
                            <div class="flex flex-col gap-2 mt-4">
                                <Button type="submit" @click="showCardOptions = !showCardOptions" class="flex items-center" outlined >
                                    <Icon name="material-symbols:add-box-rounded" class="ml-1 mr-1 w-6 h-6"/>
                                        Add
                                </Button>
                            </div>
                                <div v-if="showCardOptions" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                    <div class="flex justify-center items-center min-h-screen">
                                        <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                            <div class="flex justify-center items-center gap-3">
                                                <label class="flex items-center gap-2">
                                                    <input type="radio" value="residential" @click="showCard = !showCard" v-model="selectedOption" @change="handleRadioChange">
                                                    Residential
                                                </label>
                                                <label class="flex items-center gap-2">
                                                    <input type="radio" value="commercial" @click="showCardCommercial = !showCardCommercial" v-model="selectedOption" @change="handleRadioChange">
                                                    Commercial
                                                </label>
                                            </div>
                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showCardOptions = false" class="mr-4">Cancel</Button>
                                        </div>   
                                        </div>
                                    </div>
                                </div>
                            <div v-if="showCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="text-center mb-4">
                                            <h3 class="text-lg font-bold">List Your Residential Property</h3>
                                            <p class="text-sm text-gray-500">Add your residential property so that we can show it to our users</p>
                                        </div>
                                        <div class="mt-4">
                                            <!-- First pair of inputs -->
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="relative card flex justify-center">
                                                    <div class="flex flex-col gap-2 w-full">
                                                        <Dropdown v-model="selectedSpec" editable :options="specifications" showClear optionLabel="name" placeholder="Select property specification" class="w-full" />
                                                        <small id="location-help">Property Specification<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="value" aria-describedby="location-help" placeholder="Your property location"/>
                                                        <small id="location-help">Area<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder="Rent"/>
                                                        <small id="rent-help">Price per month<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Map location"/>
                                                        <small id="map-location-help">Exact map location</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Line -->
                                            <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                            <!-- Amenities -->
                                            <div class="mb-4">
                                                <h3 class="text-lg font-bold mt-3">Amenities</h3>
                                                <p class="text-sm text-gray-500">Select all that apply</p>
                                            </div>
                                                <!-- Amenities Grid -->
                                                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- WiFi -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="wifi" inputId="wifi" name="wifi" value="wifi" />
                                                        <label for="wifi" class="ml-2">WiFi</label>
                                                        <Icon name="ph:wifi-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Power -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="power" inputId="power" name="power" value="power" />
                                                        <label for="power" class="ml-2">Power</label>
                                                        <Icon name="ph:power-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Water -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="water" inputId="water" name="water" value="water" />
                                                        <label for="water" class="ml-2">Water</label>
                                                        <Icon name="ph:drop-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Parking -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="parking" inputId="parking" name="parking" value="parking" />
                                                        <label for="parking" class="ml-2">Parking</label>
                                                        <Icon name="ph:car-profile-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>
                                                <!-- Row 2 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Elevator -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="elevator" inputId="elevator" name="elevator" value="elevator" />
                                                        <label for="elevator" class="ml-2">Elevator</label>
                                                        <Icon name="ph:elevator-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- AC -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="ac" inputId="ac" name="ac" value="ac" />
                                                        <label for="ac" class="ml-2">AC</label>
                                                        <Icon name="ph:snowflake-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Paper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="paper" inputId="paper" name="paper" value="paper" />
                                                        <label for="paper" class="ml-2">Paper</label>
                                                        <Icon name="ph:newspaper-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Laundry -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="laundry" inputId="laundry" name="laundry" value="laundry" />
                                                        <label for="laundry" class="ml-2">Laundry</label>
                                                        <Icon name="ph:washing-machine-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 3 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Pool -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="pool" inputId="pool" name="pool" value="pool" />
                                                        <label for="pool" class="ml-2">Pool</label>
                                                        <Icon name="ph:person-simple-swim-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- CCTV -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="cctv" inputId="cctv" name="cctv" value="cctv" />
                                                        <label for="cctv" class="ml-2">CCTV</label>
                                                        <Icon name="ph:security-camera-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Extinguisher -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="extinguisher" inputId="extinguisher" name="extinguisher" value="extinguisher" />
                                                        <label for="extinguisher" class="ml-2 text-sm">Extinguisher</label>
                                                        <Icon name="ph:fire-extinguisher-bold" class="ml-1 w-6 h-6" />
                                                    </div>
                                                    <!-- Alarm -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="alarm" inputId="alarm" name="alarm" value="alarm" />
                                                        <label for="alarm" class="ml-2">Alarm</label>
                                                        <Icon name="ph:speaker-simple-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 4 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Gym -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="gym" inputId="gym" name="gym" value="gym" />
                                                        <label for="gym" class="ml-2">Gym</label>
                                                        <Icon name="ph:person-arms-spread-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- First-Aid -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="firstaid" inputId="firstaid" name="firstaid" value="firstaid" />
                                                        <label for="firstaid" class="ml-2">First-Aid</label>
                                                        <Icon name="ph:bandaids-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Security -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="security" inputId="security" name="security" value="security" />
                                                        <label for="security" class="ml-2">Security</label>
                                                        <Icon name="material-symbols:security" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Storage -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="storage" inputId="storage" name="storage" value="storage" />
                                                        <label for="storage" class="ml-2">Storage</label>
                                                        <Icon name="streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 5 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Restaurant -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="restaurant" inputId="restaurant" name="restaurant" value="restaurant" />
                                                        <label for="restaurant" class="ml-2 text-sm">Restaurant</label>
                                                        <Icon name="ion:restaurant-outline" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Furnished -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="furnished" inputId="furnished" name="furnished" value="furnished" />
                                                        <label for="furnished" class="ml-2">Furnished</label>
                                                        <Icon name="streamline:shopping-catergories-sofa-decoration-furniture-interior-design-couch-sofa-decorate" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Hospital -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="hospital" inputId="hospital" name="hospital" value="hospital" />
                                                        <label for="hospital" class="ml-2">Hospital</label>
                                                        <Icon name="mdi:hospital-building" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Helper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="helper" inputId="helper" name="helper" value="helper" />
                                                        <label for="helper" class="ml-2">Helper</label>
                                                        <Icon name="mdi:human-dolly" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for larger screens) -->
                                                <div class="hidden sm:block mt-4 flex justify-between">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for larger screens) -->
                                                <div class="hidden sm:block">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4 flex justify-between">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="ml-4 items-center">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for smaller screens) -->
                                                <div class="block sm:hidden mt-4">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for smaller screens) -->
                                                <div class="block sm:hidden">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="mt-2 flex justify-end">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <!-- Line -->
                                        <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                        <!-- Photo Upload -->
                                        <div class="mb-4">
                                            <h3 class="text-lg font-bold mt-3">Photos</h3>
                                            <p class="text-sm text-gray-500">Add a minimum of 3 to a maximum of 05 photos</p>
                                        </div>
                                        
                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
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

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 02<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 02<span class="text-red-400"> *</span></small>
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

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 03<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 03<span class="text-red-400"> *</span></small>
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

                                        <!-- Add Photo (for larger screens) -->
                                        <div class="hidden sm:block mt-4 flex justify-between">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for larger screens) -->
                                        <div class="hidden sm:block">
                                            <div v-for="(input, index) in photoInputs" :key="index" class="mt-4 flex justify-between">
                                                <div class="w-full">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="ml-4 items-center">
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
                                                <div class="ml-4 items-center">
                                                    <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                        <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Add Photo (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div v-for="(input, index) in photoInputs" :key="index" >
                                                <div class="w-full mt-4">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="flex items-center mt-0 justify-end">
                                                    <div class="flex items-center text-white mr-2">
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
                                                    <div class="flex items-center text-white">
                                                        <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                            <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                                <!-- Line -->
                                                <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                                <!-- Other Info Upload -->
                                                <div class="mb-4">
                                                    <h3 class="text-lg font-bold mt-3">Other Information</h3>
                                                    <p class="text-sm text-gray-500">Select only one that best suits.</p>
                                                </div>
                                                <div class="mt-4">
                                                    <div class="flex items-center">
                                                        <input type="radio" id="maleOnly" v-model="selectedOption" value="maleOnly" class="mr-2">
                                                        <label for="maleOnly" class="ml-2">I am renting this only to Bachelors (male)</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="femaleOnly" v-model="selectedOption" value="femaleOnly" class="mr-2">
                                                        <label for="femaleOnly" class="ml-2">I am renting this only to Bachelors (female)</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="familyOnly" v-model="selectedOption" value="familyOnly" class="mr-2">
                                                        <label for="familyOnly" class="ml-2">I am renting this only to Families</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="professionalsOnly" v-model="selectedOption" value="professionalsOnly" class="mr-2">
                                                        <label for="professionalsOnly" class="ml-2">I am renting this only to Working Professionals</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="anyOne" v-model="selectedOption" value="anyOne" class="mr-2">
                                                        <label for="anyOne" class="ml-2">I am renting this to anyone who is interested</label>
                                                    </div>
                                                </div>


                                                <!-- Line -->
                                                <hr class="w-full mt-8 border-t border-gray-300">

                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showCard = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Add Property</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="showCardCommercial" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                <div class="flex justify-center items-center min-h-screen">
                                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                        <div class="text-center mb-4">
                                            <h3 class="text-lg font-bold">List Your Commercial Property</h3>
                                            <p class="text-sm text-gray-500">Add your commercial property so that we can show it to our users</p>
                                        </div>
                                        <div class="mt-4">
                                            <!-- First pair of inputs -->
                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div class="relative card flex justify-center">
                                                    <div class="flex flex-col gap-2 w-full">
                                                        <Dropdown v-model="selectedSqft" editable :options="sqfts" showClear optionLabel="name" placeholder="Select property's approximate area (sqft)" class="w-full" />
                                                        <small id="location-help">Property's Total Area ( Approximately )<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="location" v-model="value" aria-describedby="location-help" placeholder="Your property location"/>
                                                        <small id="location-help">Area<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Second pair of inputs -->
                                            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" placeholder="Rent"/>
                                                        <small id="rent-help">Price per month<span class="text-red-400"> *</span></small>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="flex flex-col gap-2">
                                                        <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" placeholder="Map location"/>
                                                        <small id="map-location-help">Exact map location</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Line -->
                                            <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                            <!-- Amenities -->
                                            <div class="mb-4">
                                                <h3 class="text-lg font-bold mt-3">Amenities</h3>
                                                <p class="text-sm text-gray-500">Select all that apply</p>
                                            </div>
                                                <!-- Amenities Grid -->
                                                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- WiFi -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="wifi" inputId="wifi" name="wifi" value="wifi" />
                                                        <label for="wifi" class="ml-2">WiFi</label>
                                                        <Icon name="ph:wifi-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Power -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="power" inputId="power" name="power" value="power" />
                                                        <label for="power" class="ml-2">Power</label>
                                                        <Icon name="ph:power-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Water -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="water" inputId="water" name="water" value="water" />
                                                        <label for="water" class="ml-2">Water</label>
                                                        <Icon name="ph:drop-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Parking -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="parking" inputId="parking" name="parking" value="parking" />
                                                        <label for="parking" class="ml-2">Parking</label>
                                                        <Icon name="ph:car-profile-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>
                                                <!-- Row 2 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Elevator -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="elevator" inputId="elevator" name="elevator" value="elevator" />
                                                        <label for="elevator" class="ml-2">Elevator</label>
                                                        <Icon name="ph:elevator-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- AC -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="ac" inputId="ac" name="ac" value="ac" />
                                                        <label for="ac" class="ml-2">AC</label>
                                                        <Icon name="ph:snowflake-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Paper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="paper" inputId="paper" name="paper" value="paper" />
                                                        <label for="paper" class="ml-2">Paper</label>
                                                        <Icon name="ph:newspaper-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Laundry -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="laundry" inputId="laundry" name="laundry" value="laundry" />
                                                        <label for="laundry" class="ml-2">Laundry</label>
                                                        <Icon name="ph:washing-machine-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 3 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Pool -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="pool" inputId="pool" name="pool" value="pool" />
                                                        <label for="pool" class="ml-2">Pool</label>
                                                        <Icon name="ph:person-simple-swim-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- CCTV -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="cctv" inputId="cctv" name="cctv" value="cctv" />
                                                        <label for="cctv" class="ml-2">CCTV</label>
                                                        <Icon name="ph:security-camera-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Extinguisher -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="extinguisher" inputId="extinguisher" name="extinguisher" value="extinguisher" />
                                                        <label for="extinguisher" class="ml-2 text-sm">Extinguisher</label>
                                                        <Icon name="ph:fire-extinguisher-bold" class="ml-1 w-6 h-6" />
                                                    </div>
                                                    <!-- Alarm -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="alarm" inputId="alarm" name="alarm" value="alarm" />
                                                        <label for="alarm" class="ml-2">Alarm</label>
                                                        <Icon name="ph:speaker-simple-high-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 4 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Gym -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="gym" inputId="gym" name="gym" value="gym" />
                                                        <label for="gym" class="ml-2">Gym</label>
                                                        <Icon name="ph:person-arms-spread-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- First-Aid -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="firstaid" inputId="firstaid" name="firstaid" value="firstaid" />
                                                        <label for="firstaid" class="ml-2">First-Aid</label>
                                                        <Icon name="ph:bandaids-bold" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Security -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="security" inputId="security" name="security" value="security" />
                                                        <label for="security" class="ml-2">Security</label>
                                                        <Icon name="material-symbols:security" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Storage -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="storage" inputId="storage" name="storage" value="storage" />
                                                        <label for="storage" class="ml-2">Storage</label>
                                                        <Icon name="streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Row 5 -->
                                                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <!-- Restaurant -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="restaurant" inputId="restaurant" name="restaurant" value="restaurant" />
                                                        <label for="restaurant" class="ml-2 text-sm">Restaurant</label>
                                                        <Icon name="ion:restaurant-outline" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Furnished -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="furnished" inputId="furnished" name="furnished" value="furnished" />
                                                        <label for="furnished" class="ml-2">Furnished</label>
                                                        <Icon name="streamline:shopping-catergories-sofa-decoration-furniture-interior-design-couch-sofa-decorate" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Hospital -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="hospital" inputId="hospital" name="hospital" value="hospital" />
                                                        <label for="hospital" class="ml-2">Hospital</label>
                                                        <Icon name="mdi:hospital-building" class="ml-2 w-6 h-6" />
                                                    </div>
                                                    <!-- Helper -->
                                                    <div class="flex items-center">
                                                        <Checkbox v-model="helper" inputId="helper" name="helper" value="helper" />
                                                        <label for="helper" class="ml-2">Helper</label>
                                                        <Icon name="mdi:human-dolly" class="ml-2 w-6 h-6" />
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for larger screens) -->
                                                <div class="hidden sm:block mt-4 flex justify-between">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for larger screens) -->
                                                <div class="hidden sm:block">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4 flex justify-between">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="ml-4 items-center">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Add Aminity (for smaller screens) -->
                                                <div class="block sm:hidden mt-4">
                                                    <div class="w-[25%] flex items-center">
                                                        <div class="flex flex-col gap-2">
                                                            <Button label="Submit" @click="addInputField" class="flex items-center">
                                                                <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                                Add
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Aminity Inputs (for smaller screens) -->
                                                <div class="block sm:hidden">
                                                    <div v-for="(input, index) in aminityInputs" :key="index" class="mt-4">
                                                        <div class="w-full">
                                                            <div class="flex flex-col gap-2">
                                                                <InputText v-model="input.value" :id="'aminity_' + index" :aria-describedby="'aminity-help_' + index" placeholder="Enter amenity"/>
                                                                <small :id="'aminity-help_' + index">Additional Amenity<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                        <div class="mt-2 flex justify-end">
                                                            <Button label="Submit" @click="removeInputField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                                <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <!-- Line -->
                                        <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                        <!-- Photo Upload -->
                                        <div class="mb-4">
                                            <h3 class="text-lg font-bold mt-3">Photos</h3>
                                            <p class="text-sm text-gray-500">Add a minimum of 3 to a maximum of 5 photos</p>
                                        </div>
                                        
                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture from outside<span class="text-red-400"> *</span></small>
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

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 02<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 02<span class="text-red-400"> *</span></small>
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

                                        <!-- Photo Upload (for larger screens) -->
                                        <div class="hidden sm:flex mt-4 justify-between">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 03<span class="text-red-400"> *</span></small>
                                                </div>
                                            </div>
                                            <div class="ml-4 items-center">
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

                                        <!-- Photo Upload (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-full">
                                                <div class="flex flex-col gap-2">
                                                    <InputText v-model="photoValue1" placeholder=""/>
                                                    <small id="property-spec-help">Picture 03<span class="text-red-400"> *</span></small>
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

                                        <!-- Add Photo (for larger screens) -->
                                        <div class="hidden sm:block mt-4 flex justify-between">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for larger screens) -->
                                        <div class="hidden sm:block">
                                            <div v-for="(input, index) in photoInputs" :key="index" class="mt-4 flex justify-between">
                                                <div class="w-full">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="ml-4 items-center">
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
                                                <div class="ml-4 items-center">
                                                    <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                        <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Add Photo (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div class="w-[25%] flex items-center">
                                                <div class="flex flex-col gap-2">
                                                    <Button label="Submit" @click="addPhotoField" class="flex items-center">
                                                        <Icon name="material-symbols:add" class="ml-1 mr-1 w-6 h-6"/>
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Photo Inputs (for smaller screens) -->
                                        <div class="block sm:hidden mt-4">
                                            <div v-for="(input, index) in photoInputs" :key="index" >
                                                <div class="w-full mt-4">
                                                    <div class="flex flex-col gap-2">
                                                        <InputText v-model="input.value" :id="'photo_' + index" :aria-describedby="'photo-help_' + index" placeholder="Add Photo"/>
                                                        <small :id="'photo-help_' + index">Add More Photo</small>
                                                    </div>
                                                </div>
                                                <div class="flex items-center mt-0 justify-end">
                                                    <div class="flex items-center text-white mr-2">
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
                                                    <div class="flex items-center text-white">
                                                        <Button label="Submit" @click="removePhotoField(index)" class="flex items-center bg-red-500 text-white hover:bg-red-600">
                                                            <Icon name="material-symbols:delete-outline" class="ml-1 mr-1 w-6 h-6"/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                                <!-- Line -->
                                                <hr class="w-full mt-8 mb-5 border-t border-gray-300">

                                                <!-- Other Info Upload -->
                                                <div class="mb-4">
                                                    <h3 class="text-lg font-bold mt-3">Other Information</h3>
                                                    <p class="text-sm text-gray-500">Select only one that best suits.</p>
                                                </div>
                                                <div class="mt-4">
                                                    <div class="flex items-center">
                                                        <input type="radio" id="manufactureOnly" v-model="selectedOption" value="manufactureOnly" class="mr-2">
                                                        <label for="manufactureOnly" class="ml-2">I am renting this only for manufacturing any products</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="anyOfficeOnly" v-model="selectedOption" value="anyOfficeOnly" class="mr-2">
                                                        <label for="anyOfficeOnly" class="ml-2">I am renting this only as an office ( Any Companies )</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="itOfficeOnly" v-model="selectedOption" value="itOfficeOnly" class="mr-2">
                                                        <label for="itOfficeOnly" class="ml-2">I am renting this only as an office ( IT Companies )</label>
                                                    </div>
                                                    <div class="flex items-center mt-2">
                                                        <input type="radio" id="anyOne" v-model="selectedOption" value="anyOne" class="mr-2">
                                                        <label for="anyOne" class="ml-2">I am renting this to anyone who is interested</label>
                                                    </div>
                                                </div>


                                                <!-- Line -->
                                                <hr class="w-full mt-8 border-t border-gray-300">

                                        <div class="mt-6 flex justify-end">
                                            <Button @click="showCardCommercial = false" class="mr-4">Cancel</Button>
                                            <Button @click="">Add Property</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </template>
                <template #content class="flex flex-col">
                    <div class="card">
                        <DataView :value="products" :sortOrder="sortOrder" :sortField="sortField">
                            <template #header>
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Rent" @change="onSortChange($event)" />
                            </template>
                            <template #list="slotProps">
                                <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-1">
                                        <div class="flex flex-col sm:flex-row md:flex-row p-4 gap-3 border-t border-gray-200 dark:border-gray-700">
                                            <div class="w-full sm:w-1/4 md:w-1/5 relative">
                                                <img class="block mx-auto rounded-md w-full" :src="item.image" :alt="item.name" />
                                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute left-4 top-4"></Tag>
                                            </div>
                                            <div class="flex flex-col sm:flex-row md:flex-row justify-between sm:items-center md:items-start flex-1 gap-4">
                                                <div class="flex flex-col md:flex-row justify-between items-start gap-2">
                                                    <div>
                                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                        <div class="text-lg font-medium text-surface-700 dark:text-surface-0/80 mt-2">{{ item.name }}</div>
                                                        <a type="submit" @click="showRoommateDetailsCard = !showRoommateDetailsCard" class="items-end justify-end"><span class="font-medium text-secondary text-sm">Occupant: <span class="text-blue-500">{{ item.description }}</span></span></a><br>
                                                        <div v-if="showRoommateDetailsCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                                            <div class="flex justify-center items-center min-h-screen">
                                                                <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                                                    <div class="mb-4">
                                                                        <h2 class="text-lg font-bold">Tenant Details</h2>
                                                                    </div>
                                                                    <div class="mt-4 text-sm font-medium text-black-500">
                                                                        
                                                                        <!-- First pair of inputs -->
                                                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div class="flex flex-col gap-2">
                                                                                    <InputText id="map-location" v-model="mapValue" aria-describedby="map-location-help" disabled placeholder="Tenant's Name"/>
                                                                                    <small id="map-location-help">Tenant's Full Name<span class="text-red-400"> *</span></small>
                                                                            </div>
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="rentValue" aria-describedby="rent-help" disabled placeholder="Tenant's Phone number"/>
                                                                                    <small id="rent-help">Tenant's Phone<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Second pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="relative card flex justify-center">
                                                                                    <div class="flex flex-col gap-2 w-full">
                                                                                        <Dropdown v-model="selectedGender" editable :options="genders" disabled showClear optionLabel="name" placeholder="Tenant's Gender" class="w-full" />
                                                                                        <small id="location-help">Tenant's Gender<span class="text-red-400"> *</span></small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div class="relative card flex justify-center">
                                                                                    <div class="flex flex-col gap-2 w-full">
                                                                                        <Dropdown v-model="selectedMarital" editable :options="maritalstatus" disabled showClear optionLabel="name" placeholder="Tenant's Marital Status" class="w-full" />
                                                                                        <small id="location-help">Tenant's Marital Status<span class="text-red-400"> *</span></small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Third pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="address" aria-describedby="rent-help" disabled placeholder="Tenant's Address"/>
                                                                                    <small id="rent-help">Tenant's Permanant Address<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <InputText id="rent" v-model="pincode" aria-describedby="rent-help" disabled placeholder="Tenant's Pincode"/>
                                                                                    <small id="rent-help">Tenant's Pincode<span class="text-red-400"> *</span></small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- Fifth pair of inputs -->
                                                                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <div class="flex flex-col gap-2">
                                                                                    <div class="hidden sm:flex justify-between">
                                                                                        <div class="w-full">
                                                                                            <div class="flex flex-col gap-2">
                                                                                                <div class="relative rounded-lg overflow-hidden justify-center items-center text-center">
                                                                                                <Image class="rounded-2xl" src="https://www.paisabazaar.com/wp-content/uploads/2018/06/Aadhaar-helps-the-government-and-the-citizens.jpg" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                                                                                            </div>
                                                                                            <small id="property-spec-help">Tenant's ID Proof<span class="text-red-400"> *</span></small>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="ml-4 items-center">
                                                                                            
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- For small screens -->
                                                                                    <div class="block sm:hidden mt-4">
                                                                                        <div class="w-full">
                                                                                            <div class="flex flex-col gap-2">
                                                                                                <div class="relative rounded-lg overflow-hidden justify-center items-center text-center">
                                                                                                <Image class="rounded-2xl" src="https://www.paisabazaar.com/wp-content/uploads/2018/06/Aadhaar-helps-the-government-and-the-citizens.jpg" alt="Image" style="max-width: 50%; max-height: 50%;"/>
                                                                                            </div>
                                                                                            <small id="property-spec-help">Tenant's ID Proof<span class="text-red-400"> *</span></small>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    <div class="mt-6 flex justify-end">
                                                                        <Button @click="showRoommateDetailsCard = false" class="mr-4">Cancel</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <span class="font-medium text-secondary text-sm">Tenure Ends in : <span class="text-red-400">{{ item.rating }}</span> Days</span>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col sm:items-end gap-5">
                                                    <span class="text-xl font-semibold text-surface-700 dark:text-surface-0/80">₹{{ item.price }}/Month</span>
                                                    <div class="flex flex-row-reverse sm:flex-row gap-2">
                                                        <Button label="View More" :disabled="item.inventoryStatus === 'SOLD'" class="flex-auto sm:flex-initial whitespace-nowrap"></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </DataView>
                    </div>
                </template>
            </Card>


            <!-- Report -->
            <!-- <Card id="reportsDivision" class="mt-10" :pt="{ 'root': 'shadow-xl' }">
                <div class="line"></div>
                <template #title class="text-gray-500 flex flex-col">
                    <div class="flex items-center justify-between">
                        <div>
                            View Your Reports
                            <p class="text-sm font-medium text-gray-500">View/Print your reports</p>
                        </div>
                    </div>
                </template >
                
                <template #content class="flex flex-col"> -->

                    <!-- First card -->
                    <!-- <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 1</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Report</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300"> -->

                    <!-- Second card -->
                    <!-- <div class="flex items-start justify-between mr-64">
                        <h6 class="text-gray-500">Property 2</h6>
                        <div class="flex flex-1 items-end justify-end mr-64">
                            <a href="" class="text-blue-600 items-end justify-end">View Report</a>
                        </div>
                    </div>
                    <hr class="w-full mt-2 mb-5 border-t border-gray-300">
                </template>
            </Card> -->
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from "vue";

const value = ref(30);
const showCard = ref(false);
const showEditCard = ref(false);
const showChangePasswordCard = ref(false);
const showProfileEditCard = ref(false);
const showRoommateDetailsCard = ref(false);
const showCardOptions = ref(false);
const showCardCommercial = ref(false);
const showLoginDetails = ref(false);

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

const selectedSpec = ref();
const specifications = ref([
    { name: '1 BHK', code: 'one_bhk' },
    { name: '2 BHK', code: 'two_bhk' },
    { name: '3 BHK', code: 'three_bhk' },
    { name: '3+ BHK', code: 'three_plus_bhk' }
]);

const selectedSqft = ref();
const sqfts = ref([
    { name: 'Below 100 sqft', code: 'B100' },
    { name: 'Below 200 sqft', code: 'B200' },
    { name: 'Below 300 sqft', code: 'B300' },
    { name: 'Below 400 sqft', code: 'B400' },
    { name: 'Below 500 sqft', code: 'B500' },
    { name: 'Below 600 sqft', code: 'B600' },
    { name: 'Below 700 sqft', code: 'B700' },
    { name: 'Below 800 sqft', code: 'B800' },
    { name: 'Below 900 sqft', code: 'B900' },
    { name: 'Below 1000 sqft', code: 'B1000' },
    { name: 'Below 1500 sqft', code: 'B1500' },
    { name: 'Below 2000 sqft', code: 'B2000' },
    { name: 'Below 2500 sqft', code: 'B2500' },
    { name: 'Below 3000 sqft', code: 'B3000' },
    { name: 'Below 3500 sqft', code: 'B3500' },
    { name: 'Below 4000 sqft', code: 'B4000' }
]);

const rentValue = ref(null);
const mapValue = ref(null);
const photoValue1 = ref(null);
const aminityInputs = ref([]);
const photoInputs = ref([]);

const wifi = ref(null);
const power = ref(null);
const water = ref(null);
const parking = ref(null);
const elevator = ref(null);
const ac = ref(null);
const paper = ref(null);
const laundry = ref(null);
const pool = ref(null);
const cctv = ref(null);
const extinguisher = ref(null);
const alarm = ref(null);
const gym = ref(null);
const firstaid = ref(null);
const security = ref(null);
const storage = ref(null);
const restaurant = ref(null);
const furnished = ref(null);
const hospital = ref(null);
const helper = ref(null);
const selectedOption = ref(null);

const addInputField = () => {
  aminityInputs.value.push({ value: '' });
};

const removeInputField = (index) => {
  aminityInputs.value.splice(index, 1);
};

const addPhotoField = () => {
  photoInputs.value.push({ value: '' });
};

const removePhotoField = (index) => {
  photoInputs.value.splice(index, 1);
};

const searchForm = ref({
  location: '',
  bhkNo: [{ name: '2BHK', value: 2 }]
});

// BHK OPTIONS
const bhkOptions = ref([
  { name: '1BHK', value: 1 },
  { name: '2BHK', value: 2 },
  { name: '3BHK', value: 3 },
  { name: '3BHK+', value: 0 }
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

const products = ref([
{
    id: '1000',
    code: 'f230fh0g3',
    name: '6/756/A , Skyline Apartments, Kochi',
    description: 'Anoop K M',
    image: 'data:image/jpeg;base64,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',
    price: 15000,
    category: '3 BHK Apartment',
    quantity: 24,
    inventoryStatus: 'OCCUPIED',
    rating: 302
},
{
    id: '1001',
    code: 'f240fh0g4',
    name: '554 B , Confident Apartments, Kochi',
    description: 'Nil',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/023/308/330/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg',
    price: 25000,
    category: '5 BHK Apartment',
    quantity: 24,
    inventoryStatus: 'VACANT',
    rating: 0
},
{
    id: '1002',
    code: 'f250fh0g5',
    name: '786 C , Veegaland Apartments, Kochi',
    description: 'Abel Reji',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDzb37F3YlKKDtqmOhozY0hdotZaYbjadtQA&s',
    price: 10000,
    category: '2 BHK Apartment',
    quantity: 24,
    inventoryStatus: 'OCCUPIED',
    rating: 158
},
{
    id: '1003',
    code: 'f260fh0g6',
    name: 'New House , Panampally Nagar, Kochi',
    description: 'Harikrishnan C R',
    image: 'https://www.tennessean.com/gcdn/presto/2019/10/11/PNAS/adf1101a-0f8c-404f-9df3-5837bf387dfd-1_Exterior_House_Beautiful_Whole_Home_Concept_House_Castle_Homes_Photo_Reed_Brown_Photography.jpg?crop=5619,3161,x0,y104&width=3200&height=1801&format=pjpg&auto=webp',
    price: 35000,
    category: '5 BHK Apartment',
    quantity: 24,
    inventoryStatus: 'SOLD',
    rating: 0
}
]);
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    {label: 'Rent High to Low', value: '!price'},
    {label: 'Rent Low to High', value: 'price'},
]);
const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
const valueTop = ref([
    { label: 'Occupied', color1: '#34d399', color2: '#34d399', value: 50, icon: 'material-symbols-light:kid-star' },
    { label: 'Vacant', color1: '#60a5fa', color2: '#60a5fa', value: 25, icon: 'pi pi-inbox' },
    { label: 'Sold', color1: '#F87171', color2: '#F87171', value: 25, icon: 'pi pi-image' }
]);

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'OCCUPIED':
            return 'success';

        case 'VACANT':
            return 'warn';

        case 'SOLD':
            return 'danger';

        default:
            return null;
    }
};
</script>
<script>
    
export default {
        methods: {
            scrollToTarget(targetId) {
                // Get the target division by its ID
                const targetDivision = document.getElementById(targetId);
                if (targetDivision) {
                    // Scroll to the target division
                    targetDivision.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }
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

    .line {
    position: relative;
    top: 0;
    left: 0;
    border-radius: 0 5px 5px 0;
    width: 10px; /* Adjust width as needed */
    height: 50px; /* Ensure it spans the full height of the card */
    background-color: rgb(100, 99, 99); /* Adjust color as needed */
}
</style>