import { useRouter } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
    const userId = ref(useCookie('userId'))
    const router = useRouter()

    if(userId.value) {
        console.log('SALIENDO')
        if (process.client) {
            // Reemplaza la última entrada en el historial del navegador con la página 'about'
            window.location.reload()
        }
       return navigateTo('/about')
    //    return reloadNuxtApp('/about')
    }

    // if (userId.value && (to.path === '/' || to.path === '/register')) {
    //     console.log('SALIENDO')
        
    //     if (process.client) {
    //         // Reemplaza la última entrada en el historial del navegador con la página 'about'
    //         window.history.replaceState({}, '', '/about')
    //     }

    //     // Utiliza el método push del router de Vue para realizar la redirección
    //     router.push('/about')
    //     window.location.reload()
    // }
})