<template>
    <section class="flex flex-col">
        <h2 class="text-2xl font-semibold m-auto mb-6">Aircrafts</h2>

        <div class="m-auto">
            <button @click="OpenModalCreate" class="btn-xs border rounded-md">Crear Aeronave</button>
        </div>
        <dialog id="modalCreate" class="modal">
            <div class="modal-box">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <form class="flex flex-col justify-center items-center" v-on:submit.prevent="">
                    <label for="">Modelo</label>
                    <input v-model.trim="modelo" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Matrícula</label>
                    <input v-model.trim="matricula" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Velocidad</label>
                    <input v-model.trim="velocidad" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Turbulence</label>
                    <input v-model.trim="turbulence" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Combustible</label>
                    <input v-model.trim="combustible" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Img</label>
                    <input v-model.trim="img" type="text" name="" id="" class="input input-bordered w-full max-w-xs">
                    <button class="btn btn-ghost border border-gray-700 my-2" @click="createAircraft">Crear
                        Aeronave</button>
                </form>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <div class="flex justify-center mt-4 mb-4 gap-4 w-auto items-center">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn">Anterior</button>
            <div class="font-extrabold">Página {{ currentPage }} de {{ totalPages }}</div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn">Siguiente</button>
        </div>

        <table id="tableAircrafts" class="table text-center">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Modelo</th>
                    <th>Matrícula</th>
                    <th class="hidden lg:table-cell">Velocidad</th>
                    <th class="hidden lg:table-cell">Turbulence</th>
                    <th class="hidden lg:table-cell">Combustible</th>
                    <th class="hidden lg:table-cell">img</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="aircraft in paginatedAircrafts" :key="aircraft.id">
                    <td>{{ aircraft.id }}</td>
                    <td>{{ aircraft.modelo }}</td>
                    <td>{{ aircraft.matricula }}</td>
                    <td class="hidden lg:table-cell">{{ aircraft.velocidad }}</td>
                    <td class="hidden lg:table-cell">{{ aircraft.turbulence }}</td>
                    <td class="hidden lg:table-cell">{{ aircraft.combustible }}</td>
                    <td class="hidden lg:table-cell">{{ aircraft.img }}</td>
                    <td class="">
                        <div v-if="aircraft.id" class="flex flex-col gap-1 lg:flex-row  lg:gap-2 justify-center">
                            <button @click="showDetails(aircraft)" class="btn-xs border rounded-md lg:hidden">Mostrar</button>
                            <button @click="editAircraft(aircraft)" class="btn-xs border rounded-md">Editar</button>
                            <button @click="deleteAircraft(aircraft)" class="btn-xs border rounded-md">Eliminar</button>
                        </div>
                        <div v-else class="opacity-[0.01] flex flex-col gap-1 lg:flex-row  lg:gap-2 justify-center">
                            <span class="btn-xs border rounded-md lg:hidden">Mostrar</span>
                            <span class="btn-xs border rounded-md">Editar</span>
                            <span class="btn-xs border rounded-md">Eliminar</span>
                        </div>
                        
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog id="modalDetails" class="modal">
            <div class="modal-box">
                <table id="tableAircrafts" class="table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{{ aircraftDetails.id }}</td>
                        </tr>
                        <tr>
                            <th>Modelo</th>
                            <td>{{ aircraftDetails.modelo }}</td>
                        </tr>
                        <tr>
                            <th>Matrícula</th>
                            <td>{{ aircraftDetails.matricula }}</td>
                        </tr>
                        <tr>
                            <th>Velocidad</th>
                            <td>{{ aircraftDetails.velocidad }}</td>
                        </tr>
                        <tr>
                            <th>Turbulence</th>
                            <td>{{ aircraftDetails.turbulence }}</td>
                        </tr>
                        <tr>
                            <th>Combustible</th>
                            <td>{{ aircraftDetails.combustible }}</td>
                        </tr>
                        <tr>
                            <th>img</th>
                            <td>{{ aircraftDetails.img }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <dialog id="modalEdit" class="modal">
            <div class="modal-box text-center">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <form v-on:submit.prevent="" class="lg:flex lg:flex-col lg:gap-3 lg:items-center lg:justify-between">
                    <div class="lg:flex lg:flex-wrap lg:gap-3">
                        <article class="flex flex-col justify-center items-center mb-8">
                            <span class="font-mono italic"> {{ modelo }}</span>
                            <label for="">Nuevo modelo</label>
                            <input v-model.trim="modeloModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ matricula }}</span>
                            <label for="">Nueva matrícula</label>
                            <input v-model.trim="matriculaModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ velocidad }}</span>
                            <label for="">Nueva velocidad</label>
                            <input v-model.trim="velocidadModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ turbulence }}</span>
                            <label for="">Nueva turbulence</label>
                            <input v-model.trim="turbulenceModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ combustible }}</span>
                            <label for="">Nuevo combustible</label>
                            <input v-model.trim="combustibleModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ img }}</span>
                            <label for="">Nueva img</label>
                            <input v-model.trim="imgModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                    </div>

                    <button class="btn btn-ghost border border-gray-700 my-2 w-fit" @click="updateAircraft">Modificar
                        Aeronave</button>
                </form>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <dialog id="modalDelete" class="modal">
            <div class="modal-box">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const aircrafts = ref([]);
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

    await showAllAircrafts();
});

const showAllAircrafts = async () => {
    const data = await $fetch("../aircrafts/aircrafts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    aircrafts.value = data.db;
};

let paginatedAircrafts = computed(() => {
    let start = (currentPage.value - 1) * perPage;
    let end = start + perPage;
    let slice = aircrafts.value.slice(start, end);

    while (slice.length < perPage) {
        slice.push({});
    }

    return slice;
});

let totalPages = computed(() => Math.ceil(aircrafts.value.length / perPage));

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

const OpenModalCreate = () => {
    modalCreate.showModal();
};

const modelo = ref("");
const matricula = ref("");
const velocidad = ref("");
const turbulence = ref("");
const combustible = ref("");
const img = ref("");
const textResponse = ref("");

const createAircraft = async () => {
    try {
        const response = await $fetch("../aircrafts/aircrafts", {
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

        textResponse.value = "Aeronave creada correctamente";
        modelo.value = '';
        matricula.value = '';
        velocidad.value = '';
        turbulence.value = '';
        combustible.value = '';
        img.value = '';
        await showAllAircrafts();
    } catch (error) {
        textResponse.value = "Error al crear la aeronave";
    }
};

const aircraftDetails = ref('');
const showDetails = async (aircraftShow) => {
    for (let i = 0; i < aircrafts.value.length; i++) {
        if (aircrafts.value[i].id === aircraftShow.id) {
            aircraftDetails.value = aircrafts.value[i];
        }
    }
    await modalDetails.showModal();
};


const editAircraft = async (aircraftEdit) => {
    for (let i = 0; i < aircrafts.value.length; i++) {
        if (aircrafts.value[i].id === aircraftEdit.id) {
            modelo.value = aircrafts.value[i].modelo;
            matricula.value = aircrafts.value[i].matricula;
            velocidad.value = aircrafts.value[i].velocidad;
            turbulence.value = aircrafts.value[i].turbulence;
            combustible.value = aircrafts.value[i].combustible;
            img.value = aircrafts.value[i].img;
            aircraftForEditId.value = aircrafts.value[i].id;
        }
    }
    await modalEdit.showModal();
};

const aircraftForEditId = ref('');
const modeloModificar = ref("");
const matriculaModificar = ref("");
const velocidadModificar = ref("");
const turbulenceModificar = ref("");
const combustibleModificar = ref("");
const imgModificar = ref("");

const updateAircraft = async () => {
    try {
        const response = await $fetch("../aircrafts/aircrafts", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: aircraftForEditId.value,
                modelo: modeloModificar.value,
                matricula: matriculaModificar.value,
                velocidad: velocidadModificar.value,
                turbulence: turbulenceModificar.value,
                combustible: combustibleModificar.value,
                img: imgModificar.value,
            }),
        });
       

        textResponse.value = "Aeronave modificada correctamente";
        modeloModificar.value = '';
        matriculaModificar.value = '';
        velocidadModificar.value = '';
        turbulenceModificar.value = '';
        combustibleModificar.value = '';
        imgModificar.value = '';
        await showAllAircrafts();
    } catch (error) {
        textResponse.value = "Error al modificar la aeronave";
    }
};

const deleteAircraft = async (aircraftDelete) => {
    try {
        const response = await $fetch("../aircrafts/aircrafts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: aircraftDelete.id,
            }),
        });
        textResponse.value = "Aeronave eliminada correctamente";
        await showAllAircrafts();
    } catch (error) {
        textResponse.value = "Error al eliminar la aeronave";
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
}
</style>
