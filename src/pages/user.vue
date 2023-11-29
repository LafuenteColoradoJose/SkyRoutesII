<template>
    <section id="contenedor" class="flex flex-row mx-4">
      <article id="form">
        <TheFormMap />
      </article>
      <!-- <article id="map">
        <TheMap />
      </article> -->
      
    </section>
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