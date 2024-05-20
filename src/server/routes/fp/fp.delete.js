import { getDbConnection } from '~/server/db/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let selectedRows = body.selectedRows;

    const connection = await getDbConnection();

    const promises = selectedRows.map(row => connection.execute(`DELETE FROM flightplans WHERE id = ${row};`));

    const res = await Promise.all(promises);

    await connection.end();

    return {
        res: res.map(([result]) => result.affectedRows),
    };
});