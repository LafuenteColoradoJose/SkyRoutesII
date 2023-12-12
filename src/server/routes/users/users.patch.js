import { connect } from "@planetscale/database"

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // console.log('BODY:  ', body)

    const id = body.id;
    const name = body.name;
    const user = body.user;
    const email = body.email;
    // const password = body.password;
    

    const config = {
        host: useRuntimeConfig().public.DATABASE_HOST,
        username: useRuntimeConfig().public.DATABASE_USERNAME,
        password: useRuntimeConfig().public.DATABASE_PASSWORD,
    }

    const conn = connect(config)

    let updateQuery = `UPDATE users SET`;

    if (name) {
        updateQuery += ` name = '${name}',`;
    }
    if (user) {
        updateQuery += ` user = '${user}',`;
    }
    if (email) {
        updateQuery += ` email = '${email}',`;
    }
    // if (password) {
    //     updateQuery += ` password = '${password}',`;
    // }
    

    updateQuery = updateQuery.slice(0, -1); // Remove the last comma

    updateQuery += ` WHERE id = '${id}';`;

    const res = await conn.execute(updateQuery, {
        method: "PATCH"
    });

    return {
        res,
    };
});