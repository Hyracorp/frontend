<script setup lang="ts">
const toast=useToast()
const addPropertyForm = ref({
    title: '',
    description: '',
    price: 500,
    rentDays: 1,
    images:[],
    propertyType: 'residential',
    amenities: [],
    address: '',
    city: '',
    state: '',
    zip: '',
    location:'',
    locationCode: '',
    bhkNo:2,
    rules:[],
    mapLocation: {
        lat:0,
        longi:0
    }

    
})
const states=ref([
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
])
const bhkOptions=ref([
    {name:'1BHK',value:1},
    {name:'2BHK',value:2},
    {name:'3BHK',value:3},
    {name:'4BHK',value:4},
    {name:'5BHK+',value:5},
])
const defaultAmenities=ref([
    {name:'Wifi',checked:false,icon:'ph:wifi-high-bold'},
    {name:'Ac',checked:false,icon:'ph:wind'},
    {name:'parking',checked:false,icon:'ph:car'},
])
const propertyTypeCommercial=ref(false)
const device = useDevice()
// Image Upload

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = [ "Bytes","KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
}
// image upload end
async function submitForm(){
    
}
</script>
<template>
    <div class="">
        
<Stepper linear :orientation="device.isDesktop ? 'horizontal' : 'vertical'" class="min-w-sm w-full">
    <StepperPanel header="Property Type">
        <template #content="{ nextCallback }">
            <div class="flex justify-center items-center gap-3 flex-wrap">
                <Card :class="`w-full max-w-xs ${!propertyTypeCommercial ? 'outline outline-2' : 'outline-0'}`" @click="propertyTypeCommercial=false">
                    <template #content>
                        <Icon name="ph:house" class="text-3xl" />
                        <div class="">
                            Residential Property
                        </div>
                    </template>
                </Card>
                <Card :class="`w-full max-w-xs ${propertyTypeCommercial ? 'outline outline-2' : 'outline-0'}`" @click="propertyTypeCommercial=true">
                    <template #content>
                        <Icon name="ph:buildings" class="text-3xl" />
                        <div class="">
                            Commercial property
                        </div>
                    </template>
                </Card>
            </div>
            <div class="flex pt-4 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
            </div>
        </template>
    </StepperPanel>
    <StepperPanel header="Basic Details">
        <template #content="{ prevCallback, nextCallback }">
            <div class="w-full flex gap-3 flex-col">
                <div class="">
                    <label for="property title" class="block">Property Title</label>
                    <InputText v-model="addPropertyForm.title" placeholder="Enter a title" class="w-full" />
                </div>
                <div class="">
                    <label for="property rent" class="block">Expected Rent (Minimum)</label>
                    <InputNumber v-model="addPropertyForm.price" inputId="integeronly" class="w-full" :min="1" :max="100000"  />
                </div>
                <div class="">
                    <label for="property rent duration" class="block">Rent Duration (days 24hr)</label>
                    <InputNumber v-model="addPropertyForm.rentDays" inputId="integeronly" class="w-full" :min="1" :max="30"  />
                </div>
                <div class="">
                    <label for="property state" class="block">State</label>
                   <Dropdown v-model="addPropertyForm.state" :options="states" placeholder="Select State" class="w-full" />
                </div>
                <div class="">
                    <label for="property state" class="block">city</label>
                   <Dropdown v-model="addPropertyForm.city" :options="['kochi','kozhikode','trivandrum']" placeholder="Select City" class="w-full" />
                </div>
                <div class="">
                    <label for="property zipcode" class="block">zipcode</label>
                   <InputText v-model="addPropertyForm.zipcode" placeholder="Enter zipcode" class="w-full" />
                </div>
                <div v-if="!propertyTypeCommercial" class="" >
                    <label for="property state" class="block">BHK No</label>
                   <Dropdown v-model="addPropertyForm.bhkNo" :options="bhkOptions" optionLabel="name" placeholder="Select State" class="w-full" />
                </div>
            </div>
            <div class="flex pt-4 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                <Button label="Next" icon="pi pi-arrow-right"  @click="nextCallback" />
            </div>
        </template>
    </StepperPanel>
    <StepperPanel header="select images">
        <template #content="{ prevCallback, nextCallback }">
        <div class="w-full ">
            <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-2">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" >
                        <Icon name="ph:image" class="text-xl" />
                        </Button>
                        <Button @click="uploadEvent(uploadCallback)"  severity="success" :disabled="!files || files.length === 0">
                            <Icon name="ph:upload" class="text-xl" />
                        </Button>
                        <Button @click="clearCallback()"   severity="danger" :disabled="!files || files.length === 0">
                            <Icon name="ph:x" class="text-xl" />
                        </Button>
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-[20rem] h-4 w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
                        ><span class="whitespace-nowrap	">{{ totalSize }}B / 1Mb</span></ProgressBar
                    >
                </div>
            </template>
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div v-if="files.length > 0">
                    <h5>Pending</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-col border border-surface-300 dark:border-surface-700 items-center gap-3">
                            <div>
                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                            </div>
                            <span class="font-semibold">{{ file.name }}</span>
                            <div>{{ formatSize(file.size) }}</div>
                            <Badge value="Pending" severity="warning" />
                            <Button  @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" >
                            <Icon name="ph:x" class="text-xl" />
                            </Button>    
                        </div>
                    </div>
                </div>

                <div v-if="uploadedFiles.length > 0">
                    <h5>Completed</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-col border border-surface-300 dark:border-surface-700 items-center gap-3">
                            <div>
                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                            </div>
                            <span class="font-semibold">{{ file.name }}</span>
                            <div>{{ formatSize(file.size) }}</div>
                            <Badge value="Completed" class="mt-3" severity="success" />
                            <Button @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" >
                            <Icon name="ph:x" class="text-xl" />
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex items-center justify-center flex-col">
                    <i class="pi pi-cloud-upload border-2 rounded-full p-5 text-8xl text-surface-400 dark:text-surface-600 border-surface-400 dark:border-surface-600" />
                    <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
        </div>
            <div class="flex pt-4 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                <Button label="Next" icon="pi pi-arrow-right"  @click="nextCallback" />
                
            </div>
        </template>
    </StepperPanel>
    <StepperPanel header="select amenities">
        <template #content="{ prevCallback }">
        <div class="w-full ">
            <div v-for="amenity,index in defaultAmenities" :key="index" class="w-72 flex items-center gap-3">
                <Checkbox v-model="amenity.checked" :name="amenity.name" :binary="true" />
                <Icon :name="amenity.icon" class="text-3xl" />
                <div class="capitalize">
                    {{ amenity.name }}
                </div>
            </div>
        </div>
            <div class="flex pt-4 justify-between">

                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                <Button label="Submit" @click="submitForm" />
            </div>
        </template>
    </StepperPanel>
</Stepper>
    </div>
</template>