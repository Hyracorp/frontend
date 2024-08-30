import { defineStore, acceptHMRUpdate } from "pinia";
import ap from "../assets/cities/ap.json";
import tn from "../assets/cities/tn.json";
import kerala from "../assets/cities/kerala.json";
import karnataka from "../assets/cities/karnataka.json";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    cities: [...karnataka, ...kerala, ...ap, ...tn],
    properties: [],
    featuredProperties: [],
    searchResults: [],
    property: null,
    bookings: [],
    booking: {},
  }),

  getters: {
    getCities: (state) => state.cities,
    getFeaturedProperties: (state) => state.featuredProperties,
    getSearchResults: (state) => state.searchResults,
    getProperty: (state) => state.property,
    getBookings: (state) => state.bookings,
    getBooking: (state) => state.booking,
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
    async searchCityByName(query: string) {
      const result = this.cities.filter((city) =>
        city.name.toLowerCase().includes(query?.toLowerCase()),
      );
      return result;
    },
    async searchCityByCode(query: string) {
      const result = this.cities.filter((city) =>
        city.city.toLowerCase().includes(query?.toLowerCase()),
      );
      return result;
    },
    async searchProperty(query) {
      const substrings = query.bhkNo.split("+");

      this.property = this.properties.filter((property) => {
        return (
          property.locationCode === query.locationCode &&
          property.propertyType === query.propertyType &&
          property.price >= query.priceRange[0] &&
          property.price <= query.priceRange[1] &&
          substrings.some((substring) =>
            property.bhkNo.toString().includes(substring),
          )
        );
      });
      this.searchResults = this.property;
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

      // Get bookings for the given date and propertyId
      const bookingsOnDate = this.bookings.filter((booking) => {
        const bookingDate = new Date(booking.date).toDateString();
        const inputDate = new Date(date).toDateString();
        return bookingDate === inputDate && booking.propertyId === propertyId;
      });

      // Map booked time slots
      const bookedTimeSlots = bookingsOnDate.map(
        (booking) => booking.time.value,
      );

      // Filter out booked time slots from all time slots
      let availableTimeSlots = allTimeSlots.filter(
        (timeSlot) => !bookedTimeSlots.includes(timeSlot.value),
      );

      // Create a new Date object for the current date and time
      const currDate = new Date();
      // Create a new Date object for the input date
      const inpDate = new Date(date);

      // If the input date is today or later, filter time slots by the current time
      if (inpDate.toDateString() === currDate.toDateString()) {
        // Filter out time slots that have already passed today
        availableTimeSlots = availableTimeSlots.filter((slot) => {
          const slotTime = slot.value.split(":");
          const slotDateTime = new Date(
            inpDate.getFullYear(),
            inpDate.getMonth(),
            inpDate.getDate(),
            parseInt(slotTime[0]),
            parseInt(slotTime[1]),
          );
          return currDate <= slotDateTime;
        });
      }

      // Debugging: Check available time slots for today and future dates
      console.log("Available Slots:", availableTimeSlots);

      return availableTimeSlots;
    },

    async bookVisit(bookingData: {
      date: Date;
      time: string;
      propertyId: string;
      userId: string;
      gender: string;
      phone: string;
    }) {
     
      const formattedDate = new Date(bookingData.date)
        .toISOString()
        .split("T")[0];
      
 console.log(bookingData.date,formattedDate);
      // this.bookings.push({
      //   ...bookingData,
      //   date: formattedDate, // Store only the date part
      //   status: "pending",
      //   id: this.bookings.length + 1,
      // });
      //
      // localStorage.setItem("bookings", JSON.stringify(this.bookings));
      //
      // Debugging: Log the stored booking
      console.log("Booking Added:", {
        ...bookingData,
        date: formattedDate,
      });

      return true;
    },
    async checkBookingStatus(propertyId, userId) {
      const index = this.bookings.findIndex(
        (booking) =>
          booking.propertyId == propertyId && booking.userId == userId,
      );
      if (index !== -1) {
        const date = new Date(this.bookings[index].date);

        const formattedDate = date.toISOString().split("T")[0];
        const formattedTime = this.bookings[index].time;
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        const today = new Date();
        const bookingDate = new Date(formattedDateTime);
        // check if the booking has expired by comparing today's date and booking date

        if (today >= bookingDate) {
          this.bookings[index].status = "expired";
          localStorage.setItem("bookings", JSON.stringify(this.bookings));
        }
      }

      this.bookings = JSON.parse(localStorage.getItem("bookings")!);

      this.booking = this.bookings[index] ?? {};
    },
    async cancelBooking(bookingId) {
      const index = this.bookings.findIndex(
        (booking) => booking.id == bookingId,
      );
      if (index !== -1) {
        // add this.bookings[index].date with this.bookings[index].time to get the date and time of booking
        const date = new Date(this.bookings[index].date);

        const formattedDate = date.toISOString().split("T")[0];
        const formattedTime = this.bookings[index].time;
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        const today = new Date();
        const bookingDate = new Date(formattedDateTime);
        // check if today is 8 hours or lesser than booking date
        if (today.getTime() - bookingDate.getTime() <= 8 * 60 * 60 * 1000) {
          this.bookings[index].status = "cancelledLast";
        } else {
          this.bookings[index].status = "cancelled";
        }

        localStorage.setItem("bookings", JSON.stringify(this.bookings));
        return true;
      }
      return false;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePropertyStore, import.meta.hot));
}
