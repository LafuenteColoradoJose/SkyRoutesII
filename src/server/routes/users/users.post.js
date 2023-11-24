import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const name = body.name._value;
    const user = body.user._value;
    const email = body.email._value;
    const password = body.password._value;
    const license = "1";
    const admin = 0;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    const conn = connect(config)

    // Consulto correo
    const existingUser = await conn.execute(`SELECT * FROM users WHERE email='${email}'`);

    if (existingUser.rows.length > 0) {
        // En el caso de que el correo este ocupado --> devuelvo un mensaje de correo ocupado
        return {
            api: 0,
            // db: res,

        };
    }

    // En el caso de que el correo este ocupado --> realizar la inserción.
    const res = await conn.execute(
        `INSERT INTO users (name, user, email, password, license, admin) 
         VALUES ('${name}', '${user}', '${email}', '${password}', '${license}', ${admin})`, {
        method: "POST"
    }
    );

    return {
        api: 1,
        // db: res,
    };
});