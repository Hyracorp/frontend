<script setup lang="ts">
let menuItems=[
    {
        name:'Login',
        link:'/login'
    },
    {
        name:'Register',
        link:'/register'
    }

]
let menu=ref(null)
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>
<template>
    <div class="">
        <div class="max-w-screen w-full px-5 py-3  flex justify-between items-center">
            <NuxtLink to="/">
                <div class="">
                <img src="/img/logo.png" alt="logo" class="w-40">
            </div>
            </NuxtLink>
            <div class="flex">
                <NuxtLink to="/login" class="">
                    <Button type="button" class="p-1 py-3"    text>

                    <Icon name="ph:user-circle" color="black" class="text-3xl" />

                    </Button>
</NuxtLink>

                <Button type="button" aria-haspopup="true" aria-controls="overlay_menu" class="md:hidden p-1 py-3" text  @click="toggle" >
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
                    <NuxtLink :to="item.link">
                    <div class="">{{item.name }}</div>
                </NuxtLink>
                </div>
            </template>
        </Menu>
    </div>


</template>