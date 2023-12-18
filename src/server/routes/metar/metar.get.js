export default defineEventHandler(async event=> {

    let { toICAO } = getQuery(event)

    const rutaApi = `https://api.flightplandatabase.com/weather/${toICAO}`

    let response = await $fetch(rutaApi)

    return {
        response
    }
})

