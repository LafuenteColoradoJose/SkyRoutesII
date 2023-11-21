export default defineEventHandler(async (event) => {
    const conn = connect(config)
    const body = await readBody(event);

    const name = body.name;
    const user = body.user;
    const email = body.email;
    const password = body.password;
    const license = "1";
    const admin = "1";
    
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    
    // Consulto correo
    const [existingUser] = await conn.execute(`SELECT * FROM users WHERE email='${email}'`);

    if (existingUser.length > 0) {
        // En el caso de que el correo este ocupado --> devuelvo un mensaje de correo ocupado
        return {
            api: "Correo ocupado",
        };
    }

    // En el caso de que el correo este ocupado --> realizar la inserción.
    const [res] = await conn.execute(
        `INSERT INTO users (name, user, email, password, license, admin) 
         VALUES ('${name}', '${user}', '${email}', '${password}', '${license}', ${admin})`
    );

    return {
        api: "Usuario registrado",
        db: res,
    };
});
