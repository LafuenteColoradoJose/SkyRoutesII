import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;
    const name = body.name;
    const user = body.user;
    const email = body.email;

    const connection = await getDbConnection();

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