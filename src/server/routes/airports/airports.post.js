import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const ICAO = body.ICAO;
    const name = body.name;
    const LAT = body.LAT;
    const LON = body.LON;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })
    // const res = body
    

    const res = await connection.execute(
        `INSERT INTO airports (ICAO, name, LAT, LON) 
         VALUES ('${ICAO}', '${name}', '${LAT}', '${LON}');`, {
        method: "POST"
    }
    );

    await connection.end();

    return {
        api: 1,
        // res,
    };
});