<template>
    <div id="contenedor" class="flex flex-col p-2 m-2 lg:flex-row">
        <TheFormRegister/>
        <ThePublicity/>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'register',
    description: 'register page',
    middleware: 'registered-user'
})
</script>

<style scoped>


  </style>