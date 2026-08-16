<template>
  <div id="contenedor"
    class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full max-w-7xl mx-auto flex-1">
    <TheFormLogin />
    <ThePublicity />
  </div>
</template>

<script setup>

definePageMeta({
  title: 'index',
  description: 'index page',
  middleware: 'registered-user',
})

</script>
