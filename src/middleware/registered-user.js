export default defineNuxtRouteMiddleware((to, from) => {
    const userId = ref(useCookie('userId'))

    if (userId.value) {
            console.log('SALIENDO')
            if (typeof window !== 'undefined') {
                // Reemplaza la última entrada en el historial del navegador con la página 'about'
                window.location.reload()
                console.log('recargando')
            }
           return navigateTo('/about')
        //    return reloadNuxtApp('/about')

    }


})