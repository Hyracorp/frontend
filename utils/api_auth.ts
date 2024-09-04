export const useAuthAPI = (fetch) => ({
  loginUser: async (data): Promise => {
    const res = await fetch("/auth/login", {
      method: "POST",
      body: data,
    });
    return res;
  },
});
