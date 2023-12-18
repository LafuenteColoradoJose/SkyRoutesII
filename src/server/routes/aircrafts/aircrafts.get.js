import { connect } from '@planetscale/database'

export default defineEventHandler(async event=> {
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    const res = await conn.execute('SELECT * FROM aircrafts')

    return {
        db: res.rows
    }


})

