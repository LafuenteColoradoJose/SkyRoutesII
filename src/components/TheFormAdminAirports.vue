<template>
    <section class="flex flex-col h-full ">
        <h2 class="text-2xl font-semibold m-auto mb-6">Airport</h2>

        <div class="m-auto">
            <button @click="OpenModalCreate" class="btn-xs border rounded-md">Crear Aeropuerto</button>
        </div>
        <!-- Modal crear -->
        <dialog id="modalCreate" class="modal">
            <div class="modal-box">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <!-- TABLA AIRCRAFTS CREAR -->
                <form class="flex flex-col justify-center items-center" v-on:submit.prevent="">
                    <label for="">ICAO</label>
                    <input v-model.trim="ICAO" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Nombre</label>
                    <input v-model.trim="name" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">LAT</label>
                    <input v-model.trim="LAT" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">LON</label>
                    <input v-model.trim="LON" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <button class="btn btn-ghost border border-gray-700 my-2" @click="createAirport">Crear
                        Aeropuerto</button>
                </form>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- PAGINACIÓN -->
        <div class="flex justify-center mt-4 mb-4 gap-4">
            <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            <div>Página {{ currentPage }} de {{ totalPages }}</div>
            <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
        </div>

        <!-- Mostrar aeronaves -->
        <table id="tableAirports" class="table w-full">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>ICAO</th>
                    <th>Nombre</th>
                    <th class="hidden lg:table-cell">LAT</th>
                    <th class="hidden lg:table-cell">LON</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="airport in paginatedAirports" :key="airport.id">
                    <td>{{ airport.id }}</td>
                    <td>{{ airport.ICAO }}</td>
                    <td>{{ airport.name }}</td>
                    <td class="hidden lg:table-cell">{{ airport.LAT }}</td>
                    <td class="hidden lg:table-cell">{{ airport.LON }}</td>
                    <td class="flex flex-col gap-1 lg:flex-row  lg:gap-2">
                        <button @click="showDetails(airport)" class="btn-xs border rounded-md lg:hidden">Mostrar</button>
                        <button @click="editAirport(airport)" class="btn-xs border rounded-md">Editar</button>
                        <button @click="deleteAirport(airport)" class="btn-xs border rounded-md">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- DETAILS AEROPUERTOS MODAL -->
        <dialog id="modalDetails" class="modal">
            <div class="modal-box">
                <table id="tableAirports" class="table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{{ airportDetails.id }}</td>
                        </tr>
                        <tr>
                            <th>IACO</th>
                            <td>{{ airportDetails.ICAO }}</td>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <td>{{ airportDetails.name }}</td>
                        </tr>
                        <tr>
                            <th>Latitud</th>
                            <td>{{ airportDetails.LAT }}</td>
                        </tr>
                        <tr>
                            <th>Longitud</th>
                            <td>{{ airportDetails.LON }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- MODAL AEROPUERTOS EDITAR -->
        <dialog id="modalEdit" class="modal">
            <div class="modal-box text-center">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <!-- TABLA AIRPORTS EDITAR -->
                <form v-on:submit.prevent="" class="lg:flex lg:flex-col lg:gap-3 lg:items-center lg:justify-between">
                    <div class="lg:flex lg:flex-wrap lg:gap-3">
                        <article class="flex flex-col justify-center items-center mb-8">
                            <span class="font-mono italic"> {{ ICAO }}</span>
                            <label for="">Nuevo ICAO</label>
                            <input v-model.trim="ICAOModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ name }}</span>
                            <label for="">Nueva Nombre</label>
                            <input v-model.trim="nameModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ LAT }}</span>
                            <label for="">Nueva Latitud</label>
                            <input v-model.trim="LATModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ LON }}</span>
                            <label for="">Nueva Longitud</label>
                            <input v-model.trim="LONModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                    </div>

                    <button class="btn btn-ghost border border-gray-700 my-2 w-fit" @click="updateAirport">Modificar
                        Aeropuerto</button>
                </form>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- MODAL ELIMINAR -->
        <dialog id="modalDelete" class="modal">
            <div class="modal-box">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const airports = ref([]);
let currentPage = ref(1);
let perPage = 3;


onMounted(async () => {
    if (window.innerWidth < 640) {
        perPage = 3;
    } else if (window.innerWidth < 768) {
        perPage = 3;
    } else if (window.innerWidth < 1024) {
        perPage = 5;
    } else {
        perPage = 6;
    }

    await showAllAirports();
});

const showAllAirports = async () => {
    const data = await $fetch("../airports/airports", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    airports.value = data.db;
};

let paginatedAirports = computed(() => {
    let start = (currentPage.value - 1) * perPage;
    return airports.value.slice(start, start + perPage);
});

let totalPages = computed(() => Math.ceil(airports.value.length / perPage));

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// CREAR AEROPUERTO

const OpenModalCreate = () => {
    modalCreate.showModal();
};

const ICAO = ref("");
const name = ref("");
const LAT = ref("");
const LON = ref("");
const textResponse = ref("");

const createAirport = async () => {
    try {
        const response = await $fetch("../airports/airports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ICAO: ICAO.value,
                name: name.value,
                LAT: LAT.value,
                LON: LON.value,
                
            }),
        });

        textResponse.value = "Aeropuerto creado correctamente";
        ICAO.value = '';
        name.value = '';
        LAT.value = '';
        LON.value = '';
        
        await showAllAirports();
    } catch (error) {
        console.log(error);
        textResponse.value = "Error al crear el aeropuerto";
    }
};

// MOSTRAR AERONAVE
const airportDetails = ref('');
const showDetails = async (airportShow) => {
    console.log(airportShow);
    for (let i = 0; i < airports.value.length; i++) {
        if (airports.value[i].id === airportShow.id) {
            airportDetails.value = airports.value[i];
            console.log(airportDetails.value);
        }
    }
    await modalDetails.showModal();
};


// EDITAR AEROPUERTO
const editAirport = async (airportEdit) => {
    // console.log(airportEdit);
    for (let i = 0; i < airports.value.length; i++) {
        if (airports.value[i].id === airportEdit.id) {
            ICAO.value = airports.value[i].ICAO;
            name.value = airports.value[i].name;
            LAT.value = airports.value[i].LAT;
            LON.value = airports.value[i].LON;
            airportForEditId.value = airports.value[i].id;
        }
    }
    await modalEdit.showModal();
};

const airportForEditId = ref('');
const ICAOModificar = ref("");
const nameModificar = ref("");
const LATModificar = ref("");
const LONModificar = ref("");

const updateAirport = async () => {
    console.log(airportForEditId.value)
    try {
        const response = await $fetch("../airports/airports", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: airportForEditId.value,
                ICAO: ICAOModificar.value,
                name: nameModificar.value,
                LAT: LATModificar.value,
                LON: LONModificar.value,
                
            }),
        });

        textResponse.value = "Aeropuerto modificado correctamente";
        ICAOModificar.value = '';
        nameModificar.value = '';
        LATModificar.value = '';
        LONModificar.value = '';
        await showAllAirports();
    } catch (error) {
        console.log(error);
        textResponse.value = "Error al modificar el aeropuerto";
    }
};

// ELIMINAR AEROPUERTO
const deleteAirport = async (airportDelete) => {
    try {
        const response = await $fetch("../airports/airports", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: airportDelete.id,
            }),
        });
        textResponse.value = "Aeropuerto eliminado correctamente";
        await showAllAirports();
    } catch (error) {
        console.log(error);
        textResponse.value = "Error al eliminar el aeropuerto";
    }
    await modalDelete.showModal();
};


</script>

<style scoped>
section {
    background-image: url('/imgs/cockpit.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* width: 100vw;
    height: 100%; */
}
</style>
