<script setup lang="ts">
let menuItems=[
    {
        name:'Home',
        link:'/',
        target:""
    },
    {
        name:'Add a property',
        link:'/login',
        target:""
    },

    {
        name:'Contact Us',
        link:'https://hyracorp.com/#contact',
        target:'_blank'
    },

]
let menu=ref(null)
const toggle = (event) => {
    menu.value.toggle(event);
};

const props = defineProps({
    user: {
        type: Object,
        default: () => null
    },
    loginStatus: {
        type: Boolean,
        default: () => false
    }
})
onMounted(async () => { 

    if(props.user!==null){
        menuItems.push({
            name:'Logout',
            link:'/logout',
            target:""
        })
    }
})

</script>
<template>
    <div class="border-gray-100 border-b-2">
        <div class="max-w-screen w-full px-5 py-3  flex justify-between items-center">
            <NuxtLink to="/">
                <div class="">
                <img src="/img/logo.png" alt="logo" class="w-40">
            </div>
            </NuxtLink>
            <div class="flex">
                <NuxtLink :to="loginStatus&&user!==null&&loginStatus===true?`/${user.userType}/profile`:'/login'" class="">
                    <Button type="button" class="p-1 py-3"    text>
                    <div v-if="loginStatus===true && user!==null">
                        <h3 class="font-bold text-blue-400 px-2"> {{ user.firstName }}</h3>
                    </div>
                    <Icon name="ph:user-circle" color="black" class="text-3xl" />

                    </Button>
</NuxtLink>

                <Button type="button" aria-haspopup="true" aria-controls="overlay_menu" class=" p-1 py-3" text  @click="toggle" >
<Icon name="ph:list" color="black" class="text-3xl" />

</Button>
            </div>

        </div>
        <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true"  >
            <template #start>
                <div class="p-3">
                    <h3 class="font-bold text-blue-400">Hyracorp</h3>
                </div>
            </template>
            <template #item="{item}">
                <div class="p-3">
                    <NuxtLink :to="item.link" :target="item.target==''?'':'_blank'">
                    <div class="">{{item.name }}</div>
                </NuxtLink>
                </div>
            </template>
        </Menu>
    </div>


</template>