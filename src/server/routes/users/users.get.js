export default defineEventHandler(async event=> {
    const nitro = useNitroApp()
    // const query = getQuery(event)
    // const body = await readBody(event)
    const [res] = await nitro.db.query("SELECT * FROM users" )

    return {
        // api: "works in users",
        // name: query.name,
        // body: body,
        db: res
    }
})