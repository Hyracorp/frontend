export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (import.meta.client) {
    const AllowedPaths = [
      "/login",
      "/signup",
      "/reset-password",
      "/landlord",
      "/landlord/properties",
      "/landlord/bookings",
      "/landlord/bookmarks",
      "/landlord/settings",
    ];

    if (
      !JSON.parse(localStorage.getItem("loginstatus")!) ||
      !JSON.parse(localStorage.getItem("user")!)?.userType == "landlord" ||
      !AllowedPaths.includes(to.path)
    ) {
      return navigateTo("/login");
    }
  }
});
