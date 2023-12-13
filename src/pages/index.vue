<template>
    <div id="contenedor" class="flex flex-col p-2 m-2 lg:flex-row ">
      <TheFormLogin />
      <ThePublicity />
    </div>
</template>

<script setup>

definePageMeta({
    title: 'index',
    description: 'index page',
    middleware: 'registered-user' 
})

</script>

<style scoped>

 
</style>
  