<template>
    <form class="flex flex-col text-center p-5 m-5 gap-4" @submit.prevent="enviarDatos">
        <h2>Contacta con nosotros</h2>

        <input type="text" placeholder="Nombre" class="input input-bordered w-full max-w-xs" required />
        <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" required />
        <textarea class="textarea textarea-bordered" placeholder="Max 250 palabras" required maxlength="250"></textarea>
        <article class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-2">
            <label for=""></label>
            <button type="submit">Enviar</button>
        </article>
    </form>
</template>

<script>

let nombre = ref('')
let email = ref('')
let bio = ref('')

const enviarDatos = async () => {
    console.log(nombre.value)
    console.log(email.value)
    console.log(bio.value)
}



</script>