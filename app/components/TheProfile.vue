<template>
    <div class="w-full max-w-4xl mx-auto p-4 lg:p-6">
        <div
            class="backdrop-blur-xl bg-[var(--color-card-bg)] rounded-2xl p-6 space-y-8 border border-[var(--color-border-subtle)] shadow-xl animate-fade-in">
            <h1 class="text-3xl font-bold text-center text-[var(--color-text-heading-from)]">Editar Perfil</h1>

            <form @submit.prevent="actualizarPerfil" class="space-y-8">

                <!-- Avatar Section (Centered) -->
                <div class="flex flex-col items-center justify-center animate-fade-in-up">
                    <div class="relative group cursor-pointer" @click="$refs.fileInput.click()">
                        <div
                            class="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-card-bg)] shadow-2xl ring-4 ring-sky-500/20 transition-all duration-300 transform group-hover:scale-105 group-hover:ring-sky-500/50 bg-[var(--color-input-bg)]">
                            <img v-if="imgPreview" :src="imgPreview" alt="Profile" class="w-full h-full object-cover">
                            <div v-else
                                class="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                                <svg class="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>

                            <!-- Overlay with Icon -->
                            <div
                                class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden">
                    </div>
                    <p class="mt-3 text-sm font-medium text-sky-500/80 group-hover:text-sky-400 transition-colors cursor-pointer"
                        @click="$refs.fileInput.click()">Cambiar foto de perfil</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <!-- Column 1: Personal Info -->
                    <div class="space-y-6">

                        <div class="space-y-1">
                            <label for="nombre"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Nombre y
                                Apellido</label>
                            <input v-model.trim="nombre" type="text" id="nombre"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                @input="validarNombre" required>
                            <div class="h-5 text-xs text-red-400 ml-1">{{ nombreError }}</div>
                        </div>

                        <div class="space-y-1">
                            <label for="usuario"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Usuario</label>
                            <input v-model.trim="usuario" type="text" id="usuario"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                required @input="validarUsuario">
                            <div class="h-5 text-xs text-red-400 ml-1">{{ usuarioError }}</div>
                        </div>

                        <div class="space-y-1">
                            <label for="email"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Email</label>
                            <input v-model.trim="email" type="email" id="email"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                required @input="validarEmail">
                            <div class="h-5 text-xs text-red-400 ml-1">
                                <span v-if="emailError">{{ emailError }}</span>
                                <span v-if="emailOcupado">{{ emailOcupado }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Column 2: Password -->
                    <div class="space-y-5">
                        <div class="space-y-1">
                            <label for="contrasenaActual"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Contraseña
                                Actual</label>
                            <input v-model.trim="contrasenaActual" type="password" id="contrasenaActual"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                required>
                            <div class="h-5 text-xs text-red-400 ml-1">{{ actualPasswordError }}</div>
                        </div>

                        <div class="space-y-1">
                            <label for="nuevaContrasena"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Nueva
                                Contraseña</label>
                            <input v-model.trim="nuevaContrasena" type="password" id="nuevaContrasena"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                @input="validarPassword">
                            <div class="h-5 text-xs text-red-400 ml-1">{{ passwordError }}</div>
                        </div>

                        <div class="space-y-1">
                            <label for="repetirContrasena"
                                class="block text-sm font-medium text-[var(--color-text-muted)] ml-1">Repetir
                                Contraseña</label>
                            <input v-model.trim="repetirContrasena" type="password" id="repetirContrasena"
                                class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/20 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] outline-none transition-all"
                                @input="validarConfirmPassword">
                            <div class="h-5 text-xs text-red-400 ml-1">{{ confirmPasswordError }}</div>
                        </div>
                    </div>
                </div>

                <div class="pt-4 flex justify-center">
                    <button type="submit"
                        class="px-12 py-4 bg-gradient-to-r from-sky-primary to-sky-secondary hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-primary/30 transform hover:-translate-y-0.5 transition-all">
                        Guardar Cambios
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
const userId = useCookie('userId').value; // Keep existing single read logic but useCookie is cleaner
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

const imgPreview = ref(null);
const imgBase64 = ref(null);
const fileInput = ref(null);

onMounted(async () => {
    try {
        const response = await $fetch("profiles/profiles", {
            method: "PUT", // Why PUT for fetching? Legacy code kept
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        // Ensure we handle response structure correctly
        if (response && response.db && response.db[0]) {
            const userProfile = response.db[0];
            nombre.value = userProfile.name;
            usuario.value = userProfile.user;
            email.value = userProfile.email;
            contrasenaBase.value = userProfile.password;
            if (userProfile.img) {
                imgPreview.value = userProfile.img;
            }
        }

    } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
    }
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Validation: Check size (e.g. max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("La imagen es demasiado grande. Máximo 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_WIDTH = 300;
                const MAX_HEIGHT = 300;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                imgBase64.value = dataUrl;
                imgPreview.value = dataUrl;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};


async function actualizarPerfil() {
    if (contrasenaActual.value !== contrasenaBase.value) {
        actualPasswordError.value = 'La contraseña actual no es correcta.';
        return;
    }
    actualPasswordError.value = '';

    const body = {
        userId: userId,
        name: nombre.value,
        user: usuario.value,
        email: email.value,
        password: contrasenaBase.value,
        passwordnew: nuevaContrasena.value
    };

    if (imgBase64.value) {
        body.img = imgBase64.value;
    }

    const data = await $fetch("profiles/profiles", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
    // Only validate if user is typing a new password
    if (nuevaContrasena.value.length > 0) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;
        if (!passwordPattern.test(nuevaContrasena.value)) {
            passwordError.value = 'Contraseña no cumple los requisitos.';
        } else {
            passwordError.value = '';
        }
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