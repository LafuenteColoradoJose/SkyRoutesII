import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const id = body.id;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }
    
    const conn = connect(config)

    const res = await conn.execute(
        `DELETE FROM users WHERE id = ${id};`
    );

    return {
        res,
    };
});
