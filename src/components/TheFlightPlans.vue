<template>
    <section class="flex flex-col justify-center">

        <h1 class="text-4xl text-center m-7">Flight Plans</h1>

        <div class="flex flex-col justify-around w-full px-5">

            <form class="flex flex-col text-center" @submit.prevent="enviarDatos">

                <nav>
                    <button class="btn normal-case text-xl" @click="deleteSelected">Borrar seleccionados</button>

                </nav>

                <div class="overflow-x-auto">
    <table class="table w-full">
        <thead>
            <tr>
                <th>Select</th>
                <th>Origen</th>
                <th>Destino</th>
                <th class="hidden sm:table-cell">Distancia</th>
                <th class="hidden sm:table-cell">Altitud</th>
                <th class="hidden sm:table-cell">Waypoints</th>
                <th class="hidden sm:table-cell">Aircraft</th>
                <th>Fecha</th>
                <th>Licencia</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fp in dataFP" :key="fp.id">
                <td><input type="checkbox" v-model="selectedRows" :value="fp.id"></td>
                <td>{{ fp.fpOrigin }}</td>
                <td>{{ fp.fpDestination }}</td>
                <td class="hidden sm:table-cell">{{ fp.distance }}</td>
                <td class="hidden sm:table-cell">{{ fp.maxAltitude }}</td>
                <td class="hidden sm:table-cell">{{ fp.waypoints }}</td>
                <td class="hidden sm:table-cell">{{ fp.idAircraft }}</td>
                <td>{{ formatDate(fp.date) }}</td>
                <td>{{ fp.license }}</td>
            </tr>
        </tbody>
    </table>
</div>

            </form>
        </div>

    </section>
</template>

<script setup>

let dataFP = ref([])
const userId = ref(useCookie('userId'))
const enviarDatos = async () => {
    const response = await $fetch(`/fp/fp?userId=${userId.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    dataFP.value = response.db
};

onMounted(() => {
    enviarDatos()
})

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

let selectedRows = ref([])
const deleteSelected = async () => {
    const response = await $fetch('/fp/fp', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selectedRows: selectedRows.value
        })
    })


    let rowsAffected = response.res.reduce((total, current) => total + current, 0);
    console.log(rowsAffected)

    if (rowsAffected > 0) {
        swal('Plan de vuelo eliminado correctamente')
        if (window !== undefined) {
            setInterval(() => {
                window.location.reload()
            }, 2000)    
        }
    } else {
        swal('Error al eliminar el plan de vuelo')
    }
}

</script>