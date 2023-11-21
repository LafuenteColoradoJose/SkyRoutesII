export default defineEventHandler(async event=> {

    let { toICAO } = getQuery(event)

    // const rutaApi = `https://api.met.no/weatherapi/tafmetar/1.0/metar?extended=false&icao=${toICAO}`
    const rutaApi = `https://api.flightplandatabase.com/weather/${toICAO}`

    let response = await $fetch(rutaApi)

    return {
        // prueba: toICAO,

        response
    }
})

