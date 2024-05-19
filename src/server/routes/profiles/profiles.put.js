import mysql from 'mysql2/promise';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;

  const connection = await mysql.createConnection({
    host: useRuntimeConfig().public.DATABASE_HOST,
    user: useRuntimeConfig().public.DATABASE_USERNAME,
    password: useRuntimeConfig().public.DATABASE_PASSWORD,
    database: useRuntimeConfig().public.DATABASE_NAME
})

  const [ rows ] = await connection.execute(`SELECT * FROM users WHERE id ='${userId}'`);
  await connection.end();
  
  return {
    db: rows,
  };
});
