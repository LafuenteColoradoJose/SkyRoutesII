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


</style>