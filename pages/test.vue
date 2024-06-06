<script setup lang="ts">




// const Gauth = google.account.id.initialize({
//     client_id: "YOUR_CLIENT_ID",
//     callback: handleGauth
// })
// function handleGauth() {

//     console.log('test')
// }
const gBtn = ref()
onMounted(async () => {
    await google.accounts.id.initialize({
        client_id: "",
        callback: handleAuth
    })
    await google.accounts.id.renderButton(
        document.getElementById("gBtn"),
        { theme: "outline", size: "large" }
    )


})
async function handleAuth(res) {
    console.log(res)
}
definePageMeta({
    layout: "default",
    title: 'Test login',
    // middleware: "auth",
});
</script>

<template>
    <div class="p-5">
        <h1>test</h1>

        <div class="flex justify-center item-center" id="gBtn">

        </div>
    </div>
</template>