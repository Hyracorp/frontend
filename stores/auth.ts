import { defineStore, acceptHMRUpdate } from "pinia";

// const customFetch=useCustomFetch()
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token:"",
    isAuthenticated: false,
    userType: "",
    users:[],
    user:null
  }),
  getters: {
    getAuthStatus: (state) => state.isAuthenticated,
    getUser: (state) => state.user
  },
  actions: {
    initStorage(){
      if(localStorage.getItem("users")===null){
        localStorage.setItem("users", JSON.stringify([]))
      }else{
        this.users = JSON.parse(localStorage.getItem("users")!)
      }

      if(localStorage.getItem("loginstatus")===null){
        localStorage.setItem("loginstatus", "false")
      }else{
        this.isAuthenticated = JSON.parse(localStorage.getItem("loginstatus")!)
        if(this.isAuthenticated===true){
          this.user = JSON.parse(localStorage.getItem("user")!)
        }
      }
    },
    async login(data:{email:string,password:string}) {

      // const res = await $fetch(`${config.public.apiBase}/auth/login`, {
      //   method: "POST",
      //   body: data,
      // })
// const res= await customFetch(`properties/residential`, {
//   method: "POST",
//   body: data,
// // })
//       if(res.tokens){
//         this.token=res.tokens
//         return true
//       }else{
//         return false;
//       }
      const res = this.users.filter((user) => user.email === data.email && user.password === data.password)
      if(res.length>0){
        this.isAuthenticated = true
        localStorage.setItem("loginstatus", JSON.stringify(true))
        this.user=res[0]
        localStorage.setItem("user", JSON.stringify(res[0]))
        return true
      }else{
        return false
      }
    },
    async logout() {
      localStorage.setItem("loginstatus", JSON.stringify(false))
      localStorage.setItem("user", JSON.stringify(null))
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
