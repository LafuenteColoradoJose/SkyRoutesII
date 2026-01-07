// Reading file to debug
import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);


    const userId = parseInt(body.userId);
    const name = body.name;
    const user = body.user;
    const email = body.email;
    const password = body.password;
    const passwordnew = body.passwordnew;
    const img = body.img;

    const connection = await getDbConnection();

    try {
      const [rows] = await connection.execute(
        "SELECT * FROM users WHERE id = ? AND password = ?",
        [userId, password]
      );

      if (rows.length > 0) {
        let updateQuery = 'UPDATE "users" SET "name" = ?, "user" = ?, "email" = ?';
        let params = [name, user, email];

        if (passwordnew && passwordnew.trim() !== "") {
          updateQuery += ', "password" = ?';
          params.push(passwordnew);
        }

        if (img) {
          updateQuery += ', "img" = ?';
          params.push(img);
        }

        updateQuery += ' WHERE "id" = ?';
        params.push(userId);

        await connection.execute(updateQuery, params);
        await connection.end();

        return { db: "Usuario Modificado" };
      } else {
        await connection.end();
        return { db: "Contraseña Erronea" };
      }
    } catch (dbError) {
      await connection.end();
      console.error("DB Error in profiles.patch:", dbError);
      throw createError({
        statusCode: 500,
        statusMessage: "Database Error: " + dbError.message
      });
    }

  } catch (e) {
    console.error("General Error in profiles.patch:", e);
    throw e;
  }
});