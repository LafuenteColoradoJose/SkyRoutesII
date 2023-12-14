import { connect } from "@planetscale/database";

// Función de manejo de eventos asincrónica
export default defineEventHandler(async (event) => {
  // Lee el cuerpo de la solicitud
  const body = await readBody(event);

  // Extrae los datos del cuerpo de la solicitud
  const userId = body.userId;
  const name = body.name._value;
  const user = body.user._value;
  const email = body.email._value;
  const password = body.password._value;
  let passwordnew = body.passwordnew._value;

  // Configuración de la conexión a la base de datos
  const config = {
    host: useRuntimeConfig().public.DATABASE_HOST,
    username: useRuntimeConfig().public.DATABASE_USERNAME,
    password: useRuntimeConfig().public.DATABASE_PASSWORD,
  };

  // Establece la conexión a la base de datos
  const conn = connect(config);

  // Consulta la base de datos para verificar si el usuario y la contraseña coinciden
  const res = await conn.execute(`SELECT * FROM users WHERE id ='${userId}' AND password='${password}';`);

  if (res.rows.length > 0) {
    // Si la contraseña actual es correcta, actualiza los datos del usuario
    if (passwordnew === "") {
      await conn.execute(`UPDATE users
      SET name = '${name}', user = '${user}', email = '${email}', password = '${password}'
      WHERE id = ${userId}`
      );
    } else {
      // Si se proporciona una nueva contraseña, actualiza la contraseña del usuario
      await conn.execute(`UPDATE users
      SET name = '${name}', user = '${user}', email = '${email}', password = '${passwordnew}'
      WHERE id = ${userId}`
      );
    }

    // Devuelve un mensaje indicando que el usuario ha sido modificado
    return {
      db: "Usuario Modificado",
    };

  } else {
    // Si la contraseña actual es incorrecta, devuelve un mensaje de error
    return {
      db: "Contraseña Erronea",
    };
  }
});