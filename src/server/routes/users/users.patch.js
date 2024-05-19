import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;
    const name = body.name;
    const user = body.user;
    const email = body.email;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })

    let updateQuery = `UPDATE users SET`;

    if (name) {
        updateQuery += ` name = '${name}',`;
    }
    if (user) {
        updateQuery += ` user = '${user}',`;
    }
    if (email) {
        updateQuery += ` email = '${email}',`;
    }
    updateQuery += ` WHERE id = '${id}';`;

    const res = await connection.execute(updateQuery, {
        method: "PATCH"
    });

    await connection.end();

    return {
        res,
    };
});