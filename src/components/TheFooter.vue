<template>
  <footer class="footer items-center p-4 bg-[#5f7fa6]">
    <aside class="items-center grid-flow-col">
      <img src="/SkyRoutes_Logo.svg" alt="Logotipo SkyRoutes" class="w-20 mr-3">
      <p>Copyright © 2023 - All right reserved</p>
    </aside>

    <article class="flex flex-row">
      <div v-if="userId">
        <NuxtLink to="/contact" class="link link-hover mr-14">Contacta</NuxtLink>
      </div>
      <div v-if="userId">
        <NuxtLink to="/about" class="link link-hover">Nosotros</NuxtLink>
      </div>

    </article>

    <nav class="grid-flow-col gap-8 md:place-self-center md:justify-self-end mr-5">

      <div class="flex flex-row gap-2">
        <span class="text-xs"> José A. Rivera</span>
        <a href="https://github.com/JoseAntonioRiveraVargas">
          <img src="/icons/github.svg" alt="Logotipo SkyRoutes" class="w-5">
        </a>
      </div>
      <div class="flex flex-row gap-2">
        <span class="text-xs"> José Lafuente</span>
        <a href="https://github.com/LafuenteColoradoJose">
          <img src="/icons/github.svg" alt="Logotipo SkyRoutes" class="w-5">
        </a>
      </div>


    </nav>
  </footer>
</template>

<script setup>
const userId = ref(useCookie('userId'))
</script>

<style scoped></style>