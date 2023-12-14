import { connect } from "@planetscale/database"

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
    // Lee el cuerpo de la solicitud
    const body = await readBody(event);

    // Extrae los datos del cuerpo de la solicitud
    const name = body.name._value;
    const user = body.user._value;
    const email = body.email._value;
    const password = body.password._value;
    const license = "1";
    const admin = 0;

    // Configuración de la conexión a la base de datos
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    // Establece la conexión a la base de datos
    const conn = connect(config)

    // Consulta la base de datos para verificar si el correo ya está registrado
    const existingUser = await conn.execute(`SELECT * FROM users WHERE email='${email}'`);

    if (existingUser.rows.length > 0) {
        // En el caso de que el correo ya esté ocupado, devuelve un mensaje indicando que el correo ya está registrado
        return {
            api: 0,
            // db: res,

        };
    }

    // En el caso de que el correo no esté ocupado, realiza la inserción del nuevo usuario
    const res = await conn.execute(
        `INSERT INTO users (name, user, email, password, license, admin) 
         VALUES ('${name}', '${user}', '${email}', '${password}', '${license}', ${admin})`, {
        method: "POST"
    }
    );

    // Devuelve un mensaje indicando que la inserción fue exitosa
    return {
        api: 1,
    };
});