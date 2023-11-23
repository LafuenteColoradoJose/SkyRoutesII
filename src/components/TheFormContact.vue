<template>
    <form class="flex flex-col text-center p-5 m-5 gap-4" @submit.prevent="enviarDatos">
        <h2>Contacta con nosotros</h2>

        <input type="text" v-model.trim="nombre" placeholder="Nombre" class="input input-bordered w-full max-w-xs" required />
        <input type="email" v-model.trim="email" placeholder="Email" class="input input-bordered w-full max-w-xs" required />
        <textarea v-model.trim="bio" class="textarea textarea-bordered" placeholder="Max 250 palabras" required
            maxlength="250"></textarea>
        <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2">
            <label for=""></label>
            <button type="submit">Enviar</button>
        </article>
    </form>
</template>

<script setup>

let nombre = ref('')
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
        email.value = ''
        bio.value = ''
        alert('Mensaje enviado correctamente')
    } else {
        alert('Error al enviar el mensaje')
    }
}



</script>