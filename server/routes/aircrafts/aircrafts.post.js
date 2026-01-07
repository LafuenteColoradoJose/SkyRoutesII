import { getDbConnection } from "~/server/db/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const modelo = body.modelo;
    const matricula = body.matricula;
    const velocidad = body.velocidad;
    const turbulence = body.turbulence;
    const combustible = body.combustible;
    const img = body.img;

    const connection = await getDbConnection();

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