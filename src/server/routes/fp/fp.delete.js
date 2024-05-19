import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let selectedRows = body.selectedRows;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })


    const promises = selectedRows.map(row => conn.execute(
        `DELETE FROM flightplans WHERE id = ${row};`
    ));

    const res = await Promise.all(promises);

    await connection.end();

    return {
        res,
    };
});