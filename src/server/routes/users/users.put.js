import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    
    const body = await readBody(event);

    const email = body.email._value;
    const password = body.password._value;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })

    const [rows] = await connection.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`);
    await connection.end();
    
    if (rows.length > 0) {
        return {
            api: 1,
            id: rows[0].id,
            isAdmin: rows[0].admin,
        };
        
    }

    return {
        api: 0,
        // existingUser: existingUser.rows,
    };
});