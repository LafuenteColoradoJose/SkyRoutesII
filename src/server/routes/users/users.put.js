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

    const existingUser = await conn.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`);

    if (existingUser.rows.length > 0) {
        return {
            api: 1,
            id: existingUser.rows[0].id,
            isAdmin: existingUser.rows[0].admin,
        };
    }

    return {
        api: 0,
    };
});