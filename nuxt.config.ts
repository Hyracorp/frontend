// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "nuxt-icon", "@nuxt/eslint"],
  primevue: {
    options: {
      ripple: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: ["primevue/resources/themes/lara-light-blue/theme.css"],

  devtools: { enabled: true },
});