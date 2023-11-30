import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log('BODY:  ', body)

    const fpOrigin = body.fpOrigin._value;
    const fpDestination = body.fpDestination._value;
    const distance = body.fpDistance._value;
    const maxAltitude = body.fpAltitude._value;
    const waypoints = body.fpWaypoints._value;
    const idAircraft = body.idAircraft;
    const date = body.departureTime._value;
    const license = body.license._value;
    const userID = body.userID._value;

    // console.log("fpOrigin: ", fpOrigin);
    // console.log("fpDestination: ", fpDestination);
    // console.log("distance: ", distance);
    // console.log("maxAltitude: ", maxAltitude);
    // console.log("waypoints: ", waypoints);
    // console.log("idAircraft: ", idAircraft);
    // console.log("date: ", date);
    // console.log("userID: ", userID);
    // console.log("license: ", license);

    console.log('DESDE SERVIDOR')

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    // const res = body
    const conn = connect(config)

    const res = await conn.execute(
        `INSERT INTO flightplans (fpOrigin, fpDestination, distance, maxAltitude, waypoints, idAircraft, date, userID, license) 
         VALUES ('${fpOrigin}', '${fpDestination}', '${distance}', '${maxAltitude}', '${waypoints}', '${idAircraft}', '${date}', '${userID}', '${license}');`, {
        method: "POST"
    }
    );

    // const res = await conn.execute(
    //     `INSERT INTO flightplans (fpOrigin, fpDestination, distance, maxAltitude, waypoints, idAircraft, date, userID)
    //      VALUES ('PRUEBA4', 'PRUEBA4', 69, 18100, 4, 2, 'HOY MISMO', 2);`, {
    //     method: "POST"
    // }
    // );

    return {
        // api: 1,
        res,
    };
});