import { defineStore, acceptHMRUpdate } from "pinia";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    cities: [],
    properties: [],
    featuredProperties: [],
    searchResults: [],
    property: null,
    bookings: [],
    booking: {},
    tenantBookings: [],
    landlordBookings: [],
  }),

  getters: {
    getFeaturedProperties: (state) => state.featuredProperties,
    getSearchResults: (state) => state.searchResults,
    getProperty: (state) => state.property,
    getBookings: (state) => state.bookings,
    getBooking: (state) => state.booking,
    getTenantBookings: (state) => state.tenantBookings,
    getLandlordBookings: (state) => state.landlordBookings,
  },

  actions: {
    async initStorage() {
      if (localStorage.getItem("bookings") === null) {
        localStorage.setItem("bookings", JSON.stringify([]));
      } else {
        this.bookings = JSON.parse(localStorage.getItem("bookings")!);
      }

      if (localStorage.getItem("properties") === null) {
        localStorage.setItem("properties", JSON.stringify(this.properties));
      } else {
        this.properties = JSON.parse(localStorage.getItem("properties")!);
        this.featuredProperties = this.properties.slice(0, 3);
      }
    },

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
    async fetchProperty(id: string) {
      this.property =
        this.properties.find((prop) => String(prop.id) == String(id)) ?? null;
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
    async getAvailableTimeSlots(date, propertyId) {
      const allTimeSlots = [
        { time: "9 AM", value: "09:00" },
        { time: "11 AM", value: "11:00" },
        { time: "1 PM", value: "13:00" },
        { time: "3 PM", value: "15:00" },
        { time: "5 PM", value: "17:00" },
        { time: "7 PM", value: "19:00" },
      ];

      const bookingsOnDate = this.bookings.filter((booking) => {
        const bookingDate = new Date(booking.date).toDateString();
        const inputDate = new Date(date).toDateString();

        return bookingDate === inputDate && booking.propertyId === propertyId;
      });

      const bookedTimeSlots = bookingsOnDate.map(
        (booking) => booking.time.value,
      );

      const availableTimeSlots = allTimeSlots.filter(
        (timeSlot) => !bookedTimeSlots.includes(timeSlot.value),
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
