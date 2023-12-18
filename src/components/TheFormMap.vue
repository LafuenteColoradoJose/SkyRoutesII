<template>
    <div id="TheFormMap" class="flex flex-col lg:flex-row lg:mx-6 lg:justify-between lg:gap-4 items-center gap-2">

        <section id="formulario" class="flex h-full">
            <form class=" flex-col text-center space-y-2 h-full" @submit.prevent="solicitarDatos">
                <h2 class="text-3xl">Planes de vuelo</h2>

                <article id="formPilotLisence" class="mb-1">
                    <label for="Nº"></label>
                    <input type="text" v-model.trim="flightLicense" @input="validarCampo"
                        :class="{ 'border-red-800': !isValidLicense, 'border-green-500': isValidLicense, 'rounded-lg': true }"
                        placeholder="Nº de Licencia">
                </article>

                <article id="formAircraft"
                    class=" flex flex-row space-x-2 space-y-3 justify-center content-between items-center">

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

                <article id="formAirport" class="flex flex-row justify-between">
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

                        <div id="date" class="my-2">
                            <input type="datetime-local" name="date" id="date" v-model="departureTime" :min="minDateTime"
                                v-show="!isSubmitted">
                        </div>

                    </div>

                    <div id="dateFP" class="flex flex-col mx-1">
                        <table class="border-separate border-spacing-1 border border-slate-400 rounded">
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


                <section id="metar" class="border border-gray-800 rounded text-center mx-1">


                    <article v-if="fpMetar.length === 0">METAR</article>
                    <div class="flex justify-center align-baseline items-center text-center pb-1">
                        <span class="text-center mr-4"> {{ fpMetar }}</span>
                        <div v-if="fpMetar.length > 0" href="#" @click="showTAF">
                            <button class="btn btn-info" onclick="my_modal_1.showModal()">TAF</button>
                            <dialog id="my_modal_1" class="modal text-start w-screen">
                                <div class="modal-box">
                                    <h3 class="font-bold text-lg">Buen viaje!</h3>
                                    <p class="py-4"> {{ modalContent }} </p>
                                    <div class="modal-action">
                                        <form method="dialog">
                                            <button class="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>


                </section>

                <section id="buttons" class="mb-1 flex justify-around lg:mt-o">

                    <article class="m-2">
                        <button class="btn" type="submit">Solicitar</button>
                    </article>

                    <article id="cancelFP" class=" m-2">
                        <button class="btn" type="submit" @click="resetForm">Cancelar</button>
                    </article>

                    <article class="m-2">
                        <button v-if="fpWaypoints > 0" class="btn" type="submit" @click="saveFP">Guardar</button>
                    </article>

                </section>

            </form>
        </section>


        <section id="contenedorMapa" class="flex justify-center content-center z-0">
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

            </LMap>
        </section>




    </div>
</template>

<script setup>

import { ref } from 'vue'

let flightLicense = ref('')
let isValidLicense = ref(false)

function validarCampo() {
    // Define el patrón de la expresión regular
    var patron = /^ESP\.FCL\.\d{7}$/;
    isValidLicense.value = patron.test(flightLicense.value);
}

let airports = ref([])
let origin = ref('')
let destination = ref('')

const responseAirports = await $fetch('/airports/airports')
airports = await responseAirports.db.map(airport => {
    return {
        name: airport.name,
        ICAO: airport.ICAO
    }
})

let responseAircrafts = ref([])
let aircrafts = ref([])
let aircraftRegistration = ref('Matrícula')
let aircraftTurbulence = ref('Turbulence')
let aircraftFuel = ref('Fuel')
let aircraftSpeed = ref('Speed')
let aircraftImage = ref('/airplaneFormulario.svg')


responseAircrafts = await $fetch('/aircrafts/aircrafts')

aircrafts = await responseAircrafts.db.map(aircraft => {
 
    return aircraft
});

const selectedAircraft = ref(null)
let idAircraft = ref('')

const selectAircraft = async () => {
    for (let aircraft in aircrafts) {
        if (aircrafts[aircraft].id === selectedAircraft.value) {
            aircraftRegistration = aircrafts[aircraft].matricula
            aircraftTurbulence = aircrafts[aircraft].turbulence
            aircraftFuel = String(aircrafts[aircraft].combustible).padStart(5, '0');
            aircraftSpeed = aircrafts[aircraft].velocidad
            aircraftSpeedCalc.value = aircrafts[aircraft].velocidad
            aircraftImage = aircrafts[aircraft].img
            idAircraft = aircrafts[aircraft].id
        }
    }
}



let datosResponse = ref([])
let datos = ref([])

let fpOrigin = ref('ICAO')
let fpDestination = ref('ICAO')
let fpDistance = ref('NM')
let fpAltitude = ref('ft')
let fpWaypoints = ref('Nº')

let fpEncodedPolyline = ref('')

const flightplandatabase = async () => {
    let fromICAO;
    let toICAO;

    for (let airport in airports) {
        if (airports[airport].name === origin.value) {
            fromICAO = airports[airport].ICAO
        }

        if (airports[airport].name === destination.value) {
            toICAO = airports[airport].ICAO
        }
    }

    const data = await $fetch("/fp/fp", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fromICAO: fromICAO,
            toICAO: toICAO,
        }),
    });

    datosResponse = data.response[0]

    datos = datosResponse

    fpOrigin.value = datos.fromICAO
    fpDestination.value = datos.toICAO
    fpDistance.value = parseFloat(datos.distance.toFixed(2)) + " NM"
    fpAltitude.value = datos.maxAltitude.toLocaleString("es-ES") + " ft"
    fpWaypoints.value = datos.waypoints
    fpEncodedPolyline.value = datos.encodedPolyline

}

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

import moment from 'moment'

let departureTime = ref(null)
let fpDepartureTime = ref("HH:mm")
let fpArrivalTime = ref("HH:mm")
let aircraftSpeedCalc = ref()

const flightTime = async () => {
    let departureTimeCalc = moment(departureTime.value);
    let distanciaCalc = parseFloat(fpDistance.value);
    let velocidadCalc = parseFloat(aircraftSpeedCalc.value);
    if (isNaN(distanciaCalc) || isNaN(velocidadCalc)) {
        console.error("distanciaCalc y/o velocidadCalc no son números");
        return;
    }

    let tiempoDeVuelo = distanciaCalc / velocidadCalc;
    let totalMinutos = Math.floor(tiempoDeVuelo * 60);
    let horaSalida = departureTimeCalc;
    let horaLlegada = moment(horaSalida);
    horaLlegada.add(totalMinutos, 'minutes');
    fpDepartureTime.value = moment(departureTime.value).format('HH:mm');
    fpArrivalTime.value = horaLlegada.format('HH:mm');
}

let isSubmitted = ref(false)

let fpMetar = ref('')
let fpTAF = ref('')
const getMetar = async () => {

    let dataMetar = await $fetch('/metar/metar', {
        query: {
            toICAO: fpDestination.value
        }
    }
    )
    fpTAF.value = dataMetar.response.TAF
    fpMetar.value = dataMetar.response.METAR
}

const modalContent = ref('')   

const showTAF = async () => {
    if (fpMetar !== '') {
        await getMetar();
        modalContent.value = fpTAF.value;
    }
};
const solicitarDatos = async () => {

    await flightplandatabase()
    await flightTime()
    await dibujarPolyline()
    await getMetar()
    isSubmitted.value = true
}


const resetForm = () => {

    if (typeof window !== 'undefined') {
        window.location.reload();
    }
};

import swal from 'sweetalert'


const saveFP = async () => {

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
            userID: useCookie('userId'),
            license: flightLicense

        }),
    });

    if (data.res.rowsAffected > 0) {
        swal('Plan de vuelo guardado correctamente')
    } else {
        swal('Error al guardar el plan de vuelo')
    }
}


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
        coordSalida.value = decodedPolyline.value[0]
        coordLlegada.value = decodedPolyline.value[decodedPolyline.value.length - 1]
    }
}

let localizacion = ref([])
onMounted(() => {
    getLocation();
    setInterval(getLocation, 120000);
});

const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            localizacion.value = [position.coords.latitude, position.coords.longitude];
          
        });
    }
}

onMounted(() => {
    if (localizacion.value.length <= 0) {
        swal('Para utilizar el GPS deberá permitir la geolocalización en su navegador.')
    }
});

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
    }

    bearing.value = Math.round(await calculateBearing(lat1.value, lon1.value, lat2.value, lon2.value))
    distanceBearing.value = parseFloat(distance.toFixed(2)) + ' Nm'

    lat3.value = destinationBearing[2]
    lon3.value = destinationBearing[3]

    if (currentIndex > 0) {
        bearingNext.value = Math.round(await calculateBearing(lat1.value, lon1.value, lat3.value, lon3.value))
        if (bearing.value === bearingNext.value) {
            bearingCorrect.value = true
        } else {
            bearingCorrect.value = false
        }
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
    z-index: 999;

    background: rgba(255, 255, 255, 0);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.5px);
    -webkit-backdrop-filter: blur(5.5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

}


@media (max-width: 767px) {

    #formAircraft,
    #formAirport {
        flex-direction: column;
    }

    #contenedorMapa {
        height: 70vh;
        width: 90vw;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    #TheFormMap {
        display: flex;
        flex-direction: column;
    }

    #contenedorMapa {
        height: 70vh;
        width: 90vw;
    }
}

@media (min-width: 1024px) {
    #TheFormMap {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    #contenedorMapa {
        height: 70vh;
        width: 60vw;
    }
}

.alert {
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    color: #fff;
    background-color: rgba(52, 92, 168, 1);

}

.border-red-800 {
    border: 2px solid red;
}

.border-green-800 {
    border: 2px solid green;
}
</style>