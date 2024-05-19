import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const modelo = body.modelo;
    const matricula = body.matricula;
    const velocidad = body.velocidad;
    const turbulence = body.turbulence;
    const combustible = body.combustible;
    const img = body.img;

    const connection = await mysql.createConnection({
        host: useRuntimeConfig().public.DATABASE_HOST,
        user: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
        database: useRuntimeConfig().public.DATABASE_NAME
    })

    const [rows] = await connection.execute(
        `INSERT INTO aircrafts (modelo, matricula, velocidad, turbulence, combustible, img) 
         VALUES ('${modelo}', '${matricula}', '${velocidad}', '${turbulence}', '${combustible}', '${img}');`, {
        method: "POST"
    }
    );

    await connection.end();
    
    return {
        rows,
    };
});