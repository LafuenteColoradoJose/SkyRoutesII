import { connect } from '@planetscale/database'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let selectedRows = body.selectedRows;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    const promises = selectedRows.map(row => conn.execute(
        `DELETE FROM flightplans WHERE id = ${row};`
    ));

    const res = await Promise.all(promises);

    return {
        res,
    };
});