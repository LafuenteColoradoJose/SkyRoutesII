import { getDbConnection } from '~/server/db/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;

    const connection = await getDbConnection();

    const [rows] = await connection.execute(
        `DELETE FROM users WHERE id = ${id};`
    );

    await connection.end();

    return {
        rows,
    };
});
