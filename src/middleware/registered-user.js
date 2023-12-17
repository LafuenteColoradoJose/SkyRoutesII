export default defineNuxtRouteMiddleware((to, from) => {
    const userIdReg = ref(useCookie('userId'))

    if (userIdReg.value) {
            // console.log('SALIENDO')
            // if (typeof window !== 'undefined') {
            //     // Reemplaza la última entrada en el historial del navegador con la página 'about'
            //     window.location.reload()
            //     console.log('YYYYYYY RECARGANDO YYYYYYYY')
            // }

            return reloadNuxtApp({
                path: '/about',
            })
        //    return navigateTo('/about')

    }


})