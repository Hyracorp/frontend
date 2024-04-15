<script setup lang="ts">

</script>
<template>

    <div class="w-screen p-5  flex justify-between items-center">
        <div class="">
            <img src="/img/logo.png" alt="logo" class="w-40" />
        </div>
        <div>
            <nuxt-link to="login">LOGIN</nuxt-link>
        </div>
        <div>
            <nuxt-link to="signup">SIGNUP</nuxt-link>
        </div>
        <div class="">
            <Button type="button" aria-haspopup="true" aria-controls="overlay_menu" class="md:hidden" text>

                <Icon name="ph:list" color="black" class="text-3xl" />

            </Button>

        </div>

    </div>

</template>