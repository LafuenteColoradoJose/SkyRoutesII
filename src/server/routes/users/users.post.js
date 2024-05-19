import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const name = body.name._value;
    const user = body.user._value;
    const email = body.email._value;
    const password = body.password._value;
    const license = "1";
    const admin = 0;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })


    const [rows] = await connection.execute(`SELECT * FROM users WHERE email='${email}'`);

    if (rows.length > 0) {
        return {
            api: 0,

        };
    }

    const res = await connection.execute(
        `INSERT INTO users (name, user, email, password, license, admin) 
         VALUES ('${name}', '${user}', '${email}', '${password}', '${license}', ${admin})`, {
        method: "POST"
    }
    );

    await connection.end();

    return {
        api: 1,
    };
});