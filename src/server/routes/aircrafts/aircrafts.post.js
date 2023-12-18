import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const modelo = body.modelo;
    const matricula = body.matricula;
    const velocidad = body.velocidad;
    const turbulence = body.turbulence;
    const combustible = body.combustible;
    const img = body.img;

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    const res = await conn.execute(
        `INSERT INTO aircrafts (modelo, matricula, velocidad, turbulence, combustible, img) 
         VALUES ('${modelo}', '${matricula}', '${velocidad}', '${turbulence}', '${combustible}', '${img}');`, {
        method: "POST"
    }
    );


    return {
        res,
    };
});