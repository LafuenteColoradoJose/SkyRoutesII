import { getDbConnection } from '~/server/db/db'

export default defineEventHandler(async event => {

    const userID = getQuery(event, 'userId')

    const connection = await getDbConnection();

    const [rows] = await connection.execute('SELECT * FROM flightplans WHERE userID = ?', [userID.userId])
    await connection.end();

    return {
        db: rows,
    }

})