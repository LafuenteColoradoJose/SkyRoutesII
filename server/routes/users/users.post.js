
import { getDbConnection } from '~/server/db/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const name = body.name;
    const user = body.user;
    const email = body.email;
    const password = body.password;
    const license = "1";
    const admin = 0;

    const connection = await getDbConnection();

    const [rows] = await connection.execute("SELECT * FROM users WHERE email=?", [email]);

    if (rows.length > 0) {
        return {
            api: 0,

        };
    }

    const res = await connection.execute(
        "INSERT INTO users (name, user, email, password, license, admin) VALUES (?, ?, ?, ?, ?, ?)",
        [name, user, email, password, license, admin]
    );

    await connection.end();

    return {
        api: 1,
    };
});