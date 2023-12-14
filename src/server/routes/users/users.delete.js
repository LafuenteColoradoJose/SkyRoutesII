import { connect } from "@planetscale/database"

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
    // Lee el cuerpo de la solicitud
    const body = await readBody(event);

    // Extrae el ID del cuerpo de la solicitud
    const id = body.id;

    // Configuración de la conexión a la base de datos
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    
    // Establece la conexión a la base de datos
    const conn = connect(config)

    // Ejecuta una consulta para eliminar un registro de la tabla 'users' basado en el ID
    const res = await conn.execute(
        `DELETE FROM users WHERE id = ${id};`
    );

    // Devuelve el resultado de la consulta de eliminación
    return {
        res,
    };
});
