export default defineNuxtRouteMiddleware((to, from) => {
    const userIdReg = ref(useCookie('userId'))

    if (userIdReg.value) {

        return reloadNuxtApp({
            path: '/about',
        })

    }
})