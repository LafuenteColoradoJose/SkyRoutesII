import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const email = body.email;
    const password = body.password;

    const connection = await getDbConnection();

    const [rows] = await connection.execute(`SELECT * FROM users WHERE email= ? AND password= ?`, [email, password]);

    if (rows.length > 0) {
        await connection.end();
        return {
            api: 1,
            id: rows[0].id,
            isAdmin: rows[0].admin ? 1 : 0,
        };

    }

    await connection.end();
    return {
        api: 0,
        // existingUser: existingUser.rows,
    };
});