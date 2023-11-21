import mysql from 'mysql2'

// CON NITRO
export default defineNitroPlugin(async nitroApp => {
    const config = useRuntimeConfig()

    // console.log('config', config.public.MYSQL_HOST)
    // console.log('config', config.public.MYSQL_USER)
    // console.log('config', config.public.MYSQL_PORT)
    // console.log('config', config.public.MYSQL_PASS)
    // console.log('config', config.public.MYSQL_DATABASE)

    const pool = mysql.createPool({
          host:     config.public.MYSQL_HOST,
          user:     config.public.MYSQL_USER,
          port:     config.public.MYSQL_PORT,
          password: config.public.MYSQL_PASS,
          database: config.public.MYSQL_DATABASE,
          // host:     'localhost',
          // user:         'root',
          // port:         3306,
          // password:     '',
          // database:     'skyroutes',
      
        //   timezone: '+00:00',
        //   supportBigNumbers: true,
        //   bigNumberStrings: true
    }).promise()

      nitroApp.db = pool
})


// ! CON NUXT Y SIN NITRO  da error "defineNuxtPlugin is not defined"
// ! quitamos del nuxt.config.js plugins:['@/server/plugins/db']
// export default defineNuxtPlugin(async nuxtApp => {
//     const config = nuxtApp.$config

//     console.log('config', config.public.MYSQL_HOST)
//     console.log('config', config.public.MYSQL_USER)
//     console.log('config', config.public.MYSQL_PORT)
//     console.log('config', config.public.MYSQL_PASS)
//     console.log('config', config.public.MYSQL_DATABASE)

//     // const pool = mysql.createPool({
//     //       host:     config.public.MYSQL_HOST,
//     //       user:     config.public.MYSQL_USER,
//     //       port:     config.public.MYSQL_PORT,
//     //       password: config.public.MYSQL_PASS,
//     //       database: config.public.MYSQL_DATABASE,
//     //       // host:     'localhost',
//     //       // user:         'root',
//     //       // port:         3306,
//     //       // password:     '',
//     //       // database:     'skyroutes',
      
//     //     //   timezone: '+00:00',
//     //     //   supportBigNumbers: true,
//     //     //   bigNumberStrings: true
//     // }).promise()

//     //   nuxtApp.db = pool
// })
