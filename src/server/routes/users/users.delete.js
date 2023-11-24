import { connect } from "@planetscale/database"

export default defineEventHandler(async () => {
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    };

    const conn = connect(config);

    // Eliminar todos los registros de la tabla
    await conn.execute("DELETE FROM users");
});
