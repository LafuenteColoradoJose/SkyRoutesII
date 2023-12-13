<template>
    <form class="flex flex-col text-center p-2 m-2 gap-3" @submit.prevent="enviarDatos">

        <h2 class="text-xl font-bold">Contacta con nosotros</h2>

        <article class="flex flex-col justify-center items-center lg:flex-row lg:gap-2 lg:w-full">
            <label class="mb-1 lg:w-48 lg:text-start" for="nombre">Nombre</label>
            <input type="text" v-model.trim="nombre" class="input input-bordered w-full max-w-xs" required />
        </article>

        <article class="flex flex-col justify-center items-center lg:flex-row lg:gap-2 lg:w-full">
            <label class="mb-1 lg:w-48 lg:text-start" for="nombre">Apellidos</label>
            <input type="text" v-model.trim="apellidos" class="input input-bordered w-full max-w-xs" required />
        </article>

        <article class="flex flex-col justify-center items-center lg:flex-row lg:gap-2 lg:w-full">
            <label class="mb-1 lg:w-48 lg:text-start" for="email">Email</label>
            <input type="email" v-model.trim="email" class="input input-bordered w-full max-w-xs" required />
        </article>

        <article class="flex flex-col justify-center items-center lg:flex-row lg:gap-2 lg:w-full">
            <label class="mb-1 lg:w-48 lg:text-start" for="asunto">Asunto</label>
            <textarea v-model.trim="bio" class="textarea textarea-bordered w-full resize-none"
                placeholder="Max 250 palabras" required maxlength="250">
            </textarea>
        </article>


        <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg lg:mx-28">
            <label class="" for=""></label>
            <button type="submit">Enviar</button>
        </article>
    </form>
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
        // body:
        // {
        //     nombre: nombre.value,
        //     apellidos: apellidos.value,
        //     email: email.value,
        //     bio: bio.value
        // }

    });

    // nombre = nombre.value
    // email = email.value
    // bio = bio.value

    // console.log(nombre, email, bio)
    // console.log(nombre.value, email.value, bio.value)

    console.log(response)

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