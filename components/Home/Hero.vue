<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'
import { searchSchema } from '@/schemas/searchSchema'
import { z } from "zod";
let propertyStore = usePropertyStore()

const searchForm = ref({

    location: {},
    bhkNo: [{ name: '2BHK', value: 2 }],
    priceRange: [2, 80]
})
const toast = useToast();

// BHK OPTIONS

const bhkOptions = ref([{
    name: '1BHK',
    value: 1
}, {
    name: '2BHK',
    value: 2
},
{
    name: '3BHK',
    value: 3
},
{
    name: '3BHK+',
    value: 0
}
])
// LOCATION SEARCH
const locations = computed(() => propertyStore.cities)
const filteredSuggestions = ref([])
const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredSuggestions.value = [...locations.value];
        } else {
            filteredSuggestions.value = locations.value.filter((location) => {
                return location.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const router = useRouter()
const searchSubmit = () => {

    try {
        searchSchema.parse(searchForm.value)
        const bhkNoQuery = searchForm.value.bhkNo.map((bhk) => bhk.value).join('+')
        router.push({ path: '/search', query: { location: searchForm.value.location.city, bhkNo: `${bhkNoQuery}`, priceRange: searchForm.value.priceRange } })
    } catch (err) {
        if (err instanceof z.ZodError) {

            toast.add({ severity: 'error', summary: 'Error', detail: ` ${err.issues[0].path[0]}: ${err.issues[0].message}` })
        } else {
            console.error('Error:', err)
        }
    }




}
// onMounted

onMounted(async () => {

})

function getLocation() {
    if ("geolocation" in navigator) {
        // Geolocation is supported

        navigator.geolocation.getCurrentPosition((position) => {
            $fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`).then(async (res) => {
                const searchCity = await propertyStore.searchCityByName(res.address.city)
                searchForm.value.location = { name: searchCity[0].name, city: searchCity[0].city }
            })
                .catch((err) => {
                    toast.add({ severity: 'error', summary: 'Error', detail: `Location Auto detect error: ${err.message}` })
                })
        })

    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Geolocation is not supported by this browser.' })
    }
}

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <div class="absolute top-0 left-0 w-screen h-1/2  -z-10 bg-blue-800">
            <img src="https://assets.lummi.ai/assets/QmXiqJnBwdNhTuuWUpTdbzVGcJsgHez2Te61WcEaHxfxeo?auto=format&w=1500"
                alt="" class="h-full w-screen object-cover opacity-70">
        </div>

        <div class="max-w-xl flex flex-col gap-8 p-5 py-10 ">
            <!-- Main Text -->
            <div class="">
                <h3 class="text-3xl font-bold text-white">Feel Home Stay With Us</h3>
                <p class=" text-gray-100">Search your next stay and get a room that fits all of your needs.
                </p>

            </div>
            <!-- Hero Search Card -->
            <div class="">
                <Card class="md:p-5" :pt="{ 'root': 'shadow-2xl' }">
                    <template #title>
                        <div class="text-center">
                            <h3>Search by location</h3>
                            <p class="text-sm font-medium text-gray-500">Find your perfect property all over india
                            </p>
                        </div>
                    </template>


                    <template #content>
                        <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="searchSubmit">
                            <div class="">
                                <SelectButton v-model="searchForm.bhkNo"
                                    :pt="{ 'button': 'px-3 py-2', 'label': 'text-sm md:text-lg' }" :options="bhkOptions"
                                    optionLabel="name" multiple aria-labelledby="multiple" />

                            </div>
                            <div class="w-full">
                                <label for="slider" class="text-lg text-gray-500 my-3 block">Location</label>

                                <InputGroup class="bg-none">
                                    <InputGroupAddon class="relative">
                                        <Icon name="ph:magnifying-glass" class="text-gray-500 absolute top-2/4 -mt-2" />
                                    </InputGroupAddon>

                                    <AutoComplete v-model="searchForm.location" optionLabel="name"
                                        :suggestions="filteredSuggestions" @complete="search"
                                        placeholder="Auto Detect or Search Location" required />

                                    <InputGroupAddon>
                                        <Button type="button" @click="getLocation" iconOnly text>
                                            <Icon name="ph:map-pin" />
                                        </Button>
                                    </InputGroupAddon>

                                </InputGroup>

                                <small id="location-help">Where are you looking for the property?</small>
                            </div>

                            <div class="w-full">
                                <label for="slider" class="text-lg text-gray-500 my-3 block">Price Range(₹{{
                                    searchForm.priceRange[0] *
                                    1000 }} - ₹{{
                                        searchForm.priceRange[1] * 1000 }})</label>
                                <div class="px-2">
                                    <Slider v-model="searchForm.priceRange" range class="w-14rem" />
                                </div>
                            </div>
                            <Button type="submit" class="flex gap-3 w-full">
                                <Icon name="ph:magnifying-glass" />
                                <div class="">
                                    Find Property..
                                </div>
                            </Button>
                        </form>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>