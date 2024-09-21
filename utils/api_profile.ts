export const useProfileAPI = (customFetch) => ({
  getProfile: async (userType:string): Promise => {
    const profile = await customFetch(`/profile/${userType}`, {
      method: "GET",
    });
    return profile;
  },
  addProfile: async (data:object, userType:string): Promise => {
    const profile = await customFetch(`/profile/${userType}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return profile;
  },
  updateProfile: async (data:object, userType:string,id): Promise => {
    const profile = await customFetch(`/profile/${userType}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return profile;
  },
});
