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
                    <button v-if="!isSubmitted" type="button" @click="solicitarDatos"
                        class="col-span-2 w-full py-4 bg-gradient-to-r from-sky-primary to-sky-secondary hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-primary/30 transform hover:-translate-y-0.5 transition-all">
                        Calcular Ruta
                    </button>

                    <button v-if="isSubmitted" type="button" @click="resetForm"
                        class="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 [.light-mode_&]:text-red-600 border border-red-500/20 rounded-xl transition-all font-medium">
                        Cancelar
                    </button>
                    <button v-if="isSubmitted" type="button" @click="saveFP"
                        class="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 [.light-mode_&]:text-emerald-600 border border-emerald-500/30 rounded-xl transition-all font-medium">
                        Guardar
                    </button>
                </div>
            </div>
        </section>

        <!-- RIGHT COLUMN: MAP -->
        <!-- RIGHT COLUMN: MAP -->
        <section
            class="flex-[3] h-[600px] lg:h-auto min-h-[600px] relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border-subtle)] bg-black/20">

            <!-- HUD (Floating over map) -->
            <div class="absolute top-4 right-4 z-[1000] pointer-events-none">
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
                        <span class="text-xl font-bold font-mono text-[var(--color-text-body)]">{{ bearing }}º</span>
                        <span class="text-xs text-[var(--color-text-muted)] font-mono">{{ distanceBearing }}</span>
                    </div>
                </div>
            </div>

            <!-- Map Container -->
            <div id="map" class="h-full w-full z-0"></div>
        </section>

        <!-- TAF Modal -->
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box bg-sky-900 border border-white/10 text-white">
                <h3 class="font-bold text-lg mb-4">Información TAF</h3>
                <p class="py-4 font-mono text-sm bg-black/30 p-3 rounded-lg whitespace-pre-wrap">{{ modalContent }}</p>
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
import { ref, onMounted, computed, watch } from 'vue'

// Removed static Leaflet imports to fix SSR 'window is not defined' error
// import L from 'leaflet' -> moved to onMounted
// import ... icons -> moved/replaced in onMounted

// Utility to decode Google Polyline Algorithm (Standard precision 5)
const decodePolyline = (str, precision) => {
    let index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    while (index < str.length) {
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
};

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
const userID = useCookie('userId') // Get User ID from Cookie

// Results
const fpDistance = ref('0 nm')
const fpAltitude = ref('0 ft')
const fpWaypoints = ref(0)
const fpDepartureTime = ref('--:--')
const fpArrivalTime = ref('--:--')
const fpMetar = ref('')
const tafData = ref('')
const modalContent = ref('')
const bearing = ref(0)
const bearingCorrect = ref(true)
const distanceBearing = ref('')
const localizacion = ref([40.4167, -3.7037])
const coordSalida = ref([])
const coordLlegada = ref([])
const decodedPolyline = ref([])


// Map Instance
let map = null;
let L = null;
let polylineLayer = null;
let markersLayer = null;

// Aircraft details
const aircraftRegistration = ref('N/A')
const aircraftSpeed = ref(0)
const aircraftFuel = ref(0)
const aircraftTurbulence = ref('N/A')
const aircraftImage = ref('/imgs/Ai1.jpg') // Default placeholder

// Methods
const validarCampo = () => {
    const regex = /^[A-Z]{3}\.FCL\.[0-9]{7}$/;
    isValidLicense.value = flightLicense.value.length > 0;
}

const selectAircraft = () => {
    const ac = aircrafts.value.find(a => a.id === selectedAircraft.value)
    if (ac) {
        aircraftRegistration.value = ac.matricula || 'N/A'
        aircraftSpeed.value = ac.velocidad || 0
        aircraftFuel.value = ac.combustible || 0
        aircraftTurbulence.value = ac.turbulence || 'N/A' // Schema says 'turbulence' but verify if it matches DB property name

        // Image handling: Check 'img' property (as per schema)
        if (ac.img) {
            if (ac.img.startsWith('/') || ac.img.startsWith('http')) {
                aircraftImage.value = ac.img;
            } else {
                // Assume it's in the aircrafts folder in public
                aircraftImage.value = `/aircrafts/${ac.img}`;
            }
        } else {
            aircraftImage.value = '/imgs/Ai1.jpg';
        }
    }
}

const solicitarDatos = async () => {
    if (!origin.value || !destination.value || !selectedAircraft.value) {
        alert("Por favor seleccione aeronave, origen y destino.");
        return;
    }

    isSubmitted.value = true;

    // Find airports
    const originAirport = airports.value.find(a => a.name === origin.value);
    const destAirport = airports.value.find(a => a.name === destination.value);

    if (!originAirport || !destAirport) return;

    // Fetch METAR
    try {
        const metarData = await $fetch('/metar/metar', {
            params: { toICAO: destAirport.ICAO }
        });

        if (metarData && metarData.response) {
            // The response is a JSON string containing both METAR and TAF
            try {
                // If it's already an object, use it directly, otherwise parse
                const parsed = typeof metarData.response === 'string' ? JSON.parse(metarData.response) : metarData.response;
                fpMetar.value = parsed.METAR || "No METAR found";
                tafData.value = parsed.TAF || "No TAF found";
            } catch (errParse) {
                console.error("Error parsing METAR/TAF JSON", errParse);
                fpMetar.value = metarData.response; // Fallback
                tafData.value = "";
            }
        }
    } catch (e) {
        console.warn("Could not fetch METAR:", e);
        fpMetar.value = "";
        tafData.value = "";
    }

    // Parse coordinates (assuming string format in DB)
    const lat1 = parseFloat(originAirport.LAT);
    const lon1 = parseFloat(originAirport.LON);
    const lat2 = parseFloat(destAirport.LAT);
    const lon2 = parseFloat(destAirport.LON);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
        console.error("Invalid coordinates", originAirport, destAirport);
        return;
    }

    let routeLatLons = [];
    let distanceVal = 0;

    try {
        // Fetch Real Flight Plan from Backend Proxy
        // Using PATCH as defined in server/routes/fp/fp.patch.js which calls flightplandatabase.com
        const { response } = await $fetch('/fp/fp', {
            method: 'PATCH',
            body: {
                fromICAO: originAirport.ICAO,
                toICAO: destAirport.ICAO
            }
        });

        if (response && response.length > 0) {
            const plan = response[0];

            // API usually returns data in plan.route.distance or similar
            // But since user says "it paints it on the map", let's assume valid nodes/polyline
            console.log("Plan Loaded:", plan);

            distanceVal = parseFloat(plan.distance) || 0;
            if (distanceVal === 0 && plan.route && plan.route.distance) {
                distanceVal = plan.route.distance;
            }

            fpDistance.value = `${distanceVal.toFixed(0)} nm`;
            fpWaypoints.value = plan.nodes ? plan.nodes.length : (plan.waypoints ? plan.waypoints.length : 0);

            if (plan.nodes) {
                // Map nodes to [lat, lon]
                routeLatLons = plan.nodes.map(n => [n.lat, n.lon]);
            } else if (plan.encodedPolyline) {
                try {
                    routeLatLons = decodePolyline(plan.encodedPolyline);
                    console.log("Decoded polyline points:", routeLatLons.length);
                } catch (errDecode) {
                    console.error("Error decoding polyline, falling back to endpoints", errDecode);
                    routeLatLons = [[lat1, lon1], [lat2, lon2]];
                }
            } else {
                routeLatLons = [[lat1, lon1], [lat2, lon2]];
            }

            // Update waypoints count based on actual route
            fpWaypoints.value = routeLatLons.length;
            fpDistance.value = `${distanceVal.toFixed(0)} nm`;

        } else {
            console.warn("No flight plan found in database (API). Using direct route.");
            throw new Error("No plan found");
        }

    } catch (e) {
        console.warn("Fallback to local calculation:", e);
        // Fallback: Direct Route (Great Circle)
        const dist = calculateDistance(lat1, lon1, lat2, lon2);
        distanceVal = dist;
        fpDistance.value = `${dist.toFixed(0)} nm`;
        fpWaypoints.value = 0;
        routeLatLons = [[lat1, lon1], [lat2, lon2]];
    }




    // Common Updates ( Altitude, Time, Bearing )
    fpAltitude.value = distanceVal > 300 ? '35000 ft' : '12000 ft';

    const speed = aircraftSpeed.value || 100;
    const timeHours = distanceVal / speed;
    const now = new Date();
    fpDepartureTime.value = departureTime.value ? new Date(departureTime.value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const arrivalTime = new Date(now.getTime() + timeHours * 60 * 60 * 1000);
    fpArrivalTime.value = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const b = await calculateBearing(lat1, lon1, lat2, lon2);
    bearing.value = Math.round(b);
    distanceBearing.value = `${distanceVal.toFixed(1)} NM`;

    // Map Updates
    if (map && L && routeLatLons.length > 0) {
        if (!markersLayer) markersLayer = L.layerGroup().addTo(map);

        // Clear previous
        if (polylineLayer) map.removeLayer(polylineLayer);
        markersLayer.clearLayers();

        // Draw Polyline
        polylineLayer = L.polyline(routeLatLons, { color: 'blue', weight: 4 }).addTo(map);

        // Markers
        const originMarker = L.circleMarker([lat1, lon1], {
            radius: 8, color: '#345ca8', fillColor: '#345ca8', fillOpacity: 0.8, weight: 2
        }).bindTooltip("SALIDA", { permanent: true, direction: "top", offset: [0, -10], className: "custom-tooltip" });

        const destMarker = L.circleMarker([lat2, lon2], {
            radius: 8, color: '#345ca8', fillColor: '#345ca8', fillOpacity: 0.8, weight: 2
        }).bindTooltip("LLEGADA", { permanent: true, direction: "top", offset: [0, -10], className: "custom-tooltip" });

        markersLayer.addLayer(originMarker);
        markersLayer.addLayer(destMarker);

        map.fitBounds(polylineLayer.getBounds(), { padding: [50, 50] });
    }
}

const resetForm = () => {
    isSubmitted.value = false;
    flightLicense.value = ''
    selectedAircraft.value = ''
    origin.value = ''
    destination.value = ''

    if (map) {
        if (polylineLayer) map.removeLayer(polylineLayer);
        if (markersLayer) markersLayer.clearLayers();
        map.setView([40.4167, -3.7037], 6);
        bearing.value = 0;
        distanceBearing.value = "";
        fpMetar.value = "";
        tafData.value = "";
    }
}

const saveFP = async () => {
    if (!isSubmitted.value) {
        alert("Por favor calcule la ruta primero.");
        return;
    }

    try {
        const body = {
            fpOrigin: origin.value,
            fpDestination: destination.value,
            distance: parseFloat(fpDistance.value),
            maxAltitude: parseFloat(fpAltitude.value),
            waypoints: String(fpWaypoints.value || 0),
            idAircraft: selectedAircraft.value,
            date: departureTime.value || new Date().toISOString(),
            license: flightLicense.value,
            userID: parseInt(userID.value)
        };

        const { res, error } = await $fetch('/fp/fp', {
            method: 'POST',
            body: body
        });

        if (error) {
            console.error(error);
            alert("Error al guardar el plan de vuelo.");
        } else {
            alert("Plan de vuelo guardado correctamente.");
            resetForm();
        }
    } catch (e) {
        console.error("Error saving flight plan:", e);
        alert("Error de conexión al guardar.");
    }
}

const showTAF = () => {
    modalContent.value = tafData.value || 'TAF no disponible para este aeropuerto.';
}

// Data Fetching
onMounted(async () => {
    // Fetch Data
    try {
        const aircraftsData = await $fetch('/aircrafts/aircrafts');
        if (aircraftsData && aircraftsData.db) {
            aircrafts.value = aircraftsData.db;
        }

        const airportsData = await $fetch('/airports/airports');
        if (airportsData && airportsData.db) {
            airports.value = airportsData.db;
        }
    } catch (e) {
        console.error("Error fetching data:", e);
    }

    if (typeof window !== 'undefined') {
        try {
            // Dynamic import of Leaflet and CSS
            const leafletModule = await import('leaflet');
            L = leafletModule.default || leafletModule;
            await import('leaflet/dist/leaflet.css');

            // Fix default icon issues using CDN
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
            });

            // Init Map
            map = L.map('map', { zoomControl: false }).setView([40.4167, -3.7037], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Init Markers Layer
            markersLayer = L.layerGroup().addTo(map);

            // Add initial marker if needed, or leave blank until route calculation
            L.marker(localizacion.value).addTo(markersLayer);

            // Resize fix just in case
            setTimeout(() => {
                map.invalidateSize();
            }, 200);

        } catch (error) {
            console.error("Error loading Leaflet map:", error);
        }
    }
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