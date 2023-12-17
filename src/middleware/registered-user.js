export default defineNuxtRouteMiddleware((to, from) => {
    const userIdReg = ref(useCookie('userId'))

    if (userIdReg.value) {

        if (from.path ==='/user'&& to.path === '/') {
            return reloadNuxtApp({
                path: '/about',
            })
        }
        
        return reloadNuxtApp({
            path: '/about',
        })

    }
})