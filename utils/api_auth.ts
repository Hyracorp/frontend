export const useAuthAPI = (customFetch) => ({
  loginUser: async (data): Promise => {
    const res = await customFetch("/auth/login", {
      method: "POST",
      body: data,
    });
    return res;
  },
  registerUser: async (data): Promise => {
    const res = await customFetch("/auth/register", {
      method: "POST",
      body: data,
    });
    return res;
  },
  verifyUser: async (data): Promise => {
    const res = await customFetch("/auth/verify-email", {
      method: "POST",
      body: data,
    });
    return res;
  },
  resendOTP: async (data): Promise => {
    const res = await customFetch("/auth/resend-otp", {
      method: "POST",
      body: data,
    });
    return res;
  },

});
