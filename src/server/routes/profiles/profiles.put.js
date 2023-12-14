import { connect } from "@planetscale/database";

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
  // Lee el cuerpo de la solicitud
  const body = await readBody(event);
  // Extrae el ID del usuario del cuerpo de la solicitud
  const userId = body.userId;

  // Configuración de la conexión a la base de datos
  const config = {
    host: useRuntimeConfig().public.DATABASE_HOST,
    username: useRuntimeConfig().public.DATABASE_USERNAME,
    password: useRuntimeConfig().public.DATABASE_PASSWORD,
  };

  // Establece la conexión a la base de datos
  const conn = connect(config);

  // Ejecuta una consulta para seleccionar todos los registros de la tabla 'users' donde el ID coincide con el proporcionado
  const res = await conn.execute(`SELECT * FROM users WHERE id ='${userId}'`);
  
  // Devuelve los resultados de la consulta como respuesta
  return {
    db: res.rows,
  };
});
