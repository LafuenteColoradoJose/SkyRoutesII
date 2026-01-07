import { getDbConnection } from "~/server/db/db";

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

    const connection = await getDbConnection();

    try {

        const res = await connection.execute(
            `INSERT INTO flightplans (fpOrigin, fpDestination, distance, maxAltitude, waypoints, idAircraft, date, userID, license) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
            [fpOrigin, fpDestination, distance, maxAltitude, waypoints, idAircraft, date, userID, license]
        );
        await connection.end();
        return {
            res,
        };
        
    } catch (error) {
        await connection.end();
        return {
            error,
        };
        
    }


});