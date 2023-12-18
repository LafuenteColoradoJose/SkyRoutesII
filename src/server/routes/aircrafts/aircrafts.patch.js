import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    const id = body.id;
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

    let updateQuery = `UPDATE aircrafts SET`;

    if (modelo) {
        updateQuery += ` modelo = '${modelo}',`;
    }
    if (matricula) {
        updateQuery += ` matricula = '${matricula}',`;
    }
    if (velocidad) {
        updateQuery += ` velocidad = '${velocidad}',`;
    }
    if (turbulence) {
        updateQuery += ` turbulence = '${turbulence}',`;
    }
    if (combustible) {
        updateQuery += ` combustible = '${combustible}',`;
    }
    if (img) {
        updateQuery += ` img = '${img}',`;
    }

    updateQuery = updateQuery.slice(0, -1); // Remove the last comma

    updateQuery += ` WHERE id = '${id}';`;

    const res = await conn.execute(updateQuery, {
        method: "PATCH"
    });

    return {
        res,
    };
});