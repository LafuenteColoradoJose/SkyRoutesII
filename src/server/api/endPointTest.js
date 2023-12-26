// export default defineEventHandler(async event=> {
//     const nitro = useNitroApp()
//     // const query = getQuery(event)
//     // const body = await readBody(event)
//     const [res] = await nitro.db.query("SELECT * FROM airports" )

//     return {
//         api: "works",
//         // name: query.name,
//         // body: body,
//         db: res
//     }
// })

// import mysql from 'mysql2'
// // import { Client } from 'pg'
// import { Pool } from 'pg'
// import mysql2 from 'mysql2/promise'

import { connect } from "@planetscale/database"

export default defineEventHandler(async event => {
    
    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
      }

      const conn = connect(config)
    //   const res = await conn.execute('SHOW TABLES')


    // const res = await conn.execute('SELECT * FROM airports')

    // const res = await conn.execute(
    //     `INSERT INTO users (name, user, email, password, license, admin) 
    //      VALUES ('admin', 'admin', 'admin@admin.com', 'admin1234', 'ESP.FCL.1234567', 1)`, {
    //     method: "POST"
    // }
    // );

    const res = await conn.execute(
        `UPDATE users SET password = 'Admin12345' WHERE user = 'admin'`, {
        method: "POST"
    });

    return {
        api: "works in endPointTest",
        // name: query.name,
        // body: body,
        db: res
    }

    // ##################### ⁡⁢⁢⁣𝗣𝗿𝗼𝗯𝗮𝗻𝗱𝗼 𝗣𝗼𝘀𝘁𝗴𝗿𝗲𝗦𝗤𝗟 ###################################⁡

    // const client = new Client({
    //     database: skyroutes
    //     username: "oawwdtdqzkjms11b68f0"
    //     host: "aws.connect.psdb.cloud"
    //     password: ************// Default PostgreSQL port
    // })

    // await client.connect()
    // const res = await client.query('SELECT * FROM aircrafts')


    // const pool = new Pool({
    //     connectionString: "postgres://default:ZX21oxnzkTGc@ep-quiet-sun-29513338-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
    // })

    // const res = await pool.query("SELECT * FROM aircrafts")

    // return {
    //     api: "works in endPointTest",
    //     // name: query.name,
    //     // body: body,
    //     db: res
    // }





})
