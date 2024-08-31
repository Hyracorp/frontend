export const usePropertyAPI = (fetch) => ({
  searchProperty: async (query): Promise => {
    const user = await fetch("/property/search", {
      method: "GET",
      params: {
        property_type: query.propertyType,
        longitude: query.logitude,
        latitude: query.latitude,
        max_distance: 50,
      },
    });
    return user;
  },
});
