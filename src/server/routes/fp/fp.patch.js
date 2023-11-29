export default defineEventHandler (async event => {

    const body = await readBody(event)
    // const body = JSON.parse(event._requestBody)

    const fromICAO = body.fromICAO
    const toICAO = body.toICAO

    const rutaAPI = `https://api.flightplandatabase.com/search/plans?fromICAO=${fromICAO}&toICAO=${toICAO}&limit=1`

    let response = await $fetch(rutaAPI)
    // console.log(typeof(response)) // object

    // const fpPRUEBA = {
    //     id: 7129673,
    //     fromICAO: 'LEMG',
    //     toICAO: 'LECO',
    //     fromName: 'Málaga-Costa del Sol',
    //     toName: 'A Coruña',
    //     flightNumber: null,
    //     distance: 459.17602553038205,
    //     maxAltitude: 35000,
    //     waypoints: 9,
    //     likes: 0,
    //     downloads: 0,
    //     popularity: 1697189077,
    //     notes: 'Basic altitude profile:\n' +
    //       '- Ascent Rate: 2500ft/min\n' +
    //       '- Ascent Speed: 250kts\n' +
    //       '- Cruise Altitude: 35000ft\n' +
    //       '- Cruise Speed: 420kts\n' +
    //       '- Descent Rate: 1500ft/min\n' +
    //       '- Descent Speed: 250kts\n' +
    //       '\n' +
    //       'Options:\n' +
    //       '- Use NATs: yes\n' +
    //       '- Use PACOTS: yes\n' +
    //       '- Use low airways: yes\n' +
    //       '- Use high airways: yes\n' +
    //       '',
    //     encodedPolyline: 
    //       'gb{~E`gmZgcrEd}y@c{pCxyy@ka_BvxH{vtCd~_@whqArtMcceGl_o@_}aCvz}FszuEz_wG',
    //     createdAt: '2023-10-13T09:24:37.000Z',
    //     updatedAt: '2023-10-13T09:24:37.000Z',
    //     tags: [ 'generated' ],
    //     user: {
    //       id: 26106,
    //       username: 'MTenbult',
    //       gravatarHash: 'c93e3dcfd5fb56d42b05bc7890065a60',
    //       location: null
    //     },
    //     application: { id: 2316, name: null, url: null },
    //     cycle: { id: 40, ident: 'FPD2106', year: 21, release: 6 }
    //   }

    return {
        response
        // body: body,
        // // event: event._readBody,
        // fromICAO: fromICAO,
        // toICAO: toICAO,
        // response
    }
})

