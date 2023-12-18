import { connect } from "@planetscale/database";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.userId;

  const config = {
    host: useRuntimeConfig().public.DATABASE_HOST,
    username: useRuntimeConfig().public.DATABASE_USERNAME,
    password: useRuntimeConfig().public.DATABASE_PASSWORD,
  };

  const conn = connect(config);

  const res = await conn.execute(`SELECT * FROM users WHERE id ='${userId}'`);
  
  return {
    db: res.rows,
  };
});
