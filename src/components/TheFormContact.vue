<template>
    <form class="flex flex-col text-center p-5 m-5 gap-4" @submit.prevent="enviarDatos">
        <h2>Contacta con nosotros</h2>

        <label for="nombre"></label>
        <input type="text" v-model.trim="nombre" placeholder="Nombre" class="input input-bordered w-full max-w-xs"
            required />
        <input type="text" v-model.trim="apellidos" placeholder="Apellidos" class="input input-bordered w-full max-w-xs"
            required />
        <input type="email" v-model.trim="email" placeholder="Email" class="input input-bordered w-full max-w-xs"
            required />
        <textarea v-model.trim="bio" class="textarea textarea-bordered" placeholder="Max 250 palabras" required
            maxlength="250"></textarea>
        <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2">
            <label for=""></label>
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
        // body: JSON.stringify({
        //     nombre: nombre.value,
        //     email: email.value,
        //     bio: bio.value
        // })
        body:
        {
            nombre: nombre.value,
            apellidos: apellidos.value,
            email: email.value,
            bio: bio.value
        }

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