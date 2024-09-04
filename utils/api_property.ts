export const usePropertyAPI = (fetch) => ({
  searchProperty: async (query): Promise => {
    const results = await fetch("/property/search", {
      method: "GET",
      params: {
        property_type: query.propertyType,
        longitude: query.logitude,
        latitude: query.latitude,
        max_distance: 150,
      },
    });
    return results;
  },
  getProperty: async (id): Promise => {
    const property = await fetch("/property/" + id, {
      method: "GET",
    });
    return property;
  },
  fetchProperties: async (): Promise => {
    const properties = await fetch("/property", {
      method: "GET",
    });
    return properties;
  },
  getFeaturedProperties: async (): Promise => {
    const properties = await fetch("/property/featured", {
      method: "GET",
    });
    return properties;
  },
  getAvailableSlots: async (propertyId, date): Promise => {
    const slots = await fetch("/property/booking/slots",{
      method:"POST",
      body:{property:propertyId,date}
    });
    return slots;
  },
  getBookings: async (): Promise => {
    const bookings = await fetch("/property/booking/list", {
      method: "GET",
    });
    return bookings;
  },
  bookVisit: async (data): Promise => {
    const res = await fetch("/property/booking", {
      method: "POST",
      body: data,
    });
    return res;
  },
  cancelBooking: async (id): Promise => {
    const res = await fetch(`/property/booking/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ visit_status: "Cancelled" }),
    });
    return res;
  },
});
