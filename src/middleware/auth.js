
export default defineNuxtRouteMiddleware((to, from) => {

    const userIdAuth = ref(useCookie('userId'))

    if (!userIdAuth.value) {
        return navigateTo('/')
    }



})




