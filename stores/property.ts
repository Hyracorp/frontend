import { defineStore, acceptHMRUpdate } from "pinia";
import ap from "../assets/cities/ap.json";
import tn from "../assets/cities/tn.json";
import kerala from "../assets/cities/kerala.json";
import karnataka from "../assets/cities/karnataka.json";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    cities: [...karnataka, ...kerala, ...ap, ...tn],
    properties: [
      {
        id: 1,
        title: "Property1 In Kochi",
        image:
          "https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 80000,
        location: "Kakkanad, Kochi",
        locationCode: "kl-Kochi",
        bhkNo: 3,
      },
      {
        id: 2,
        title: "Property2 In Kochi",
        image:
          "https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 90000,
        location: "Kakkanad, Kochi",
        locationCode: "kl-Kochi",
        bhkNo: 3,
      },
      {
        id: 3,
        title: "Property3 in Kozhikode",
        image:
          "https://imgs.search.brave.com/5ug_4dSkMCYhjwxk_Xx0QAdfxeY9IYeoCHtFtcXzRf8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hcC5y/ZGNwaXguY29tLzQy/ZmNlN2QyYTU5YTI5/NjEzZjk3YzMxYzhl/NDgxZDQ4bC1tMjEx/OTYxNzM1OG9kLXc0/ODBfaDM2MF94Mi5q/cGc",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 100000,
        location: "Kozhikode",
        locationCode: "kl-Kozhikode",
        bhkNo: 3,
      },
    ],
    featuredProperties: [],
    searchResults: [],
    property: {},
  }),

  getters: {
    getCities: (state) => state.cities,
    getFeaturedProperties: (state) => state.featuredProperties,
    getSearchResults: (state) => state.searchResults,
  },

  actions: {
    async searchCityByName(query: string) {
      const result = this.cities.filter((city) =>
        city.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      return result;
    },
    async searchCityByCode(query: string) {
      const result = this.cities.filter((city) =>
        city.city.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      return result;
    },
    async searchProperty(query) {
      const substrings = query.bhkNo.split("+");
      this.property = this.properties.filter(
        (property) =>
          property.locationCode === query.locationCode &&
          property.price >= query.priceRange[0] &&
          property.price <= query.priceRange[1] &&
          substrings.some((substring) =>
            property.bhkNo.toString().includes(substring)
          )
      );
      this.searchResults = this.property;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePropertyStore, import.meta.hot));
}
