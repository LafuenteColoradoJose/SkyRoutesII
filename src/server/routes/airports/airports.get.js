
import { connect } from "@planetscale/database";

export default defineEventHandler(async (event) => {

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    };
    
    const conn = connect(config);
    
    const res = await conn.execute("SELECT * FROM airports");
    
    return {
        db: res.rows,
    };





});


// export default defineEventHandler(async event=> {
//     const nitro = useNitroApp()
//     // const query = getQuery(event)
//     // const body = await readBody(event)
//     const [res] = await nitro.db.query("SELECT * FROM airports" )

//     return {
//         // api: "works",
//         // name: query.name,
//         // body: body,
//         db: res
//     }
// })

// UTILIZANDO LIBRERIA MYSQL2

// import mysql from 'mysql2'

// export default defineEventHandler(async event=> {

// const pool = mysql.createPool({
//     host:     'localhost',
//     user:  'root',
//     port:     3306,
//     password: '',
//     database: 'skyroutes',
// }).promise()

// const [res] = await pool.query("SELECT * FROM airports" )

//     return {
//         // api: "works in airports/airports.get.js",
//         // name: query.name,
//         // body: body,
//         db: res
//     }

// })