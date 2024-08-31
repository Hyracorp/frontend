import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase ?? "https://api.nuxt.com",
      onRequest({ request, options, error }) {
        if (useAuthStore().token) {
          // Add Authorization header
          options.headers = options.headers || {};
          options.headers.Authorization = `Bearer ${useAuthStore().token}`;
        }
      },
      onResponse({ response }) {
        // response._data = new myBusinessResponse(response._data)
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          useAuthStore().isAuthenticated = false;
          return navigateTo("/login");
        }
      },
    });
    return {
      provide: {
        api,
      },
    };
  },
});
