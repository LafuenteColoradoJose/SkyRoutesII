<template>
    <section class="flex flex-col">
        <h2 class="text-2xl font-semibold m-auto mb-6">Users</h2>

        <div class="m-auto">
            <button @click="OpenModalCreate" class="btn-xs border rounded-md">Crear Usuario</button>
        </div>
        <dialog id="modalCreate" class="modal">
            <div class="modal-box">
                <span class="text-center font-bold"> {{ textResponse }}</span>
                <form class="flex flex-col justify-center items-center" v-on:submit.prevent="">
                    <label for="">Nombre</label>
                    <input v-model.trim="name" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Usuario</label>
                    <input v-model.trim="user" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Email</label>
                    <input v-model.trim="email" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <label for="">Password</label>
                    <input v-model.trim="password" type="text" name="" id="" class="input input-bordered w-full max-w-xs"
                        required>
                    <button class="btn btn-ghost border border-gray-700 my-2" @click="createUser">Crear
                        Usuario</button>
                </form>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>

        <div class="flex justify-center mt-4 mb-4 gap-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn">Anterior</button>
            <div>Página {{ currentPage }} de {{ totalPages }}</div>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn">Siguiente</button>
        </div>

        <table id="tableUsers" class="table w-full">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th class="hidden lg:table-cell">Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.user }}</td>
                    <td class="hidden lg:table-cell">{{ user.email }}</td>
                    <td>
                        <div v-if=user.id class="flex flex-col gap-1 lg:flex-row  lg:gap-2 justify-center">
                            <button @click="showDetails(user)" class="btn-xs border rounded-md lg:hidden">Mostrar</button>
                            <button @click="editUser(user)" class="btn-xs border rounded-md">Editar</button>
                            <button @click="deleteUser(user)" class="btn-xs border rounded-md">Eliminar</button>
                        </div>
                        <div v-else class="opacity-[0.01] flex flex-col gap-1 lg:flex-row  lg:gap-2 justify-center">
                            <span class="border rounded-md lg:hidden">Mostrar</span>
                            <span class="border rounded-md">Editar</span>
                            <span class="border rounded-md">Eliminar</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <dialog id="modalDetails" class="modal">
            <div class="modal-box">
                <table id="tableUsers" class="table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{{ userDetails.id }}</td>
                        </tr>
                        <tr>
                            <th>Nombre</th>
                            <td>{{ userDetails.name }}</td>
                        </tr>
                        <tr>
                            <th>Usuario</th>
                            <td>{{ userDetails.user }}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{ userDetails.email }}</td>
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
                            <span class="font-mono italic"> {{ name }}</span>
                            <label for="">Nuevo nombre</label>
                            <input v-model.trim="nameModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ user }}</span>
                            <label for="">Nuevo Usuario</label>
                            <input v-model.trim="userModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                        <article class="flex flex-col justify-center items-center mb-6">
                            <span class="font-mono italic"> {{ email }}</span>
                            <label for="">Nuevo email</label>
                            <input v-model.trim="emailModificar" type="text" name="" id=""
                                class="input input-bordered w-full max-w-xs">
                        </article>
                       
                    </div>

                    <button class="btn btn-ghost border border-gray-700 my-2 w-fit" @click="updateUser">Modificar
                        Usuario</button>
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

const users = ref([]);
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

    await showAllUsers();
});

const showAllUsers = async () => {
    const data = await $fetch("../users/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    users.value = data.db;
};

let paginatedUsers = computed(() => {
    let start = (currentPage.value - 1) * perPage;
    let end = start + perPage;
    let slice = users.value.slice(start, end);

    while (slice.length < perPage) {
        slice.push({});
    }

    return slice;
});

let totalPages = computed(() => Math.ceil(users.value.length / perPage));

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

const name = ref("");
const user = ref("");
const email = ref("");
const password = ref("");
const textResponse = ref("");

const createUser = async () => {
    try {
        const response = await $fetch("../users/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                user: user.value,
                email: email.value,
                password: password.value,
                
            }),
        });

        textResponse.value = "Usuario creado correctamente";
        name.value = '';
        user.value = '';
        email.value = '';
        password.value = '';
        
        await showAllUsers();
    } catch (error) {
        textResponse.value = "Error al crear el usuario";
    }
};

const userDetails = ref('');
const showDetails = async (userShow) => {
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === userShow.id) {
            userDetails.value = users.value[i];
        }
    }
    await modalDetails.showModal();
};


const editUser = async (userEdit) => {
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === userEdit.id) {
            name.value = users.value[i].name;
            user.value = users.value[i].user;
            email.value = users.value[i].email;
            password.value = users.value[i].password;
            userForEditId.value = users.value[i].id;
        }
    }
    await modalEdit.showModal();
};

const userForEditId = ref('');
const nameModificar = ref("");
const userModificar = ref("");
const emailModificar = ref("");
const passwordModificar = ref("");

const updateUser = async () => {
    try {
        const response = await $fetch("../users/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userForEditId.value,
                name: nameModificar.value,
                user: userModificar.value,
                email: emailModificar.value,
                password: passwordModificar.value,
                
            }),
        });

        textResponse.value = "Usuario modificado correctamente";
        nameModificar.value = '';
        userModificar.value = '';
        emailModificar.value = '';
        passwordModificar.value = '';
        await showAllUsers();
    } catch (error) {
        textResponse.value = "Error al modificar el usuario";
    }
};

const deleteUser = async (userDelete) => {
    try {
        const response = await $fetch("../users/users", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userDelete.id,
            }),
        });
        textResponse.value = "Usuario eliminado correctamente";
        await showAllUsers();
    } catch (error) {
        textResponse.value = "Error al eliminar el usuario";
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
