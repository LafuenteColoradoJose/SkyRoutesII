import { connect } from "@planetscale/database"

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
    // Lee el cuerpo de la solicitud
    const body = await readBody(event);

    // Extrae los datos del cuerpo de la solicitud
    const id = body.id;
    const name = body.name;
    const user = body.user;
    const email = body.email;
    // const password = body.password;
    

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    // Establece la conexión a la base de datos
    const conn = connect(config)

    // Construye la consulta de actualización dinámicamente
    let updateQuery = `UPDATE users SET`;

    if (name) {
        updateQuery += ` name = '${name}',`;
    }
    if (user) {
        updateQuery += ` user = '${user}',`;
    }
    if (email) {
        updateQuery += ` email = '${email}',`;
    }
    // if (password) {
    //     updateQuery += ` password = '${password}',`;
    // }
    

    // Completa la consulta con la condición WHERE
    updateQuery += ` WHERE id = '${id}';`;

    // Ejecuta la consulta de actualización en la base de datos
    const res = await conn.execute(updateQuery, {
        method: "PATCH"
    });

    // Devuelve el resultado de la consulta de actualización
    return {
        res,
    };
});