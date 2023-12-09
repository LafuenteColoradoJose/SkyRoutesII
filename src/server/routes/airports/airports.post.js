import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // console.log('BODY:  ', body)

    const ICAO = body.ICAO;
    const name = body.name;
    const LAT = body.LAT;
    const LON = body.LON;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    // const res = body
    const conn = connect(config)

    const res = await conn.execute(
        `INSERT INTO airports (ICAO, name, LAT, LON) 
         VALUES ('${ICAO}', '${name}', '${LAT}', '${LON}');`, {
        method: "POST"
    }
    );

    return {
        api: 1,
        // res,
    };
});