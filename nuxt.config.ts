// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
    '@nuxtjs/tailwindcss','nuxt-primevue'],
   primevue: {
    options: {
      ripple: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: ["primevue/resources/themes/lara-light-teal/theme.css"],
     devtools: { enabled: true },

})
