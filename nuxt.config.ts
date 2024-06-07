// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxt/eslint",
  ],
  primevue: {
    options: {
      ripple: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  css: ["primevue/resources/themes/lara-light-blue/theme.css"],

  app: {
    head: {
      script: [
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase:'/api',
      googleClientId: '',
    },
  },
  devtools: { enabled: true },
});
