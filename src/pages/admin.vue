<template>
    <TheFormAdmin />
</template>


<script setup>
import TheFormAdmin from '~/components/TheFormAdmin.vue';

definePageMeta({
    title: 'Admin',
    description: 'Admin page',
    middleware: 'auth'
})


</script>

<style scoped>

  #contenedor {
    display: flex;
    flex-direction: row; /* Por defecto, en fila en pantallas grandes */
  }

  @media (max-width: 850px) {
    #contenedor {
      flex-direction: column; /* En columna en dispositivos móviles */
    }
  }
</style>