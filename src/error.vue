<template>
    <div id="contenedor" class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-center text-white">Error {{ error.statusCode }}</h1>
        <h2 class="text-2xl text-center text-white">{{ error.message }}</h2>
        <h4 class="text-xl text-center text-white">{{ error.path }}</h4>
        <h5 class="text-xl text-center text-white">{{ error.name }}</h5>
        <div>

            <button @click="clearError({ redirect: '/' })" class="btn m-2">Home</button>
        </div>


    </div>
</template>

<script setup>

defineProps({
    error: Object
})



</script>

<style scoped>
#contenedor {
    min-height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('/airplane-front-view-silhouette-5.svg');
}
</style>