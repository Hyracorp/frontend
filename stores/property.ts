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
        images:[{
          itemImageSrc: 'https://imgs.search.brave.com/YoejsHIKGBJU68B-i69anJ2421uF-kuHf1fxXbF36JM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODAyNDIwNi9waG90/by9hcGFydG1lbnRz/LXdpdGgtYmFsY29u/aWVzLWluLWJhdHRl/cnNlYS1sb25kb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTFrNVFEbnJualVh/cmlBVDhKMjVnYVlt/MFZiTEpxRURsQWtJ/WlhFTHpkbk09',
          thumbnailImageSrc: 'https://imgs.search.brave.com/YoejsHIKGBJU68B-i69anJ2421uF-kuHf1fxXbF36JM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/ODAyNDIwNi9waG90/by9hcGFydG1lbnRz/LXdpdGgtYmFsY29u/aWVzLWluLWJhdHRl/cnNlYS1sb25kb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTFrNVFEbnJualVh/cmlBVDhKMjVnYVlt/MFZiTEpxRURsQWtJ/WlhFTHpkbk09',
          alt: 'Description for Image 1',
          title: 'Outside'
      },{
        itemImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
        thumbnailImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
        alt: 'Description for Image 1',
        title: 'Title 1'
    },{
      itemImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
      thumbnailImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
      alt: 'Description for Image 1',
      title: 'Title 1'
  },],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 80000,
        location: "Kakkanad, Kochi",
        locationCode: "kl-Kochi",
        bhkNo: 3,
        amenities:[{name:"wifi",icon:"wifi"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}],
        rules:["no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food", "no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food"],
      },
      {
        id: 2,
        title: "Property2 In Kochi",
        images:[{
          itemImageSrc: 'https://imgs.search.brave.com/x6vJRBCFtWzkBStd0CXUaCV_X6513vKQ6lmqJ3mJEmM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTIyMDMxMi9waG90/by9tb2Rlcm4tbHV4/dXJ5LW11bHRpLWZh/bWlseS1hcGFydG1l/bnQtYnVpbGRpbmcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXdNeFJxOWh2MDFJ/VHBiaXlsR3pDb0df/al9TdkZnSlpsNzNZ/OFFxWWt2S3c9',
          thumbnailImageSrc: 'https://imgs.search.brave.com/x6vJRBCFtWzkBStd0CXUaCV_X6513vKQ6lmqJ3mJEmM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/MTIyMDMxMi9waG90/by9tb2Rlcm4tbHV4/dXJ5LW11bHRpLWZh/bWlseS1hcGFydG1l/bnQtYnVpbGRpbmcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXdNeFJxOWh2MDFJ/VHBiaXlsR3pDb0df/al9TdkZnSlpsNzNZ/OFFxWWt2S3c9',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },{
        itemImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
        thumbnailImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
        alt: 'Description for Image 1',
        title: 'Title 1'
    },{
      itemImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
      thumbnailImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
      alt: 'Description for Image 1',
      title: 'Title 1'
  },],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 90000,
        location: "Kakkanad, Kochi",
        locationCode: "kl-Kochi",
        bhkNo: 3,
        amenities:[{name:"wifi",icon:"wifi"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}],
        rules:["no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food", "no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food"],
        
      },
      {
        id: 3,
        title: "Property3 in Kozhikode",
        images:[{
          itemImageSrc: 'https://imgs.search.brave.com/AAmxPVte3SrGCogZkzaMskN0dVzWAylduJEUW_7Hung/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg2/NjQ0MDg3L3Bob3Rv/L2FwYXJ0bWVudC1i/dWlsZGluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9akZQ/X2lKRVFZcGhtYjRC/V1A2S2ZGVU5CZFph/R1VPZTFONXhPbzNp/Y0ZRdz0',
          thumbnailImageSrc: 'https://imgs.search.brave.com/AAmxPVte3SrGCogZkzaMskN0dVzWAylduJEUW_7Hung/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg2/NjQ0MDg3L3Bob3Rv/L2FwYXJ0bWVudC1i/dWlsZGluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9akZQ/X2lKRVFZcGhtYjRC/V1A2S2ZGVU5CZFph/R1VPZTFONXhPbzNp/Y0ZRdz0',
          alt: 'Description for Image 1',
          title: 'Title 1'
      
        },{
          itemImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
          thumbnailImageSrc: 'https://imgs.search.brave.com/jMiGyfufsDnYO5qDZNckzXKioXR8yxROkkCzYMhPW0g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvMGUyYjI0YjQ5/MTZhNDgwOTU1MjQ0/ZTliMzAyMGJlNzkv/NDE2LzI3Mi9NT0RF/LzAxNmZiYS8xMTY4/NTIzMy0xNDVmZW8u/d2VicD9jdHI9YWU',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },{
        itemImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
        thumbnailImageSrc: 'https://imgs.search.brave.com/Jy3KxOJUf1sxru7UNPgQ2rhnbPn5zBLMNsrShErFVZU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJvcGVydHlmaW5k/ZXIuYWUvcHJvcGVy/dHkvNmMxMGMxZTcx/N2RmOTQ2OThkY2Vk/NzUwZmVlNzVhMmIv/NDE2LzI3Mi9NT0RF/LzVlY2IxZS8xMTY1/NDQ5Ny03Zjc0Zm8u/d2VicD9jdHI9YWU',
        alt: 'Description for Image 1',
        title: 'Title 1'
    }],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 100000,
        location: "Kozhikode",
        locationCode: "kl-Kozhikode",
        bhkNo: 3,
        amenities:[{name:"wifi",icon:"wifi"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}],
        rules:["no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food", "no smoking", "no pets", "no parties", "no alcohol", "no kids", "no food"],
      },
    ],
    featuredProperties: [
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
        amenities:[{name:"wifi",icon:"wifi"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}]
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
        amenities:[{name:"wifi",icon:"wifi"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}]
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
        amenities:[{name:"wifi",icon:"ph:wifi-medium"},{name:"ac",icon:"ph:snowflake-bold"},{name:"paper",icon:"ph:newspaper-bold"},{name:"laundry",icon:"ph:washing-machine-bold"},{name:"pool",icon:"ph:person-simple-swim-bold"}]
      },
    ],
    searchResults: [],
    property: null,
  }),

  getters: {
    getCities: (state) => state.cities,
    getFeaturedProperties: (state) => state.featuredProperties,
    getSearchResults: (state) => state.searchResults,
    getProperty: (state) => state.property,
  },

  actions: {
    async searchCityByName(query: string) {
      const result = this.cities.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      return result;
    },
    async searchCityByCode(query: string) {
      const result = this.cities.filter((city) =>
        city.city.toLowerCase().includes(query.toLowerCase())
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
    async fetchProperty(id: string) {
      this.property = this.properties.find((prop) =>String( prop.id) == String(id))??null;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePropertyStore, import.meta.hot));
}
