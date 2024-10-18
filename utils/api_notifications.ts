export const useNotificationAPI = (customFetch) => ({
  fetchNotifications: async (): Promise => {
    const notifications = await customFetch("/notifications", {
      method: "GET",
    });
    return notifications;
  },
});
