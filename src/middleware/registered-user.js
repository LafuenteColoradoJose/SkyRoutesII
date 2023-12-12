export default defineNuxtRouteMiddleware((to, from) => {
    const userId = ref(useCookie('userId'))

    if (userId.value) {
        return navigateTo('/about') // redirige a la página de inicio o a donde quieras
    }
})