import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
    const dataPath = path.join(__dirname, '../skyroutes.json')
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const jsonData = JSON.parse(rawData)

    // Helper to find table data
    const getTableData = (tableName) => {
        const table = jsonData.find(t => t.type === 'table' && t.name === tableName)
        return table ? table.data : []
    }

    // 1. Seed Aircrafts
    const aircrafts = getTableData('aircrafts')
    for (const aircraft of aircrafts) {
        await prisma.aircraft.upsert({
            where: { matricula: aircraft.matricula },
            update: {},
            create: {
                id: parseInt(aircraft.id),
                modelo: aircraft.modelo,
                matricula: aircraft.matricula,
                velocidad: parseInt(aircraft.velocidad),
                turbulence: aircraft.turbulence,
                combustible: parseFloat(aircraft.combustible),
                img: aircraft.img
            }
        })
    }
    console.log(`Seeded ${aircrafts.length} aircrafts`)

    // 2. Seed Airports
    const airports = getTableData('airports')
    for (const airport of airports) {
        await prisma.airport.upsert({
            where: { ICAO: airport.ICAO },
            update: {},
            create: {
                id: parseInt(airport.id),
                ICAO: airport.ICAO,
                name: airport.name,
                LAT: airport.LAT,
                LON: airport.LON
            }
        })
    }
    console.log(`Seeded ${airports.length} airports`)

    // 3. Seed Users
    const users = getTableData('users')
    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                id: parseInt(user.id),
                name: user.name,
                user: user.user,
                email: user.email,
                password: user.password,
                license: user.license,
                admin: user.admin === "1" || user.admin === 1
            }
        })
    }
    console.log(`Seeded ${users.length} users`)

    // FlightPlans are empty in the JSON, so skipping.
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
