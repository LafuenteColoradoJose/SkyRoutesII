<template>
    <div class="flex flex-col">

        <section id="formulario">
            <form class="flex flex-col justify-between items-center" @submit.prevent="loadTable">
                <article class="flex flex-row">
                    <label for="">Seleccione tabla</label>
                    <select v-model="selectedOptionTable" name="" id="">
                        <option value="0"></option>
                        <option value="1">Aircrafts</option>
                        <option value="2">Airports</option>
                        <option value="3">Users</option>
                    </select>
                    <label for="">Seleccione opción</label>
                    <select v-model="selectedOptionCrud" name="" id="">
                        <option value="0"></option>
                        <option value="1">Mostrar</option>
                        <option value="2">Crear</option>
                        <option value="3" v-if="selectedOptionTable !== '1' && selectedOptionTable !== '2'">Modificar
                        </option>
                        <option value="4" v-if="selectedOptionTable !== '1' && selectedOptionTable !== '2'">Eliminar
                        </option>
                    </select>
                </article>
                <button v-if="selectedOptionTable === '1' && selectedOptionCrud === '1'" @click="loadTable"
                    class="btn">Cargar</button>
                <button v-if="selectedOptionTable === '2' && selectedOptionCrud === '1'" @click="loadTableAirports"
                    class="btn">Cargar</button>
                <!-- <button v-if="selectedOptionTable === '3' && selectedOptionCrud === '1'" @click="loadTableUsers" class="btn">Cargar</button> -->
            </form>
        </section>

        <!-- ⁡⁢⁢⁣AIRCRAFTS⁡ -->
        <!-- TABLA AIRCRAFTS MOSTRAR/DELETE -->
        <section v-if="tableToShow === '1' && selectedOptionCrud === '1'" class="flex flex-col justify-center items-center">
            <table id="tableAircrafts">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Modelo</th>
                        <th>Matrícula</th>
                        <th>Eliminar</th>


                    </tr>
                </thead>
                <tbody>
                    <tr v-for="aircraft in aircrafts" :key="aircrafts.id">
                        <td>{{ aircraft.id }}</td>
                        <td>{{ aircraft.modelo }}</td>
                        <td>{{ aircraft.matricula }}</td>
                        <td class="flex items-center justify-center">
                            <input type="checkbox" name="" id="" class="flex items-center justify-center"
                                v-model="selectedRows" :value="aircraft.id">
                        </td>

                    </tr>
                </tbody>
            </table>
            <button class="btn" @click="deleteSelectedAircrafts">Borrar selección</button>
        </section>

        <!-- TABLA AIRCRAFTS CREAR -->
        <section v-if="tableToShow === '1' && selectedOptionCrud === '2'">
            <form class="flex flex-col justify-center items-center">
                <label for="">Modelo</label>
                <input v-model="modelo" type="text" name="" id="">
                <label for="">Matrícula</label>
                <input v-model="matricula" type="text" name="" id="">
                <label for="">Velocidad</label>
                <input v-model="velocidad" type="text" name="" id="">
                <label for="">Turbulence</label>
                <input v-model="turbulence" type="text" name="" id="">
                <label for="">Combustible</label>
                <input v-model="combustible" type="text" name="" id="">
                <label for="">Img</label>
                <input v-model="img" type="text" name="" id="">
                <button class="btn" @click="createAircraft">Crear Aeronave</button>
            </form>
        </section>


        ⁡⁢⁢⁣<!-- AIRPORTS -->⁡
        <!-- TABLA AIRPORTS MOSTRAR/DELETE-->
        <section v-if="tableToShow === '2' && selectedOptionCrud === '1'">
            <table id="tableAirports" class="text-sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>ICAO</th>
                        <th>Nombre</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Eliminar</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="airport in airports" :key="airports.id">
                        <td>{{ airport.id }}</td>
                        <td>{{ airport.ICAO }}</td>
                        <td>{{ airport.name }}</td>
                        <td>{{ airport.LAT }}</td>
                        <td>{{ airport.LON }}</td>
                        <td class="flex items-center justify-center">
                            <input type="checkbox" name="" id="" class="flex items-center justify-center"
                                v-model="selectedRowsAirports" :value="airport.id">
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn" @click="deleteSelectedAirports">Borrar selección</button>
        </section>


        <!-- TABLA AIRPORT CREAR -->
        <section v-if="tableToShow === '2' && selectedOptionCrud === '2'">
            <form class="flex flex-col justify-center items-center">
                <label for="">ICAO</label>
                <input v-model="ICAO" type="text" name="" id="">
                <label for="">Nombre</label>
                <input v-model="name" type="text" name="" id="">
                <label for="">Latitud</label>
                <input v-model="LAT" type="text" name="" id="">
                <label for="">Longitud</label>
                <input v-model="LON" type="text" name="" id="">
                <button class="btn" @click="createAirport">Crear Aeropuerto</button>
            </form>
        </section>



        <!-- TABLA USUARIOS -->
        <section v-if="tableToShow === '3' && selectedOptionCrud === '1'">
            <table id="tablaUsers">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Contraseña</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td>Usuario</td>
                        <td>Email</td>
                        <td>Contraseña</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>

<script setup>

const selectedOptionTable = ref("0");
const selectedOptionCrud = ref("0");
const tableToShow = ref("0");

// ⁡⁢⁣⁢𝗔𝗜𝗥𝗖𝗥𝗔𝗙𝗧𝗦⁡ 
const aircrafts = ref([]);
const loadTable = async () => {
    tableToShow.value = selectedOptionTable.value;

    if (selectedOptionTable.value === "1" && selectedOptionCrud.value === "1") {
        const data = await $fetch("aircrafts/aircrafts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        aircrafts.value = data.db;
        // console.log(data);
    }
}

const selectedRows = ref([]);
const deleteSelectedAircrafts = async () => {
    const data = await $fetch("aircrafts/aircrafts", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            selectedRows: selectedRows.value,
        }),
    });
    // console.log('seleccionados: ', selectedRows.value)
    // console.log(data);
    loadTable();
}

const modelo = ref("");
const matricula = ref("");
const velocidad = ref("");
const turbulence = ref("");
const combustible = ref("");
const img = ref("");

const createAircraft = async () => {
    const data = await $fetch("aircrafts/aircrafts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            modelo: modelo.value,
            matricula: matricula.value,
            velocidad: velocidad.value,
            turbulence: turbulence.value,
            combustible: combustible.value,
            img: img.value,
        }),
    });
    // console.log(data);
}

// ⁡⁢⁣⁢𝗔𝗜𝗥𝗣𝗢𝗥𝗧𝗦
const airports = ref([])
const loadTableAirports = async () => {
    tableToShow.value = selectedOptionTable.value;

    if (selectedOptionTable.value === "2" && selectedOptionCrud.value === "1") {
        const data = await $fetch("airports/airports", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        airports.value = data.db;
        // console.log(data.db);
    }
}


const selectedRowsAirports = ref([])
const deleteSelectedAirports = async () => {
    const data = await $fetch("airports/airports", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            selectedRows: selectedRowsAirports.value,
        }),
    });
    console.log(data);
    // console.log('seleccionados: ', selectedRowsAirports.value)
    loadTableAirports();
}

const ICAO = ref("");
const name = ref("");
const LAT = ref("");
const LON = ref("");

const createAirport = async () => {
    try {
        const data2 = await $fetch('airports/airports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ICAO: ICAO.value,
                name: name.value,
                LAT: LAT.value,
                LON: LON.value
            })
        
        })
        console.log("PULSANDO BOTON CREAR AEROPUERTO")
        console.log('DATA2  ',data2)
        console.log("ICAO.value: ", ICAO.value)
        console.log("name.value: ", name.value)
        console.log("LAT.value: ", LAT.value)
        console.log("LON.value: ", LON.value)
    } catch (error) {
        console.error("Error creating airport:", error);
    }

    
}
// airports\airports.post.js
</script>

<style scoped></style>