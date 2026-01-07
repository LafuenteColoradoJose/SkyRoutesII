<template>
    <div
        class="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-8 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-sky-primary/20 bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] font-sans">

        <h2 class="text-3xl font-bold mb-8 text-[var(--color-text-heading-from)] text-center tracking-tight">Contacta
            con nosotros</h2>

        <form class="w-full space-y-6" @submit.prevent="enviarDatos">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="nombre"
                        class="block text-sm font-medium text-[var(--color-text-body)] mb-1.5 ml-1">Nombre</label>
                    <input type="text" id="nombre" v-model.trim="nombre"
                        class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-300 outline-none"
                        placeholder="Tu nombre" required />
                </div>
                <div>
                    <label for="apellidos"
                        class="block text-sm font-medium text-[var(--color-text-body)] mb-1.5 ml-1">Apellidos</label>
                    <input type="text" id="apellidos" v-model.trim="apellidos"
                        class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-300 outline-none"
                        placeholder="Tus apellidos" required />
                </div>
            </div>

            <div>
                <label for="email"
                    class="block text-sm font-medium text-[var(--color-text-body)] mb-1.5 ml-1">Email</label>
                <input type="email" id="email" v-model.trim="email"
                    class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-300 outline-none"
                    placeholder="tucorreo@ejemplo.com" required />
            </div>

            <div>
                <label for="asunto" class="block text-sm font-medium text-[var(--color-text-body)] mb-1.5 ml-1">Asunto y
                    Mensaje</label>
                <textarea id="asunto" v-model.trim="bio"
                    class="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-border-subtle)] focus:border-sky-primary focus:ring-2 focus:ring-sky-primary/50 text-[var(--color-text-body)] placeholder-[var(--color-text-muted)] transition-all duration-300 outline-none resize-none min-h-[120px]"
                    placeholder="Escribe tu mensaje aquí (Máx. 250 palabras)..." required maxlength="250"></textarea>
                <div class="text-right text-xs text-[var(--color-text-muted)] mt-1">{{ bio.length }}/250</div>
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="w-full py-4 px-6 bg-gradient-to-r from-sky-primary to-sky-secondary hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-primary/30 hover:-translate-y-0.5 transform transition-all duration-300">
                    Enviar Mensaje
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import swal from 'sweetalert'

let nombre = ref('')
let apellidos = ref('')
let email = ref('')
let bio = ref('')

const enviarDatos = async () => {
    const response = await $fetch('/mail/mail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            email: email.value,
            bio: bio.value
        })


    });

    if (response.res === 'ok') {
        nombre.value = ''
        apellidos.value = ''
        email.value = ''
        bio.value = ''
        swal('Mensaje enviado correctamente')
    } else {
        swal('Error al enviar el mensaje')
    }
}

</script>