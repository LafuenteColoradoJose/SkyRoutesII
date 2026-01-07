import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const fpOrigin = body.fpOrigin;
    const fpDestination = body.fpDestination;
    const distance = body.distance;
    const maxAltitude = body.maxAltitude;
    const waypoints = body.waypoints;
    const idAircraft = body.idAircraft;
    const date = body.date;
    const license = body.license;
    const userID = body.userID;

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