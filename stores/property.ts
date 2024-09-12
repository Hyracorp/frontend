import { defineStore, acceptHMRUpdate } from "pinia";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    cities: [],
    properties: [],
    featuredProperties: [],
    searchResults: [],
    property: null,
    bookings: [],
    latestBooking: {},
    booking: {},
    tenantBookings: [],
    landlordBookings: [],
    cloudinary_base_url: "https://res.cloudinary.com/dljxad52f/",
  }),

  getters: {
    getFeaturedProperties: (state) => state.featuredProperties,
    getProperties: (state) => state.properties,
    getSearchResults: (state) => state.searchResults,
    getProperty: (state) => state.property,
    getBookings: (state) => state.bookings,
    getBooking: (state) => state.booking,
    getTenantBookings: (state) => state.tenantBookings,
    getLandlordBookings: (state) => state.landlordBookings,
    getLatestBookings: (state) => state.latestBooking,
    getCloudinaryBaseURL: (state) => state.cloudinary_base_url,
  },

  actions: {


    async searchProperty(query) {
      //const substrings = query.bhkNo.split("+");
      // const res = await customFetch(`property/search`,{
      //   method:"GET",
      //   params: {
      //    property_type: query.propertyType,
      //    longitude: query.logitude,
      //    latitude: query.latitude,
      //   }
      // });
    },
    setProperties(properties) {
    
      this.properties = properties;

    },
    async setProperty(property) {
      
      this.property = property;
    },
    async setFeaturedProperties(properties) {
      if(properties.results){
        this.featuredProperties = properties.results;

      }
  },
    async setBookings(bookings) {
      this.bookings = bookings;
      this.latestBooking = bookings[0];
    },
   
      async getAvailableDates(propertyId: string) {
      const availableDates = [];
      const today = new Date();
      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0];
        const day = date.getDate();
        const bookingsOnDate = this.bookings.filter(
          (booking) =>
            booking.date === formattedDate && booking.propertyId === propertyId,
        );

        if (bookingsOnDate.length < 6) {
          availableDates.push(day);
        }
      }

      return availableDates;
    },
    async getAvailableTimeSlots(data) {
      
      const allTimeSlots = [
        { time: "9 AM", value: "09:00" },
        { time: "11 AM", value: "11:00" },
        { time: "1 PM", value: "13:00" },
        { time: "3 PM", value: "15:00" },
        { time: "5 PM", value: "17:00" },
        { time: "7 PM", value: "19:00" },
      ];

      const bookedTimeSlots = data?.available_slots;
      const availableTimeSlots = allTimeSlots.filter(
        (timeSlot) => bookedTimeSlots.includes(timeSlot.value),
      );
      return availableTimeSlots;
    },

    async bookVisit(date, time, propertyId, userId) {
      const booking = {
        date,
        time,
        propertyId,
        status: "pending",
        userId,
      };
      this.bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(this.bookings));
      return true;
    },
    async checkBookingStatus(propertyId, userId) {
      const booking = this.bookings.find(
        (booking) =>
          booking.propertyId === propertyId && booking.userId === userId,
      );

      this.booking = booking ?? {};
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePropertyStore, import.meta.hot));
}
