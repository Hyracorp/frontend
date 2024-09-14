export const useAuthAPI = (fetch) => ({
  loginUser: async (data): Promise => {
    const res = await fetch("/auth/login", {
      method: "POST",
      body: data,
    });
    return res;
  },
  registerUser: async (data): Promise => {
    const res = await fetch("/auth/register", {
      method: "POST",
      body: data,
    });
    return res;
  },
  verifyUser: async (data): Promise => {
    const res = await fetch("/auth/verify-email", {
      method: "POST",
      body: data,
    });
    return res;
  },
  resendOTP: async (data): Promise => {
    const res = await fetch("/auth/resend-otp", {
      method: "POST",
      body: data,
    });
    return res;
  },

});
