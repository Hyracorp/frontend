<template>
    <div class="flex">
        <div class="w-[24%] p-5 justify-center items-center">
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-2xl' }">
                    <template #title>
                        <div class="justify-center items-center text-center">
                            <Image class="rounded-lg" src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" />
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
        <div class="w-[74%] flex-1 p-5 items-center">
            <Card>
                <template #title class="text-gray-500 font-light"> Complete Your Profile</template>
                <template #content>
                    <div class="card">
                        <ProgressBar :value="40"> {{ value }}/100 </ProgressBar>
                    </div>
                </template>
            </Card>
            <Card class="mt-10">
                <template #title class="text-gray-500 font-light">Profile</template>
                <template #description>
                    <p class="text-sm font-medium text-gray-500">Complete basic info for better experience</p>
                </template> 
                <template #content>
                    <!-- <div class="card">
                        <ProgressBar :value="40">{{ value }}/100</ProgressBar>
                    </div> -->
                </template>
            </Card>

        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";

const value = ref(40);

</script>
