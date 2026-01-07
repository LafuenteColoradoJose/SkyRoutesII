<template>
    <div id="TheFormMap" class="w-full max-w-[1920px] mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">

        <!-- LEFT COLUMN: FORM -->
        <section class="flex-1 min-w-[350px] lg:max-w-md xl:max-w-xl flex flex-col gap-6">
            <!-- Card Wrapper -->
            <div
                class="backdrop-blur-xl bg-[var(--color-card-bg)] rounded-2xl p-6 space-y-6 border border-[var(--color-border-subtle)] shadow-xl">
                <h2 class="text-2xl font-bold text-[var(--color-text-heading-from)] mb-4">Plan de Vuelo</h2>

                <!-- License -->
                <div class="space-y-2">
                    <label class="text-sm text-[var(--color-text-muted)] font-medium ml-1">Licencia de Vuelo</label>
                    <input type="text" v-model.trim="flightLicense" @input="validarCampo"
                        :class="['w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border focus:ring-2 transition-all outline-none text-[var(--color-text-body)]', isValidLicense ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20' : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20']"
                        placeholder="ESP.FCL.xxxxxxx" />
                </div>

                <!-- Aircraft Selection -->
                <div class="space-y-4">
                    <label class="text-sm text-[var(--color-text-muted)] font-medium ml-1">Aeronave</label>
                    <select v-model="selectedAircraft" @change="selectAircraft"
                        class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary text-[var(--color-text-body)] outline-none appearance-none cursor-pointer">
                        <option disabled selected value="">Selecciona una aeronave</option>
                        <option v-for="(aircraft, index) in aircrafts" :key="index" :value="aircraft.id">
                            {{ aircraft.modelo }}
                        </option>
                    </select>

                    <!-- Aircraft Info Grid -->
                    <div v-if="selectedAircraft"
                        class="grid grid-cols-2 gap-4 bg-sky-primary/10 rounded-xl p-4 border border-sky-primary/20">
                        <div>
                            <span class="text-xs text-[var(--color-text-muted)] block">Matrícula</span>
                            <span class="text-[var(--color-text-body)] font-mono">{{ aircraftRegistration }}</span>
                        </div>
                        <div>
                            <span class="text-xs text-[var(--color-text-muted)] block">Velocidad</span>
                            <span class="text-[var(--color-text-body)] font-mono">{{ aircraftSpeed }} kts</span>
                        </div>
                        <div>
                            <span class="text-xs text-[var(--color-text-muted)] block">Combustible</span>
                            <span class="text-[var(--color-text-body)] font-mono">{{ aircraftFuel }} kg</span>
                        </div>
                        <div>
                            <span class="text-xs text-[var(--color-text-muted)] block">Turbulencia</span>
                            <span class="text-[var(--color-text-body)] font-mono">{{ aircraftTurbulence }}</span>
                        </div>
                        <div class="col-span-2 mt-2">
                            <img :src="aircraftImage" alt="Aircraft Preview"
                                class="w-full h-32 object-cover rounded-lg border border-[var(--color-border-subtle)] bg-black/20">
                        </div>
                    </div>
                </div>

                <!-- Route Selection -->
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm text-[var(--color-text-muted)] font-medium ml-1">Origen</label>
                            <select v-model="origin"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary text-[var(--color-text-body)] outline-none appearance-none cursor-pointer">
                                <option v-for="airport in airports" :key="airport.ICAO">{{ airport.name }}</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm text-[var(--color-text-muted)] font-medium ml-1">Destino</label>
                            <select v-model="destination"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary text-[var(--color-text-body)] outline-none appearance-none cursor-pointer">
                                <option v-for="airport in airports" :key="airport.ICAO">{{ airport.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm text-[var(--color-text-muted)] font-medium ml-1">Hora de Salida</label>
                        <input type="datetime-local" v-model="departureTime" :min="minDateTime" v-show="!isSubmitted"
                            class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary text-[var(--color-text-body)] text-sm outline-none" />
                    </div>
                </div>

                <!-- Flight Data Stats -->
                <div v-if="isSubmitted"
                    class="bg-[var(--color-input-bg)] rounded-xl p-4 border border-[var(--color-border-subtle)] space-y-2 animate-fade-in">
                    <div class="flex justify-between text-sm"><span
                            class="text-[var(--color-text-muted)]">Distancia</span>
                        <span class="text-[var(--color-text-body)] font-mono">{{ fpDistance }}</span>
                    </div>
                    <div class="flex justify-between text-sm"><span
                            class="text-[var(--color-text-muted)]">Altitud</span>
                        <span class="text-[var(--color-text-body)] font-mono">{{ fpAltitude }}</span>
                    </div>
                    <div class="flex justify-between text-sm"><span
                            class="text-[var(--color-text-muted)]">Waypoints</span> <span
                            class="text-[var(--color-text-body)] font-mono">{{ fpWaypoints }}</span></div>
                    <div class="border-t border-[var(--color-border-subtle)] my-2 pt-2 flex justify-between text-sm">
                        <span class="text-sky-500">Salida: {{ fpDepartureTime }}</span>
                        <span class="text-sky-500">Llegada: {{ fpArrivalTime }}</span>
                    </div>
                </div>

                <!-- METAR -->
                <div v-if="fpMetar" class="p-4 bg-sky-900/20 border border-sky-500/30 rounded-xl animate-fade-in">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-xs font-bold text-sky-400">METAR</span>
                        <button @click="showTAF" onclick="my_modal_1.showModal()"
                            class="text-xs px-2 py-1 bg-sky-primary/20 hover:bg-sky-primary/40 text-sky-200 rounded transition-colors">Ver
                            TAF</button>
                    </div>
                    <p class="text-xs font-mono text-[var(--color-text-body)] leading-relaxed">{{ fpMetar }}</p>
                </div>

                <!-- Actions -->
                <div class="grid grid-cols-2 gap-3 pt-4">
                    <button type="button" @click="solicitarDatos"
                        class="col-span-2 w-full py-4 bg-gradient-to-r from-sky-primary to-sky-secondary hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-primary/30 transform hover:-translate-y-0.5 transition-all">
                        Calculdar Ruta
                    </button>
                    <button type="button" @click="resetForm"
                        class="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 rounded-xl transition-all">
                        Cancelar
                    </button>
                    <button v-if="fpWaypoints > 0 && fpWaypoints !== 'Nº'" type="button" @click="saveFP"
                        class="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl transition-all">
                        Guardar
                    </button>
                </div>
            </div>
        </section>

        <!-- RIGHT COLUMN: MAP -->
        <section
            class="flex-[3] h-[600px] lg:h-auto min-h-[600px] relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border-subtle)] bg-black/20">
            <ClientOnly>
                <LMap ref="map" :zoom="zoom" :center="[40.416729, -3.703790]" style="height: 100%; width: 100%">

                    <!-- HUD -->
                    <div class="leaflet-top leaflet-right mt-4 mr-4 z-[1000] pointer-events-none">
                        <div
                            class="backdrop-blur-xl bg-[var(--color-card-bg)] px-4 py-2 rounded-lg border border-[var(--color-border-subtle)] flex items-center gap-3 shadow-lg">
                            <!-- Heading Icon -->
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                class="transition-transform duration-500"
                                :class="bearingCorrect ? 'stroke-green-400' : 'stroke-red-400'"
                                :style="{ transform: `rotate(${bearing}deg)` }">
                                <path
                                    d="M3.68478 18.7826L11.5642 4.77473C11.7554 4.43491 12.2446 4.43491 12.4358 4.77473L20.3152 18.7826C20.5454 19.1918 20.1357 19.6639 19.6982 19.4937L12.1812 16.5705C12.0647 16.5251 11.9353 16.5251 11.8188 16.5705L4.30179 19.4937C3.86426 19.6639 3.45463 19.1918 3.68478 18.7826Z"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex flex-col text-right">
                                <span class="text-xl font-bold font-mono text-[var(--color-text-body)]">{{ bearing
                                    }}º</span>
                                <span class="text-xs text-[var(--color-text-muted)] font-mono">{{ distanceBearing
                                    }}</span>
                            </div>
                        </div>
                    </div>

                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&amp;copy; OpenStreetMap contributors" layer-type="base" name="OpenStreetMap" />
                    <LMarker :lat-lng="localizacion"></LMarker>
                    <LPolyline v-if="decodedPolyline" :lat-lngs="decodedPolyline" color="blue" :weight="4"
                        :opacity="0.8" line-cap="round" line-join="round" />
                    <LCircleMarker v-if="coordSalida.length" :lat-lng="coordSalida" :radius="8" color="#345ca8"
                        fill-color="#345ca8" :fill-opacity="0.8" :weight="2">
                        <LTooltip :permanent="true" direction="top" :offset="[0, -10]" class-name="custom-tooltip">
                            SALIDA</LTooltip>
                    </LCircleMarker>
                    <LCircleMarker v-if="coordLlegada.length" :lat-lng="coordLlegada" :radius="8" color="#345ca8"
                        fill-color="#345ca8" :fill-opacity="0.8" :weight="2">
                        <LTooltip :permanent="true" direction="top" :offset="[0, -10]" class-name="custom-tooltip">
                            LLEGADA</LTooltip>
                    </LCircleMarker>
                </LMap>
            </ClientOnly>
        </section>

        <!-- TAF Modal -->
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box bg-sky-900 border border-white/10 text-white">
                <h3 class="font-bold text-lg mb-4">Información TAF</h3>
                <p class="py-4 font-mono text-sm bg-black/30 p-3 rounded-lg">{{ modalContent }}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-sm btn-ghost">Cerrar</button>
                    </form>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// State
const flightLicense = ref('')
const isValidLicense = ref(true)
const selectedAircraft = ref('')
const aircrafts = ref([])
const airports = ref([])
const origin = ref('')
const destination = ref('')
const departureTime = ref('')
const minDateTime = ref(new Date().toISOString().slice(0, 16))
const isSubmitted = ref(false)

// Results
const fpDistance = ref('0 nm')
const fpAltitude = ref('0 ft')
const fpWaypoints = ref(0)
const fpDepartureTime = ref('--:--')
const fpArrivalTime = ref('--:--')
const fpMetar = ref('')
const modalContent = ref('')
const zoom = ref(6)
const localizacion = ref([40.4167, -3.7037])
const decodedPolyline = ref([])
const coordSalida = ref([])
const coordLlegada = ref([])
const bearing = ref(0)
const bearingCorrect = ref(true)
const distanceBearing = ref('')

// Aircraft details
const aircraftRegistration = ref('N/A')
const aircraftSpeed = ref(0)
const aircraftFuel = ref(0)
const aircraftTurbulence = ref('N/A')
const aircraftImage = ref('/imgs/Ai1.jpg') // Default placeholder

// Methods
const validarCampo = () => {
    // Basic validation regex for example
    const regex = /^[A-Z]{3}\.FCL\.[0-9]{7}$/;
    isValidLicense.value = flightLicense.value.length > 0;
}

const selectAircraft = () => {
    const ac = aircrafts.value.find(a => a.id === selectedAircraft.value)
    if (ac) {
        aircraftRegistration.value = ac.matricula || 'N/A'
        aircraftSpeed.value = ac.velocidad || 0
        aircraftFuel.value = ac.combustible || 0
        aircraftTurbulence.value = ac.turbulencia || 'N/A'
        aircraftImage.value = ac.imagen || '/imgs/Ai1.jpg'
    }
}

const solicitarDatos = async () => {
    isSubmitted.value = true;
    // Mock calculation
    fpDistance.value = '150 nm'
    fpAltitude.value = '35000 ft'
    fpWaypoints.value = 5
    fpDepartureTime.value = '10:00'
    fpArrivalTime.value = '11:30'
}

const resetForm = () => {
    isSubmitted.value = false;
    flightLicense.value = ''
    selectedAircraft.value = ''
    origin.value = ''
    destination.value = ''
}

const saveFP = () => {
    alert('Plan guardado (Simulación)')
}

const showTAF = () => {
    modalContent.value = 'TAF LEBL 011100Z 0112/0212 24010KT 9999 scattered 3000...'
}

// Data Fetching (Placeholder)
onMounted(async () => {
    // Mock data population
    aircrafts.value = [
        { id: 1, modelo: 'Boeing 737', matricula: 'EC-ABC', velocidad: 450, combustible: 20000, turbulencia: 'Medium', imagen: '/imgs/Ai1.jpg' },
        { id: 2, modelo: 'Airbus A320', matricula: 'EC-XYZ', velocidad: 440, combustible: 18000, turbulencia: 'Low', imagen: '/imgs/fp3.png' }
    ]
    airports.value = [
        { ICAO: 'LEMD', name: 'Madrid Barajas' },
        { ICAO: 'LEBL', name: 'Barcelona El Prat' }
    ]
})
</script>

<style scoped>
:deep(.leaflet-control-attribution) {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(4px);
    color: #cbd5e1 !important;
}

:deep(.leaflet-control-attribution a) {
    color: #fff !important;
}

:deep(.custom-tooltip) {
    background-color: rgba(15, 23, 42, 0.8) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    color: white !important;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.custom-tooltip::before) {
    border-top-color: rgba(15, 23, 42, 0.8) !important;
}
</style>