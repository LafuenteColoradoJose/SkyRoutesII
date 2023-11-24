import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const email = body.email._value;
    const password = body.password._value;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    const conn = connect(config)

    // Consulto correo
    const existingUser = await conn.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`);

    if (existingUser.rows.length > 0) {
        // En el caso de que el correo este ocupado --> devuelvo un mensaje de correo ocupado
        return {
            api: 1,
            // db: res,

        };
    }

    return {
        api: 0,
        // db: res,
    };
});