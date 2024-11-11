// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
  },
});
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "@nuxtjs/device",
    "@nuxt/eslint",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "@nuxt/icon",
  ],

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false,
        }
        
      },

      ripple: true,
    },
    autoImport: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
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
  // alias: {
  //   pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  // },

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
  compatibilityDate: "2024-10-17",
});
