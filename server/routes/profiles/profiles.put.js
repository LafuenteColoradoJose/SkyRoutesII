import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;

  const connection = await getDbConnection();

  const [ rows ] = await connection.execute(`SELECT * FROM users WHERE id ='${userId}'`);
  await connection.end();
  
  return {
    db: rows,
  };
});
