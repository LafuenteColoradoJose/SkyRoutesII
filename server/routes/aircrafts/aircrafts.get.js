import { getDbConnection } from "~/server/db/db"

export default defineEventHandler(async event=> {

    const connection = await getDbConnection()
    
    const [rows] = await connection.execute('SELECT * FROM aircrafts')
    await connection.end()

    return {
        db: rows
    }


})

