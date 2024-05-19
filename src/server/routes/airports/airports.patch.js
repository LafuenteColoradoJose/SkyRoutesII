import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;
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

    let updateQuery = `UPDATE airports SET`;

    if (ICAO) {
        updateQuery += ` ICAO = '${ICAO}',`;
    }
    if (name) {
        updateQuery += ` name = '${name}',`;
    }
    if (LAT) {
        updateQuery += ` LAT = '${LAT}',`;
    }
    if (LON) {
        updateQuery += ` LON = '${LON}',`;
    }

    updateQuery = updateQuery.slice(0, -1); // Remove the last comma

    updateQuery += ` WHERE id = '${id}';`;

    const res = await conn.execute(updateQuery, {
        method: "PATCH"
    });

    await connection.end();

    return {
        res,
    };
});