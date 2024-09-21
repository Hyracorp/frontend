// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "nuxt-icon",
    "@nuxtjs/device",
    "@nuxt/eslint",
    "@nuxtjs/seo",
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
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
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
      apiBase: "/api",
      googleClientId: "",
    },
  },
  pwa: {
    registerType: "autoUpdate",

    manifest: {
      name: "Hyracorp",
      short_name: "hyracorp",
      start_url: "/",
      description: "Search across 10000+ verified property listings",
      display: "standalone",
      orientation: "portrait",
      theme_color: "#120e4b",
      icons: [
        {
          src: "img/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "img/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "img/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  
  // SEO
  site: {
    url: "https://app.hyracorp.com",
    name: "Hyracorp",
    description: "Search across 10000+ verified property listings",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },
  ogImage: {
    enabled: false,
  },
  devtools: { enabled: true },
});
