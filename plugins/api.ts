
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase ?? "https://api.nuxt.com",
      async onRequest({ request, options }) {
        const authStore = useAuthStore();
        if (authStore.token) {
          // Add Authorization header
          options.headers = options.headers || {};
          options.headers.Authorization = `Bearer ${authStore.token}`;
        }
      },
      async onResponseError({ response, request, options }) {
        const authStore = useAuthStore();
       const baseUrl = useRuntimeConfig().public.apiBase ?? "https://api.nuxt.com"; 
        if (response.status === 401) {
          // Try to refresh the token
          try {
            const refreshResponse = await $fetch( baseUrl + '/auth/refresh-token', {
              method: 'POST',
              credentials: 'include', // This is important to send the secure cookie
              mode: 'cors'
            
            });

            if (refreshResponse.token) {
              // Update the token in the store
              authStore.token = refreshResponse.token;
              
              // Retry the original request with the new token
              options.headers.Authorization = `Bearer ${authStore.token}`;
              return $fetch(request, options);
            }
          } catch (error) {
            // If refresh fails, log out the user
            authStore.token = null;
            authStore.isAuthenticated = false;
            localStorage.removeItem("token");
            return navigateTo("/login");
          }
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

