<template>
    <div id="contenedorFormularioProfile">
        <h1 class="text-xl font-bold text-center">Editar Perfil</h1>
        <form @submit.prevent="actualizarPerfil" id="formulario" class="form-columns">
            <div id="botonFuera">

                <div class="form-group">
                    <div class="">

                        <label for="nombre">Nombre y Apellido:</label>
                        <input v-model.trim="nombre" type="text" id="nombre" name="nombre" class="input input-bordered"
                            @input="validarNombre" required>
                    </div>
                    <div class="error-container">
                        <div id="nombreError" class="error">{{ nombreError }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <div>
                        <label for="contrasenaActual">Contraseña Actual:</label>
                        <input v-model.trim="contrasenaActual" type="password" id="contrasenaActual" name="contrasenaActual"
                            class="input input-bordered" required>
                    </div>

                    <div class="error-container">
                        <div id="actualPasswordError" class="error">{{ actualPasswordError }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <div>
                        <label for="usuario">Usuario:</label>
                        <input v-model.trim="usuario" type="text" id="usuario" name="usuario" class="input input-bordered"
                            required @input="validarUsuario">
                    </div>

                    <div class="error-container">
                        <div id="usuarioError" class="error">{{ usuarioError }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <div>
                        <div>
                            <label for="email">Email:</label>
                            <input v-model.trim="email" type="email" id="email" name="email" class="input input-bordered"
                                required @input="validarEmail">
                        </div>

                        <div class="error-container">
                            <div id="emailError" class="error">{{ emailError }}</div>
                            <div id="emailOcupado" class="error">{{ emailOcupado }}</div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div>
                        <label for="repetirContrasena">Repetir Contraseña:</label>
                        <input v-model.trim="repetirContrasena" type="password" id="repetirContrasena"
                            name="repetirContrasena" class="input input-bordered" @input="validarConfirmPassword">
                    </div>

                    <div class="error-container">
                        <div id="confirmPasswordError" class="error">{{ confirmPasswordError }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <div>
                        <label for="nuevaContrasena">Nueva Contraseña:</label>
                        <input v-model.trim="nuevaContrasena" type="password" id="nuevaContrasena" name="nuevaContrasena"
                            class="input input-bordered" @input="validarPassword">
                    </div>

                    <div class="error-container">
                        <div id="passwordError" class="error">{{ passwordError }}</div>
                    </div>
                </div>

            </div>

            <div class="text-center m-12">
                <button type="submit" id="guardarCambios">Guardar Cambios</button>
            </div>

        </form>
    </div>
</template>

<script setup>

const userId = ref(useCookie('userId')).value;
let nombre = ref("");
let usuario = ref("");
let email = ref("");
let contrasenaActual = ref("");
let nuevaContrasena = ref("");
let repetirContrasena = ref("");
let contrasenaBase = ref("");

let nombreError = ref("");
let usuarioError = ref("");
let emailError = ref("");
let emailOcupado = ref("");
let actualPasswordError = ref("");
let passwordError = ref("");
let confirmPasswordError = ref("");

onMounted( async ()=> {
    try {
        const response = await $fetch("profiles/profiles", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        const userProfile = response.db[0];
        nombre.value = userProfile.name;
        usuario.value = userProfile.user;
        email.value = userProfile.email;
        contrasenaBase.value = userProfile.password;

    } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
    }
});


async function actualizarPerfil() {
    if (contrasenaActual.value !== contrasenaBase.value) {
        actualPasswordError.value = 'La contraseña actual no es correcta.';
        return;
    }
    actualPasswordError.value = '';

    const data = await $fetch("profiles/profiles", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            name: nombre,
            user: usuario,
            email: email,
            password: contrasenaBase,
            passwordnew: nuevaContrasena
        }),
    });

    reloadNuxtApp({
        path: '/profile',
        ttl: 10000,
    })


};


function validarNombre() {
    const nombrePattern = /^[a-zA-ZÀ-ÿ\s']{2,}\s[a-zA-ZÀ-ÿ\s']{2,}$/u;
    if (!nombrePattern.test(nombre.value)) {
        nombreError.value = 'El nombre y apellido deben tener al menos 2 caracteres.';
    } else {
        nombreError.value = ''
    }
};

function validarUsuario() {
    if (usuario.value.length < 2) {
        usuarioError.value = 'El usuario debe tener al menos 2 caracteres de longitud.';
    } else {
        usuarioError.value = '';
    }
};

function validarEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email.value)) {
        emailError.value = 'El formato del email no es válido, debe cumplir RFC5322.';
    } else {
        emailError.value = '';
    }
};

function validarPassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
    if (!passwordPattern.test(nuevaContrasena.value)) {
        passwordError.value = 'Contraseña no cumple los requisitos.';
    } else {
        passwordError.value = '';
    }
};

function validarConfirmPassword() {
    if (repetirContrasena.value !== nuevaContrasena.value) {
        confirmPasswordError.value = 'Las contraseñas no coinciden.';
    } else {
        confirmPasswordError.value = '';
    }
};

</script>

<style scoped>
#contenedorFormularioRegistro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1vh;
}


label {
    display: block;
    margin-bottom: 2px;
}

input {
    display: block;
}

.error-container {
    height: 25px;
}

.error {
    color: red;
}

button {
    background-color: #2b4d8c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    padding: 6px 12px;
}

button:hover {
    background-color: #233e71;
}

.form-group {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .form-columns {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .form-group {
        width: 48%;
    }
}

@media (min-width: 1024px) {
    @media (min-width: 1024px) {

        #contenedorFormularioRegistro {
            display: flex;
            flex-direction: column;
        }

        #formulario {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }


        #botonFuera {
            margin-top: 1rem;
            width: 90%;
            display: grid;
            grid-template-rows: repeat(3, 1fr);
            padding-right: 20px;
            padding-left: 12%;
        }

        .form-group:nth-child(1),
        .form-group:nth-child(2) {
            grid-row: 1;
        }

        .form-group:nth-child(3) {
            grid-row: 2;
        }

        .form-group:nth-child(4),
        .form-group:nth-child(5) {
            grid-row: 3;
        }


        .form-group {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .error-container {
            width: max-content;
        }

        .error {
            width: 400px;
        }

        input {
            width: 400px;
        }
    }
}
</style>