<script setup lang="ts">
const gBtn = ref(null)
const config = useRuntimeConfig();
onMounted(async()=>{
    await google.accounts.id.initialize({
        client_id: config.public.googleClientId,
        callback: handleAuth
    })
    await google.accounts.id.renderButton(
        document.getElementById("gBtn"),
        { theme: "outline", size: "large" }
    )
})
async function handleAuth(gLoginRes) {

    console.log(gLoginRes)
    
}


</script>

<template>
    <div class="flex flex-col items-center mt-4 gap-3">
           <div id="gBtn" ref="gBtn">
            Google Login
           </div>
            <!-- <Button label="Info" severity="info" outlined type="submit" class="w-full flex gap-3">
                <Icon name="ph:facebook-logo" class=""/>
                    <div class="">
                        Continue with Facebook
                    </div>
            </Button> -->
    </div>
</template>


