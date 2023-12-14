import { connect } from "@planetscale/database"

// Función de manejo de eventos asincrónica
export default defineEventHandler(async event => {

    // Configuración de la conexión a la base de datos
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    // Establece la conexión a la base de datos
    const conn = connect(config)

    // Ejecuta una consulta para seleccionar todos los registros de la tabla 'users'
    const res = await conn.execute('SELECT * FROM users')

    // Devuelve los resultados de la consulta como respuesta
    return {
        db: res.rows
    }
})