import { defineStore, acceptHMRUpdate } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "Anoop",
      password: "123"
    },
    isAuthenticated: false,
  }),
  getters: {
    getAuthStatus: (state) => state.isAuthenticated,
  },
  actions: {
    async login(data) {
      if(data.email == this.user.username && data.password == this.user.password){
          this.isAuthenticated = true;
          return true;
      }
      return false;
    },
    async logout() {
      this.isAuthenticated = false;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
