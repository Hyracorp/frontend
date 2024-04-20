<script setup lang="ts">

const searchForm = ref({

    location: '',
    bhkNo: [{ name: '2BHK', value: 2 }],
    priceRange: [2, 80]
})


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
const locations = ref([])
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
    // console.log(searchForm.value)
    // convert searchForm.bhkNo from array to URI and join with '+'

    let bhkNoQuery = searchForm.value.bhkNo.map((bhk) => bhk.value).join('+')


    router.push({ path: '/search', query: { location: searchForm.value.location, bhkNo: `${bhkNoQuery}`, priceRange: searchForm.value.priceRange } })
}
</script>

<template>
    <div class="py-10 p-5 flex flex-col justify-center items-center ">
        <div class="max-w-xl flex flex-col gap-8">
            <!-- Main Text -->
            <div class="">
                <h3 class="text-xl font-bold text-gray-600">Feel Home Stay With Us</h3>
                <p class=" text-gray-500">Search your next stay and get a room that fits all of your needs.
                </p>

            </div>
            <!-- Hero Search Card -->
            <div class="">
                <Card class="" :pt="{ 'root': 'shadow-2xl' }">
                    <template #title>
                        <div class="text-center">
                            <h3>Search by location</h3>
                            <p class="text-sm font-medium text-gray-500">Find your perfect property all over india</p>
                        </div>
                    </template>


                    <template #content>
                        <form class="flex flex-col gap-3 justify-center items-center" @submit.prevent="searchSubmit">
                            <div class="">
                                <SelectButton v-model="searchForm.bhkNo"
                                    :pt="{ 'button': 'px-3 py-2', 'label': 'text-sm md:text-lg' }" :options="bhkOptions"
                                    optionLabel="name" multiple aria-labelledby="multiple" />

                            </div>
                            <div class=" ">
                                <label for="slider" class="text-lg text-gray-500 my-3 block">Location</label>
                                <InputGroup class="bg-none">
                                    <InputGroupAddon class="relative">
                                        <Icon name="ph:magnifying-glass" class="text-gray-500 absolute top-2/4 -mt-2" />
                                    </InputGroupAddon>
                                    <AutoComplete v-model="searchForm.location" optionLabel="name"
                                        :suggestions="filteredSuggestions" @complete="search"
                                        placeholder="Auto Detect or Search Location" />

                                </InputGroup>
                                <small id="location-help">Where are you looking for the property?</small>
                            </div>

                            <div class="w-full ">
                                <label for="slider" class="text-lg text-gray-500 my-3 block">Price Range(₹{{
                    searchForm.priceRange[0] *
                    1000 }} - ₹{{
                    searchForm.priceRange[1] * 1000 }})</label>
                                <div class="px-2">
                                    <Slider v-model="searchForm.priceRange" range class="w-14rem" />
                                </div>
                            </div>
                            <Button type="submit" class="w-full flex gap-3">
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