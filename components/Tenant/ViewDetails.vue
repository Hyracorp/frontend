<script setup lang="ts">

import { ref, onMounted, computed } from "vue";

const value = ref(30);
const showCard = ref(false);
const showEditCard = ref(false);
const showChangePasswordCard = ref(false);
const showProfileEditCard = ref(false);

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

const selectedTime = ref();
const times = ref([]);
for (let hour = 9; hour <= 16; hour++) {
  for (let minute of ['00', '30']) {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute;
    const time = `${formattedHour}:${formattedMinute}`;
    const amPm = hour < 12 ? 'am' : 'pm';
    const name = hour === 0 ? `12:${formattedMinute} ${amPm}` : `${(hour % 12) || 12}:${formattedMinute} ${amPm}`;
    times.value.push({ name, code: time });
  }
}


let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let nextMonth = new Date();
nextMonth.setMonth(month + 1);

const date = ref();
const minDate = ref(today);
const maxDate = ref(nextMonth);


const selectedMarital = ref();
const maritalstatus = ref([
    { name: 'Unmarried', code: 'unmarried' },
    { name: 'Married', code: 'married' }
]);


const wifi = ref(null);
const collectionData = ref([
    {
        id: 1,
        title: 'Luxury House in Dhaka',
        image: livingImage,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '80,000',
        location: 'Dhaka, Bangladesh'

    },

])

</script>
<script lang="ts">

import bedroomImage from '../../assets/img/background/bedroom_1.jpg';
import livingImage from '../../assets/img/background/living_2.jpg';
import bedroomImage2 from '../../assets/img/background/bedroom_2.jpg';
import ceilinImage from '../../assets/img/background/ceiling_1.jpg';
import ceilinImage2 from '../../assets/img/background/ceiling_2.jpg';

export { bedroomImage };
export { livingImage };
export { bedroomImage2 };
export { ceilinImage };
export { ceilinImage2 };

export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        bedroomImage,
        livingImage,
        bedroomImage2,
        ceilinImage,
        ceilinImage2
      ],
      autoSlideInterval: null,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
      this.resetAutoSlide();
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
      this.resetAutoSlide();
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 10000);
    },
    resetAutoSlide() {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    clearInterval(this.autoSlideInterval);
  },
};

const isMobile = computed(() => {
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(max-width: 768px)');
    return mq.matches;
  } else {
    return false;
  }
});

</script>

<template>
    <div>
        <div class="relative h-screen w-screen overflow-hidden">
        <div ref="slider" class="relative h-full w-full flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="(image, index) in images" :key="index" class="h-full w-full flex-shrink-0 bg-cover bg-center" :style="{ backgroundImage: `url(${image})` }"></div>
        </div>
        <button @click="prevSlide" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">‹</button>
        <button @click="nextSlide" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">›</button>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <span v-for="(image, index) in images" :key="index" class="block w-3 h-3 rounded-full" :class="{ 'bg-white': index === currentIndex, 'bg-gray-500': index !== currentIndex }"></span>
        </div>
        </div>
    </div>
    <div class="relative mr-5 inset-0 flex flex-col justify-end items-end">
        <div class="max-w-[90%] overflow-hidden overflow-x-auto">
            <div class="flex gap-3">
                <Card class="max-w-md min-w-72 w-full rounded-xl mt-6" v-for="data in collectionData" :key="data.id">
                    <template #header>
                        <div class="overflow-hidden rounded-t-xl">
                            <img alt="user header" :src="data.image" class="w-72 md:w-full">
                        </div>
                    </template>
                    <template #title> {{ data.title }} </template>
                    <template #subtitle> {{ data.location }} </template>
                    <template #content>

                        <p class="m-0">
                            {{ data.description }}
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-between items-center">
                            <div class="">
                                <h3 class="text-xl font-bold">₹ {{ data.price }}</h3>
                                <p class="text-sm font-medium text-gray-500">Per Month</p>
                            </div>
                            <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="() => {
                                console.log('form submitted');
                            }">
                            </form>
                                <Button label="Submit" ype="submit" @click="showCard = !showCard" class="flex items-center">
                                    <Icon name="mingcute:send-fill" class="ml-1 mr-1 w-6 h-6"/>
                                        Book A Slot
                                </Button>
                                <div v-if="showCard" class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 z-50 pt-10 pb-10">
                                    <div class="flex justify-center items-center min-h-screen">
                                        <div class="bg-white p-8 rounded-lg shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] w-full">
                                            <div class="mb-4">
                                                <h2 class="text-lg font-bold">Book A Slot</h2>
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
                                                        <div class="relative card flex justify-center">
                                                            <div class="flex flex-col gap-2 w-full">
                                                                <Dropdown v-model="selectedGender" editable :options="genders" showClear optionLabel="name" placeholder="Select your Gender" class="w-full" />
                                                                <small id="location-help">Gender<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Fifth pair of inputs -->
                                                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <div class="flex flex-col gap-2">
                                                            <Calendar v-model="birthday" :minDate="minDate" :maxDate="maxDate" :manualInput="false" showIcon inputId="birthday"  placeholder="Select a Date"/>
                                                            <small id="rent-help">Date<span class="text-red-400"> *</span></small>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="relative card flex justify-center">
                                                            <div class="flex flex-col gap-2 w-full">
                                                                <Dropdown v-model="selectedTime" editable :options="times" showClear optionLabel="name" placeholder="Select a TIme" class="w-full" />
                                                                <small id="location-help">Time<span class="text-red-400"> *</span></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span class="text-xs">
                                                    <div class="text-center mt-4">
                                                        By creating an account, you agree to our 
                                                        <a href="#" class="text-blue-500">Privacy Policy</a>
                                                        and 
                                                        <a href="#" class="text-blue-500">Terms of Use</a>. 
                                                    </div>
                                                </span>
                                            <div class="mt-6 flex justify-end">
                                                <Button @click="showCard = false" class="mr-4">Cancel</Button>
                                                <Button @click="">Confirm Slot</Button>
                                            </div>
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
</template>