<template>
    <div id="contenedor" class="flex flex-row p-2 m-2">
        <h2 class="text-3xl">CRUD del Admin</h2>
    </div>
</template>


<script setup>
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