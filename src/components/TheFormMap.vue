<template>
    <div id="TheFormMap" class="flex flex-col justify-between items-center gap-2">

        <section class="flex h-full">
            <form class=" flex-col text-center space-y-2 h-full" @submit.prevent="solicitarDatos">
                <div v-if="localizacion[0] === undefined" role="alert" class="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="stroke-current shrink-0 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Para utilizar el GPS deberá permitir la geolocalización en su navegador.</span>
                </div>

                <h2 class="text-3xl">Planes de vuelo</h2>

                <article id="formPilotLisence" class="mb-1">
                    <label for="Nº"></label>
                    <input type="text" v-model.trim="flightLicense" @input="validarCampo"
                        :class="{ 'border-red-800': !isValidLicense, 'border-green-500': isValidLicense, 'rounded-lg': true }"
                        placeholder="Nº de Licencia">
                    <!-- <p>{{ pilotLicense }}</p> -->
                </article>


                <!-- ⁡⁢⁣⁡⁣⁢⁣𝗙𝗢𝗥𝗠𝗨𝗟𝗔𝗥𝗜𝗢 𝗔𝗜𝗥𝗖𝗥𝗔𝗙𝗧⁡⁡ -->
                <article id="formAircraft"
                    class=" flex flex-row space-x-3 space-y-3 justify-center content-between items-center">

                    <div id="aircrafts" class="flex space-x-3 space-y-3 justify-center content-between items-stretch">
                        <span class="mb-3 pt-2">Seleccione Aeronave</span>
                        <select class="select select-bordered w-full max-w-xs" required name="choseAircraft"
                            id="choseAircraft" v-model="selectedAircraft" v-on:change="selectAircraft">
                            <option v-for="(aircraft, index) in aircrafts" :key="index" v-bind:value="aircraft.id">{{
                                aircraft.modelo }}</option>
                        </select>
                    </div>

                    <div id="dataAircarfts" class="flex flex-row space-x-3 space-y-3 justify-center w-full">
                        <table class="border-collapse border border-slate-400 text-xs w-full">
                            <thead>
                                <tr>
                                    <th class="border border-slate-600 ... text-xs h-7 w-7">Matrícula</th>
                                    <th class="border border-slate-600 ... text-xs h-7 w-7">Turbulencia</th>
                                    <th class="border border-slate-600 ... text-xs h-7 w-7">Fuel (Kg)</th>
                                    <th class="border border-slate-600 ... text-xs h-7 w-7">Velocidad (Knots)</th>
                                    <th class="border border-slate-600 ... text-xs h-7 w-7">Aeronave</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border border-slate-600 h-7 w-7">{{ aircraftRegistration }}</td>
                                    <td class="border border-slate-600 h-7 w-7">{{ aircraftTurbulence }}</td>
                                    <td class="border border-slate-600 h-7 w-7">{{ aircraftFuel }}</td>
                                    <td class="border border-slate-600 h-7 w-7">{{ aircraftSpeed }}</td>
                                    <td class="border border-slate-600 h-7 w-7">
                                        <img v-bind:src="aircraftImage" alt="img" id="imgAircraftSelected"
                                            class="w-full h-auto  object-cover">
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                </article>

                <!-- ⁡⁣⁢⁣𝗙𝗢𝗥𝗠𝗨𝗟𝗔𝗥𝗜𝗢 𝗔𝗜𝗥𝗣𝗢𝗥𝗧⁡⁡⁡ -->
                <article id="formAirport" class="flex flex-row justify-between">
                    <!-- 𝗦𝗘𝗟𝗘𝗖𝗧 -->
                    <div id="selectAirport" class="flex flex-col justify-center content-center items-center">

                        <span class="mb-3 pt-2">Seleccione Aeropuerto de salida</span>
                        <select class="select select-bordered w-full max-w-xs" name="origin" id="origin" v-model="origin"
                            required>
                            <option v-for="airport in airports"> {{ airport.name }}</option>
                        </select>


                        <span class="mb-3 pt-2">Seleccione Aeropuerto de salida</span>
                        <select class="select select-bordered w-full max-w-xs" name="destination" id="destination"
                            v-model="destination" required>
                            <option v-for="airport in airports"> {{ airport.name }}</option>
                        </select>

                        <!-- 𝗙𝗘𝗖𝗛𝗔 -->
                        <div id="date" class="my-3">
                            <input type="datetime-local" name="date" id="date" v-model="departureTime" :min="minDateTime"
                                v-show="!isSubmitted">
                        </div>

                    </div>

                    <!-- 𝗗𝗔𝗧𝗢𝗦 -->
                    <div id="dateFP" class="flex flex-col m-2">
                        <table class="border-separate border-spacing-2 border border-slate-400 rounded">
                            <tr>
                                <td>Origen</td>
                                <td>{{ fpOrigin }}</td>
                            </tr>
                            <tr>
                                <td>Destino</td>
                                <td>{{ fpDestination }}</td>
                            </tr>
                            <tr>
                                <td>Distancia</td>
                                <td>{{ fpDistance }}</td>
                            </tr>
                            <tr>
                                <td>Altitud</td>
                                <td> {{ fpAltitude }}</td>
                            </tr>
                            <tr>
                                <td>Waypoints</td>
                                <td>{{ fpWaypoints }}</td>
                            </tr>
                            <tr>
                                <td>Salida</td>
                                <td> {{ fpDepartureTime }} </td>
                            </tr>
                            <tr>
                                <td>Llegada</td>
                                <td> {{ fpArrivalTime }} </td>
                            </tr>

                        </table>
                    </div>
                </article>

                <!-- ⁡⁢⁢⁣𝗠𝗘𝗧𝗔𝗥⁡⁡⁡ -->

                <section id="metar" class="border border-gray-800 rounded text-center">


                    <article>METAR</article>
                    <div class="flex justify-center align-baseline items-center text-center pb-2">
                        <span class="text-center mr-4"> {{ fpMetar }}</span>
                        <div v-if="fpMetar.length > 0" href="#" @click="showTAF">
                            <button class="btn btn-info" onclick="my_modal_1.showModal()">TAF</button>
                            <dialog id="my_modal_1" class="modal text-start w-screen">
                                <div class="modal-box">
                                    <h3 class="font-bold text-lg">Hello!</h3>
                                    <p class="py-4"> {{ modalContent }} </p>
                                    <div class="modal-action">
                                        <form method="dialog">
                                            <!-- if there is a button in form, it will close the modal -->
                                            <button class="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>


                </section>



                ⁡⁣⁢⁣<!-- 𝗕𝗨𝗧𝗧𝗢𝗡S -->⁡
                <section id="buttons" class="mb-5">

                    <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2">
                        <label for=""></label>
                        <button type="submit">Solicitar Plan de vuelo</button>
                    </article>

                    <article id="cancelFP" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2">
                        <label for=""></label>
                        <button type="submit" @click="resetForm">Cancelar Plan Vuelo</button>
                    </article>

                    <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2" v-if="fpWaypoints > 0">
                        <label for=""></label>
                        <button type="submit" @click="saveFP">Guardar plan de vuelo</button>
                    </article>

                </section>

            </form>
        </section>

        <!-- ⁡⁣⁢⁣​‌‌‍𝗠𝗔𝗣𝗔​⁡ -->


        <section id="contenedorMapa" class="container flex justify-center content-center">
            <LMap ref="map" :zoom="zoom" :center="[40.416729, -3.703790]">

                <div id="rumbo">


                    <svg id="rumboIcono" width="48px" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class=" mr-5 md:w-20 xl:w-22"
                        :class="{ 'stroke-green-700': bearingCorrect, 'stroke-red-700': !bearingCorrect }"
                        :style="{ transform: `rotate(${bearing}deg)` }" color="#345ca8">
                        <path
                            d="M3.68478 18.7826L11.5642 4.77473C11.7554 4.43491 12.2446 4.43491 12.4358 4.77473L20.3152 18.7826C20.5454 19.1918 20.1357 19.6639 19.6982 19.4937L12.1812 16.5705C12.0647 16.5251 11.9353 16.5251 11.8188 16.5705L4.30179 19.4937C3.86426 19.6639 3.45463 19.1918 3.68478 18.7826Z"
                            stroke="#345ca8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>


                    <!-- <img id="rumboIcono" src="/icons/maps-arrow.svg" v-if="decodedPolyline.length > 1"
                        :style="{ transform: `rotate(${bearing}deg)`, borderColor: bearing === bearingCorrect ? 'green' : 'red' }" />
                    <img id="rumboIcono" src="/icons/maps-arrow.svg" v-else /> -->
                    <div id="texto" class="flex flex-col text-[#345ca8] font-bold text-2xl">
                        <span id="rumboTexto">{{ bearing }} º</span>
                        <span id="distanciaTexto">{{ distanceBearing }} </span>
                    </div>
                </div>


                <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base" name="OpenStreetMap">
                </LTileLayer>

                <LMarker :lat-lng="localizacion">
                </LMarker>

                <LPolyline v-if="decodedPolyline" :lat-lngs="decodedPolyline" color="red" :weight="4" :opacity="0.9"
                    line-cap="round" line-join="round" />


                <LCircleMarker v-if="coordSalida.length" :lat-lng="coordSalida" :radius="10" :color="'blue'"
                    :fill-color="'blue'" :fill-opacity="0.2" :weight="1" :opacity="0.5" :line-cap="'round'"
                    :line-join="'round'">
                    <LTooltip :permanent="true" :direction="'center'" :offset="[0, 0]">
                        <span>SALIDA</span>
                    </LTooltip>
                </LCircleMarker>


                <LCircleMarker v-if="coordLlegada.length" :lat-lng="coordLlegada" :radius="10" :color="'blue'"
                    :fill-color="'blue'" :fill-opacity="0.2" :weight="1" :opacity="0.5" :line-cap="'round'"
                    :line-join="'round'">
                    <LTooltip :permanent="true" :direction="'center'" :offset="[0, 0]">
                        <span>LLEGADA</span>
                    </LTooltip>
                </LCircleMarker>

                <!-- <l-image-overlay url="/iconAircraft.png" :bounds="[localizacion]" :opacity="1"></l-image-overlay> -->

            </LMap>
        </section>




    </div>
</template>

<script setup>

import { ref } from 'vue'

// ⁡⁢⁢⁣𝗩𝗔𝗟𝗜𝗗𝗔𝗥 𝗟𝗜𝗖𝗘𝗡𝗖𝗜𝗔⁡
let flightLicense = ref('')
let isValidLicense = ref(false)

function validarCampo() {
    // Define el patrón de la expresión regular
    var patron = /^ESP\.FCL\.\d{7}$/;
    isValidLicense.value = patron.test(flightLicense.value);
}

// ⁡⁢⁢⁣Sacar datos aeropuertos⁡
let airports = ref([])
let origin = ref('')
let destination = ref('')

const responseAirports = await $fetch('/airports/airports')
// const airports = await response.db[0].id
airports = await responseAirports.db.map(airport => {
    return {
        name: airport.name,
        ICAO: airport.ICAO
    }
})
// console.log(airports)

// ⁡⁢⁢⁣𝗦𝗮𝗰𝗮𝗿 𝗱𝗮𝘁𝗼𝘀 𝗔𝗲𝗿𝗼𝗻𝗮𝘃𝗲𝘀⁡
let responseAircrafts = ref([])
let aircrafts = ref([])
let aircraftRegistration = ref('Matrícula')
let aircraftTurbulence = ref('Turbulence')
let aircraftFuel = ref('Fuel')
let aircraftSpeed = ref('Speed')
let aircraftImage = ref('/airplane-front-view-silhouette-3.svg')


responseAircrafts = await $fetch('/aircrafts/aircrafts')
// console.log(responseAircrafts)
// console.log(responseAircrafts.db)
// console.log(typeof(responseAircrafts.db))

aircrafts = await responseAircrafts.db.map(aircraft => {
    // console.log(aircraft)
    // console.log(aircraft.modelo)
    // console.log(aircraft.matricula)
    // console.log(aircraft.turbulence)
    // console.log(aircraft.velocidad)
    // console.log(aircraft.combustible)
    // console.log(aircraft.img)
    return aircraft
});

// console.log(typeof(aircrafts))
// console.log(aircrafts)


// ⁡⁢⁢⁣cambiar datos aeronaves⁡
const selectedAircraft = ref(null)
let idAircraft = ref('')

const selectAircraft = async () => {
    // console.log(selectedAircraft.value)
    for (let aircraft in aircrafts) {
        // console.log(aircrafts[aircraft].id)
        if (aircrafts[aircraft].id === selectedAircraft.value) {
            aircraftRegistration = aircrafts[aircraft].matricula
            aircraftTurbulence = aircrafts[aircraft].turbulence
            // aircraftFuel = aircrafts[aircraft].combustible
            aircraftFuel = String(aircrafts[aircraft].combustible).padStart(5, '0');
            aircraftSpeed = aircrafts[aircraft].velocidad
            aircraftSpeedCalc.value = aircrafts[aircraft].velocidad
            aircraftImage = aircrafts[aircraft].img
            idAircraft = aircrafts[aircraft].id
            // console.log(aircraftRegistration)
            // console.log(aircraftTurbulence)
            // console.log(aircraftFuel)
            // console.log(typeof (aircraftFuel))
            // console.log(aircraftSpeed)
            // console.log(typeof (aircraftSpeed))
            // console.log(aircraftImage)
        }
    }
}


// ⁡⁢⁢⁣𝗙𝗣 𝗔𝗣𝗜 𝗜𝗡𝗧𝗘𝗥𝗡𝗔⁡

let datosResponse = ref([])
let datos = ref([])

// console.log(datos)
let fpOrigin = ref('ICAO')
let fpDestination = ref('ICAO')
let fpDistance = ref('NM')
let fpAltitude = ref('ft')
let fpWaypoints = ref('Nº')

let fpEncodedPolyline = ref('')


// let fpDepartureTime = ref('')
// let fpArrivalTime = ref('mm:ss')
// let fpFlightTime = ref('')
// let fpCruiseSpeed = ref('')
// let fpFuelRemaining = ref('')

// console.log(fpOrigin)
// console.log(fpDestination)
// console.log(fpDistance)
// console.log(fpAltitude)
// console.log(fpWaypoints)


// sacar aeropuertos de DD.BB. interna
const flightplandatabase = async () => {
    let fromICAO;
    let toICAO;

    // console.log("fromICAO", fromICAO, "tipo" , typeof fromICAO )
    // console.log("origin.value", origin.value, "tipo" , typeof origin.value)
    // console.log("toICAO", toICAO, "tipo" , typeof toICAO)

    // sacar ICAO de origen y destino
    for (let airport in airports) {
        // console.log(airports[airport].ICAO)
        // console.log(airports[airport].name)
        // console.log(origin.value)
        if (airports[airport].name === origin.value) {
            // console.log("ENCONTRADO:  ", airports[airport].name)
            fromICAO = airports[airport].ICAO
        }

        if (airports[airport].name === destination.value) {
            // console.log("ENCONTRADO:  ", airports[airport].name)
            toICAO = airports[airport].ICAO
        }
    }


    // 𝗦𝗮𝗰𝗮 𝗱𝗮𝘁𝗼𝘀 𝗱𝗲 𝗹𝗮 𝗔𝗣𝗜 interna

    const data = await $fetch("/fp/fp", {
        method: "PATCH", // Hago un PATCH porque no me deja hacer un GET con body
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromICAO: fromICAO,
            toICAO: toICAO,
        }),
    });

    // console.log('data: ', data)
    datosResponse = data.response[0]
    // console.log('datosResponse: ', datosResponse)

    datos = datosResponse
    console.log('DATOS: ', datos)


    fpOrigin.value = datos.fromICAO
    fpDestination.value = datos.toICAO
    fpDistance.value = parseFloat(datos.distance.toFixed(2)) + " NM"
    fpAltitude.value = datos.maxAltitude.toLocaleString("es-ES") + " ft"
    fpWaypoints.value = datos.waypoints
    fpEncodedPolyline.value = datos.encodedPolyline
    //fpDepartureTime = datos.departureTime
    // fpArrivalTime.value = datos.arrivalTime
    // fpFlightTime = datos.flightTime
    // fpCruiseSpeed = datos.cruiseSpeed
    // fpFuelRemaining = datos.fuelRemaining


    // console.log(fpOrigin.value)
    // console.log(fpDestination)
    // console.log(fpDistance)
    // console.log("TIPODE ALTITUD: ",typeof(datos.maxAltitude))
    // console.log(fpWaypoints)

}

// ⁡⁢⁢⁣​‌‍‌𝗙𝗘𝗖𝗛𝗔​⁡

// ⁡⁢⁢⁣CONTROLAR FECHA MÍNIMA DE SALIDA⁡

let minDateTime = ref('');

onMounted(() => {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');

    minDateTime.value = `${year}-${month}-${day}T${hours}:${minutes}`;
});


// ⁡⁢⁢⁣SACAR DATOS DE FECHA⁡

import moment from 'moment'

let departureTime = ref(null)
let fpDepartureTime = ref("HH:mm")
let fpArrivalTime = ref("HH:mm")
let aircraftSpeedCalc = ref()

const flightTime = async () => {
    // Sacar la hora de la fecha de salida
    let departureTimeCalc = moment(departureTime.value);

    // Sacar datos de la distancia
    let distanciaCalc = parseFloat(fpDistance.value);
    // console.log("distanciaCalc", distanciaCalc)

    // Sacar datos de la velocidad
    let velocidadCalc = parseFloat(aircraftSpeedCalc.value);
    // console.log("velocidadCalc", velocidadCalc)

    // Verificar que distanciaCalc y velocidadCalc son números
    if (isNaN(distanciaCalc) || isNaN(velocidadCalc)) {
        console.error("distanciaCalc y/o velocidadCalc no son números");
        return;
    }

    // Calcular la hora de llegada
    let tiempoDeVuelo = distanciaCalc / velocidadCalc; // tiempo en horas
    // console.log("Tiempo de vuelo ", tiempoDeVuelo)
    let totalMinutos = Math.floor(tiempoDeVuelo * 60);
    // console.log("Total minutos ", totalMinutos)

    let horaSalida = departureTimeCalc;
    // console.log("Hora de salida ", horaSalida.format('HH:mm'));

    let horaLlegada = moment(horaSalida); // Clonar horaSalida
    horaLlegada.add(totalMinutos, 'minutes');
    // console.log("Hora de llegada ", horaLlegada.format('HH:mm'));

    fpDepartureTime.value = moment(departureTime.value).format('HH:mm');
    // console.log("fpDepartureTime.value", fpDepartureTime.value)
    fpArrivalTime.value = horaLlegada.format('HH:mm');
    // console.log("fpArrivalTime.value", fpArrivalTime.value)
}

// ⁡⁢⁢⁣desabilitar fecha⁡

let isSubmitted = ref(false)

// ⁡⁢⁢⁣⁡⁢⁢⁣𝗦𝗮𝗰𝗮𝗿 𝗠𝗘𝗧𝗔𝗥 𝗱𝗲 𝗔𝗣𝗜 𝗘𝘅𝘁𝗲𝗿𝗻𝗮⁡

let fpMetar = ref('')
let fpTAF = ref('')
const getMetar = async () => {

    let dataMetar = await $fetch('/metar/metar', {
        query: {
            toICAO: fpDestination.value
        }
    }
    )

    // const { data } = await useFetch(`https://api.flightplandatabase.com/weather/${fpDestination.value}`)
    // const { data } = await useFetch(`https://api.met.no/weatherapi/tafmetar/1.0/metar?extended=false&icao=${fpDestination.value}`)

    // ⁡⁢⁣⁡⁣⁣⁢⁢PRUEBAS CON METAR POR EXECSO DE PLANES DE VUELO DIARIOS A LA API⁡⁡
    // const { data: metar } = await useLazyFetch(`https://api.met.no/weatherapi/tafmetar/1.0/metar?extended=false&icao=LEBA`) // PRUEBAS CON METAR a Noruega
    // console.log(dataMetar)
    // console.log(typeof (dataMetar))
    fpTAF.value = dataMetar.response.TAF
    // console.log(fpTAF.value)
    fpMetar.value = dataMetar.response.METAR
    // console.log(fpMetar.value)
}

// ⁡⁢⁢⁣Mostrar ALERT METAR⁡

const modalContent = ref('')    // Contenido del modal

const showTAF = async () => {
    if (fpMetar !== '') {
        await getMetar();
        modalContent.value = fpTAF.value;
    }
};



// ⁡⁢⁢⁡⁢⁢⁣FUNCIÓN GENERAL PARA MANEJAR EL SUBMIT⁡⁡⁡
const solicitarDatos = async () => {
    //console.log(pilotLicense)
    //console.log(validarCampo(pilotLicense))

    //console.log('pulsar formulario')

    //console.log(`Origen: ${origin.value}`)
    //console.log(`Destino: ${destination.value}`)
    //console.log(`Aeronave: ${aircraft.value}`)

    await flightplandatabase()
    await flightTime()
    await dibujarPolyline()
    await getMetar()
    isSubmitted.value = true

    // console.log('fpEncodedPolyline.value DESDE FORMULARIO: ', fpEncodedPolyline.value)
    // console.log('TIPO DE  ', typeof (fpEncodedPolyline.value))
}


// ⁡⁢⁢⁣FUNCIÓN GENERAL PARA RESETEAR EL FORMULARIO ⁡

// const resetForm = () => {
//     origin.value = ''
//     destination.value = ''
//     selectedAircraft.value = null
//     aircraftRegistration.value = 'Matrícula'
//     aircraftTurbulence.value = 'Turbulence'
//     aircraftFuel.value = 'Fuel'
//     aircraftSpeed.value = 'Speed'
//     aircraftImage.value = 'img'
//     fpOrigin.value = 'ICAO'
//     fpDestination.value = 'ICAO'
//     fpDistance.value = 'NM'
//     fpAltitude.value = 'ft'
//     fpWaypoints.value = 'Nº'
//     fpEncodedPolyline.value = ''
//     fpArrivalTime.value = 'mm:ss'
//     departureTime.value = null
//     aircraftSpeedCalc.value = null
//     fpMetar.value = ''
//     isSubmitted = false

// };

// ⁡⁢⁢⁣Resetear formulario⁡

const resetForm = () => {

    if (typeof window !== 'undefined') {
        window.location.reload();
    }


};

// ⁡⁢⁢⁣𝗚𝗨𝗔𝗥𝗗𝗔𝗥 𝗣𝗟𝗔𝗡 𝗗𝗘 𝗩𝗨𝗘𝗟𝗢⁡
import swal from 'sweetalert'

let userID = ref('')

const saveFP = async () => {
    // console.log('Guardar Plan de Vuelo')

    const data = await $fetch("/fp/fp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fpOrigin: fpOrigin,
            fpDestination: fpDestination,
            fpDistance: fpDistance,
            fpAltitude: fpAltitude,
            fpWaypoints: fpWaypoints,
            idAircraft: idAircraft,
            departureTime: departureTime,
            userID: userID, // Hay que sacar el userID del usuario logueado
            license: flightLicense

        }),
    });

    

    console.log('DATA desde guardarFP:   ', data)
    if (data.res.rowsAffected > 0) {
        swal('Plan de vuelo guardado correctamente')
    } else {
        swal('Error al guardar el plan de vuelo')
    }
}


// ​‌‌‌⁡⁢⁢⁣𝗟Ó𝗚𝗜𝗖𝗔 𝗠𝗔𝗣𝗔​ ⁡

let zoom = ref(5)
import polyline from '@mapbox/polyline';

if (typeof window !== "undefined") {
    if (window.innerWidth <= 767) {
        zoom = 5; // valor de zoom para dispositivos pequeños
    } else if (window.innerWidth <= 850) {
        zoom = 6; // valor de zoom para dispositivos medianos
    }
    else {
        zoom = 6; // valor de zoom para dispositivos grandes
    }

}

// ⁡⁢⁢⁣𝗣𝗢𝗟𝗬𝗟𝗜𝗡𝗘⁡

let decodedPolyline = ref([])
let coordSalida = ref([])
let coordLlegada = ref([])

const dibujarPolyline = () => {
    if (fpEncodedPolyline.value) {
        decodedPolyline.value = polyline.decode(fpEncodedPolyline.value);
        // console.log(fpEncodedPolyline.value)
        // console.log("decodedPolyline" , decodedPolyline.value);
        coordSalida.value = decodedPolyline.value[0]
        coordLlegada.value = decodedPolyline.value[decodedPolyline.value.length - 1]
    }
}

// console.log(fpEncodedPolyline.value)
// console.log(polyline.decode("sfdvFfjvTr`cHtyzEja_BbzoAv|sEv}yC)"))
// const pruebaPolylie = polyline.decode("sfdvFfjvTr`cHtyzEja_BbzoAv|sEv}yC)")


// ⁡⁢⁢⁣𝗚𝗘𝗢𝗟𝗢𝗖𝗔𝗟𝗜𝗭𝗔𝗖𝗜Ó𝗡⁡

let localizacion = ref([])
onMounted(() => {
    getLocation();
    setInterval(getLocation, 120000);
});

const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("La latitud es :", position.coords.latitude);
            // console.log("La longitud es :", position.coords.longitude);
            // console.log("La precisión es :", position.coords.accuracy);
            localizacion.value = [position.coords.latitude, position.coords.longitude];
            console.log(localizacion.value);
        });
    }
}

// ⁡⁢⁢⁣𝗥𝗨𝗠𝗕𝗢⁡

let bearing = ref('Rumbo')
let distanceBearing = ref('Distancia')
let lat1 = ref(0)
let lon1 = ref(0)
let lat2 = ref(0)
let lon2 = ref(0)
let currentIndex = 0
let lat3 = ref(0)
let lon3 = ref(0)
let bearingNext = ref(0)
let bearingCorrect = ref(undefined)


const calculateBearingAndCheckDestination = async () => {
    lat1.value = localizacion.value[0]
    lon1.value = localizacion.value[1]

    if (currentIndex > decodedPolyline.value.length) {
        // Ha llegado a Destino
        alert('Ha llegado a Destino')
        return
    }

    let destinationBearing = decodedPolyline.value[currentIndex]
    lat2.value = destinationBearing[0]
    lon2.value = destinationBearing[1]

    const distance = calculateDistance(lat1.value, lon1.value, lat2.value, lon2.value)
    // const tolerance = distance * 0.1

    if (distance < 0.1) {
        currentIndex++
        bearing.value = Math.round(await calculateBearing(lat1.value, lon1.value, lat2.value, lon2.value))
        console.log("RUMBO", bearing.value)
    }

    bearing.value = Math.round(await calculateBearing(lat1.value, lon1.value, lat2.value, lon2.value))
    console.log("RUMBO", bearing.value)
    // console.log("RUMBO TIPO", typeof bearing.value)

    distanceBearing.value = parseFloat(distance.toFixed(2)) + ' Nm'
    console.log("DISTANCIA", distanceBearing.value)

    // RUMBO CORRECTO

    lat3.value = destinationBearing[2]
    lon3.value = destinationBearing[3]

    // Empiezo a comparar los rumbos cuando llego al punto de salida
    if (currentIndex > 0) {
        bearingNext.value = Math.round(await calculateBearing(lat1.value, lon1.value, lat3.value, lon3.value))
        if (bearing.value === bearingNext.value) {
            bearingCorrect.value = true
        } else {
            bearingCorrect.value = false
        }
        // console.log("RUMBO CORRECTO", bearingCorrect.value)
    }

}

setInterval(calculateBearingAndCheckDestination, 30000)

</script>








<style scope>
#map {
    height: 180px;
}


#rumbo {
    margin: auto;
    margin-top: 2vh;
    padding: 10px;
    width: fit-content;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: col;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* gap: 1rem; */

    /* From https://css.glass */
    background: rgba(255, 255, 255, 0);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.5px);
    -webkit-backdrop-filter: blur(5.5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

}

/* #rumboIcono {
    width: 100%;
    height: auto;
    border: solid 2px transparent;
} */

/* #texto {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: auto;


} */

/* #rumboTexto,
#distanciaTexto {

    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: rgba(52, 92, 168, 1);


} */


/* ⁡⁢⁣⁢𝘿𝙄𝙎𝙋𝙊𝙎𝙄𝙏𝙄𝙑𝙊𝙎 𝙋𝙀𝙌𝙐𝙀Ñ𝙊𝙎⁡ */
@media (max-width: 767px) {

    #formAircraft,
    #formAirport {
        flex-direction: column;
        /* En columna en dispositivos móviles */
    }

    #contenedorMapa {
        height: 70vh;
        width: 90vw;
    }

    /* #rumboIcono {
        width: max-content;
        height: auto;
    } */


}

/* ⁡⁢⁣⁢𝘿𝙄𝙎𝙋𝙊𝙎𝙄𝙏𝙄𝙑𝙊𝙎 𝙈𝙀𝘿𝙄𝘼𝙉𝙊𝙎⁡ */
@media (min-width: 768px) and (max-width: 1023px) {
    #TheFormMap {
        display: flex;
        flex-direction: column;
        /* Por defecto, en columna en pantallas medianas */
    }

    #contenedorMapa {
        height: 70vh;
        width: 90vw;
    }

    /* #rumbo {
        width: 30vw;
        margin-top: 2vh;
    } */

    /* #rumboIcono {
        width: 10vw;
        height: auto;
    } */


}

/* ⁡⁢⁣⁢𝘿𝙄𝙎𝙋𝙊𝙎𝙄𝙏𝙄𝙑𝙊𝙎 𝙂𝙍𝘼𝙉𝘿𝙀𝙎⁡ */
@media (min-width: 1024px) {
    #TheFormMap {
        display: flex;
        flex-direction: row;
        /* Por defecto, en fila en pantallas grandes */
        height: 100%;
    }

    #contenedorMapa {
        height: 70vh;
        width: 60vw;
    }

    /* #rumbo {
        width: 20vw;
        margin-top: 5vh;
    } */

    /* #rumboIcono {
        width: 4vw;
        height: auto;

    } */
}

.alert {
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    color: #fff;
    background-color: rgba(52, 92, 168, 1);

}


/* para validar la licencia */

.border-red-800 {
    border: 2px solid red;
}

.border-green-800 {
    border: 2px solid green;
}
</style>