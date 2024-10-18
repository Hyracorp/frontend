export const usePropertyAPI = (customFetch) => ({
  searchProperty: async (query): Promise => {
    let bhk: number[] = [];
    if (String(query.bhkNo)?.length > 0) {
      bhk = String(query.bhkNo).split("+").map(Number);
    }
    const results = await customFetch("/property/search", {
      method: "GET",
      params: {
        property_type: query.propertyType,
        longitude: query.logitude,
        latitude: query.latitude,
        bhk,
        max_distance: 150,
      },
    });
    return results;
  },
  getProperty: async (id): Promise => {
    const property = await customFetch("/property/" + id, {
      method: "GET",
    });
    return property;
  },
  fetchProperties: async (): Promise => {
    const properties = await customFetch("/property", {
      method: "GET",
    });
    return properties;
  },
  fetchAmenities: async (): Promise => {
    const amenities = await customFetch("/property/amenities", {
      method: "GET",
    });
    return amenities;
  },
  getFeaturedProperties: async (): Promise => {
    const properties = await customFetch("/property/featured", {
      method: "GET",
    });
    return properties;
  },
  addProperty: async (data): Promise => {
    const property = await customFetch("/property/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return property;
  },
  updateProperty: async (data, id): Promise => {
    const property = await customFetch(`/property/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return property;
  },
  uploadImage: async (data): Promise => {
    const image = await customFetch("/property/photos", {
      method: "POST",
      body: data,
    });
    return image;
  },
  updateImage: async (data, id): Promise => {
    const image = await customFetch(`/property/photos/${id}`, {
      method: "PATCH",
      body: data,
    });
    return image;
  },
  getAvailableSlots: async (propertyId, date): Promise => {
    const slots = await customFetch("/property/booking/slots", {
      method: "POST",
      body: { property: propertyId, date },
    });
    return slots;
  },
  getBookings: async (): Promise => {
    const bookings = await customFetch("/property/booking/list", {
      method: "GET",
    });
    return bookings;
  },
  bookVisit: async (data): Promise => {
    const res = await customFetch("/property/booking", {
      method: "POST",
      body: data,
    });
    return res;
  },
  cancelBooking: async (id): Promise => {
    const res = await customFetch(`/property/booking/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ visit_status: "Cancelled" }),
    });
    return res;
  },
});
