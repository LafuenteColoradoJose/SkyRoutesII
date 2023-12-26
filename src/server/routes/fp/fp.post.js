import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const fpOrigin = body.fpOrigin._value;
    const fpDestination = body.fpDestination._value;
    const distance = body.fpDistance._value;
    const maxAltitude = body.fpAltitude._value;
    const waypoints = body.fpWaypoints._value;
    const idAircraft = body.idAircraft;
    const date = body.departureTime._value;
    const license = body.license._value;
    const userID = body.userID._value;

  

    console.log('DESDE SERVIDOR')

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    const res = await conn.execute(
        `INSERT INTO flightplans (fpOrigin, fpDestination, distance, maxAltitude, waypoints, idAircraft, date, userID, license) 
         VALUES ('${fpOrigin}', '${fpDestination}', '${distance}', '${maxAltitude}', '${waypoints}', '${idAircraft}', '${date}', '${userID}', '${license}');`, {
        method: "POST"
    }
    );

    return {
        res,
    };
});