import { connect } from "@planetscale/database"

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
    
    // Lee el cuerpo de la solicitud
    const body = await readBody(event);

    // Extrae el email y la contraseña del cuerpo de la solicitud
    const email = body.email._value;
    const password = body.password._value;

    // Configuración de la conexión a la base de datos
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    // Establece la conexión a la base de datos
    const conn = connect(config)

    // Consulta la base de datos para verificar la existencia del usuario
    const existingUser = await conn.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`);

    if (existingUser.rows.length > 0) {
        // En el caso de que el correo y la contraseña coincidan --> devuelve información del usuario
        return {
            api: 1,
            id: existingUser.rows[0].id,
            isAdmin: existingUser.rows[0].admin,
        };
    }

    // En caso contrario (usuario no encontrado) devuelve un mensaje indicando que el usuario no existe
    return {
        api: 0,
    };
});