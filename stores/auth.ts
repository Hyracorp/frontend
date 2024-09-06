import { defineStore, acceptHMRUpdate } from "pinia";
function decodeJwt(token) {
    // Split the token into its three parts
    const base64Url = token.split('.')[1];
    
    // Decode the Base64URL string (convert to a regular Base64 string first)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode the Base64 string to JSON
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}
// const customFetch=useCustomFetch()
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token:null,
    isAuthenticated: false,
    userType: "",
    users:[],
    user:null,
    profile:null,
    user_id:null
  }),
  getters: {
    getAuthStatus: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getProfile: (state) => state.profile,
    getUserType: (state) => state.userType,
  },
  actions: {
 async init() {
      if(localStorage.getItem("loginstatus")){
      this.isAuthenticated = JSON.parse(localStorage.getItem("loginstatus"))
      this.userType = JSON.parse(localStorage.getItem("userType"))
      this.token = JSON.parse(localStorage.getItem("token"))
      this.user = JSON.parse(localStorage.getItem("user"))
     
    }
 }, 
    async login(res) {
        if(res.access_token){
          localStorage.setItem("loginstatus", JSON.stringify(true))
          localStorage.setItem("userType", JSON.stringify(res.user_type))
          localStorage.setItem("token", JSON.stringify(res.access_token))
          this.token = res.access_token
          this.userType = res.user_type
          let payload = decodeJwt(res.access_token)
          this.user_id = payload.user_id
          this.isAuthenticated = true
        return true
        }else{
          return false
        }
     
    },
    async setUser(user) {
     
      if(user){
        this.user = user
        localStorage.setItem("user", JSON.stringify(user))
      }
    },
    async setProfile(profile) {

      if(profile){
        this.profile = profile        
      } 
    },
    async logout() {
      localStorage.setItem("loginstatus", JSON.stringify(false))
      localStorage.setItem("user", JSON.stringify(null))
      localStorage.setItem("token", JSON.stringify(null))
      localStorage.setItem("userType", JSON.stringify(null))
      this.isAuthenticated = false
    },
    async signup(data:{
        firstName: string,
        lastName: string,
        email: string,
        password: string}) {
        if(this.users.length>0){
          const userExist = this.users.filter((user) => user.email === data.email)
          if (userExist.length > 0) {
            return false
          }else{
         

            this.users.push( {...data,id:this.users.length + 1})
            localStorage.setItem("users", JSON.stringify(this.users))
            return true
          }
        }

        this.users.push( {...data,id:this.users.length + 1})
        localStorage.setItem("users", JSON.stringify(this.users))
         
        return true
    }
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
