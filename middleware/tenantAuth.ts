export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (import.meta.client) {
    const AllowedPaths = [
      "/login",
      "/signup",
      "/reset-password",
      "/tenant",
      "/tenant/properties",
      "/tenant/bookings",
      "/tenant/bookmarks",
      "/tenant/settings",
    ];

    if (
      !JSON.parse(localStorage.getItem("loginstatus")!) ||
      !JSON.parse(localStorage.getItem("user")!)?.userType == "tenant" ||
      !AllowedPaths.includes(to.path)
    ) {
      return navigateTo("/login");
    }
  }
});
