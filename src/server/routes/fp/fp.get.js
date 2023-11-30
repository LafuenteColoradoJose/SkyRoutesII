import { connect } from '@planetscale/database'
import { parse } from 'dotenv'

export default defineEventHandler(async event => {

    // console.log(event)
    const userID = getQuery(event, 'userId')

    // const userID = 92

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    // const res = await conn.execute('SELECT * FROM flightplans')
    const res = await conn.execute('SELECT * FROM flightplans WHERE userID = ?', [userID.userId])
    // const res = await conn.execute('DESC flightplans')
    // const res = await conn.execute('SHOW COLUMNS FROM flightplans;')
    // const res = await conn.execute('SHOW INDEX FROM flightplans;')
    // const res = await conn.execute('SHOW CREATE TABLE flightplans')

    // const res = await conn.execute('ALTER TABLE flightplans DROP COLUMN fromICAOID, DROP COLUMN toICAOID, DROP COLUMN encodedPolyline, DROP COLUMN departure, DROP COLUMN arrival;')

    // const res = await conn.execute('ALTER TABLE flightplans DROP KEY idAircraft;')
   
    // const res = await conn.execute('CREATE TABLE `flightplans` (`id` int NOT NULL AUTO_INCREMENT, `fromICAO` varchar(255) NOT NULL, `toICAO` varchar(255) NOT NULL, `distance` int NOT NULL, `waypoints` int NOT NULL, `idAircraft` int NOT NULL, `date` varchar(255) NOT NULL, `userID` int NOT NULL, PRIMARY KEY(`id`) ))')

// const res = await conn.execute('ALTER TABLE flightplans2 RENAME TO flightplans;')
// ) ENGINE InnoDB,//   CHARSET utf8mb3;')

// const res = await conn.execute('ALTER TABLE `flightplans` CHANGE `fromName` `fpOrigin` varchar(255) NOT NULL, CHANGE `toName` `fpDestination` varchar(255) NOT NULL;')

// await conn.execute('ALTER TABLE `flightplans` CHANGE `distance` `distance` varchar(255) NOT NULL, CHANGE `maxAltitude` `maxAltitude` varchar(255) NOT NULL;');

// await conn.execute('ALTER TABLE `flightplans` ADD `license` VARCHAR(255);');

// const res = await conn.execute('UPDATE aircrafts SET combustible = 38 WHERE id=1;');

return {
    db: res.rows,
    // userID
}


})