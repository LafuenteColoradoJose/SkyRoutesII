import mysql from 'mysql2/promise'
import { getDbConnection } from '~/server/db/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const name = body.name._value;
    const user = body.user._value;
    const email = body.email._value;
    const password = body.password._value;
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