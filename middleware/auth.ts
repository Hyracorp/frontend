function checkIfTruePath(paths,path) {
    let isAllowed=false
    paths.forEach(element => {
        if(element==path){
            isAllowed=true
        }
        if(path.startsWith(element)){
            isAllowed=true
        }
    })
    return isAllowed
}
export default defineNuxtRouteMiddleware(async(to, _from) => {
 
    if(import.meta.client){
    const AllowedPaths = ['/login', '/signup','/reset-password','/property']

    const isAllowedPath = checkIfTruePath(AllowedPaths, to.path)
   
    if(!JSON.parse(localStorage.getItem("loginstatus")!) || !isAllowedPath ){
        
        return navigateTo(`/login?redirect_url=${to.path}`)
    }
}
})
