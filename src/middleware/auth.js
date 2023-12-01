
export default defineNuxtRouteMiddleware((to, from) => {

    const userId = ref(useCookie('userId'))

    if (!userId.value) {
        return navigateTo('/')
    }

    // console.log('userId', userId)

})




