// export default defineEventHandler(async event=> {
//     const nitro = useNitroApp()
//     // const query = getQuery(event)
//     // const body = await readBody(event)
//     const [res] = await nitro.db.query("SELECT * FROM users" )

//     return {
//         // api: "works in users",
//         // name: query.name,
//         // body: body,
//         db: res
//     }
// })

import { connect } from "@planetscale/database"

export default defineEventHandler(async event => {
    
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
      }

      const conn = connect(config)
    //   const res = await conn.execute('SHOW TABLES')
    const res = await conn.execute('SELECT * FROM users')

    return {
        // api: "works in users",
        // name: query.name,
        // body: body,
        db: res.rows
    }



})
