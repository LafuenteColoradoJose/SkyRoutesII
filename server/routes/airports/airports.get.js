import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {

    const connection = await getDbConnection();
    
    const [rows] = await connection.execute("SELECT * FROM airports");
    await connection.end();
    
    return {
        db: rows,
    }


});

