
export default defineNuxtRouteMiddleware(async(to, _from) => {
 
    if(import.meta.client){
    const AllowedPaths = ['/login', '/signup','/reset-password','/']
        console.log(!JSON.parse(localStorage.getItem("loginstatus")!) , !AllowedPaths.includes(to.path))
    if(!JSON.parse(localStorage.getItem("loginstatus")!) || !AllowedPaths.includes(to.path)){
        
        return navigateTo('/login')
    }
}
})