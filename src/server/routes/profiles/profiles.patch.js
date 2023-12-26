import { connect } from "@planetscale/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const userId = body.userId;
  const name = body.name._value;
  const user = body.user._value;
  const email = body.email._value;
  const password = body.password._value;
  let passwordnew = body.passwordnew._value;

  const config = {
    host: useRuntimeConfig().public.DATABASE_HOST,
    username: useRuntimeConfig().public.DATABASE_USERNAME,
    password: useRuntimeConfig().public.DATABASE_PASSWORD,
  };

  const conn = connect(config);

  const res = await conn.execute(`SELECT * FROM users WHERE id ='${userId}' AND password='${password}';`);

  if (res.rows.length > 0) {
    if (passwordnew === "") {
      await conn.execute(`UPDATE users
      SET name = '${name}', user = '${user}', email = '${email}', password = '${password}'
      WHERE id = ${userId}`
      );
    } else {
      await conn.execute(`UPDATE users
      SET name = '${name}', user = '${user}', email = '${email}', password = '${passwordnew}'
      WHERE id = ${userId}`
      );
    }

    return {
      db: "Usuario Modificado",
    };

  } else {
    return {
      db: "Contraseña Erronea",
    };
  }
});