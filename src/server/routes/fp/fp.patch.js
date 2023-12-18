export default defineEventHandler (async event => {

    const body = await readBody(event)
    // const body = JSON.parse(event._requestBody)

    const fromICAO = body.fromICAO
    const toICAO = body.toICAO

    const rutaAPI = `https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}&limit=1`

    let response = await $fetch(rutaAPI)
   
    return {
        response
       
    }
})

