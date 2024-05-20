import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const ICAO = body.ICAO;
    const name = body.name;
    const LAT = body.LAT;
    const LON = body.LON;

    const connection = await getDbConnection();

    const res = await connection.execute(
        `INSERT INTO airports (ICAO, name, LAT, LON) 
         VALUES ('${ICAO}', '${name}', '${LAT}', '${LON}');`, {
        method: "POST"
    }
    );

    await connection.end();

    return {
        api: 1,
    };
});