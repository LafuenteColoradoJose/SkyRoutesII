<template>
    <div id="contenedor" class="flex flex-row p-2 m-2">
      <TheFormLogin />
      <ThePublicity />
    </div>
</template>

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
  