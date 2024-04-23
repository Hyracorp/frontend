import { defineStore, acceptHMRUpdate } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  getters: {
    getAuthStatus: (state) => state.isAuthenticated,
  },
  actions: {
    async login() {
      this.isAuthenticated = true;
    },
    async logout() {
      this.isAuthenticated = false;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}