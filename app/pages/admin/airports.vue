<template>
        <div>
            <TheFormAdminAirports />
        </div>
    

</template>

<script setup>
import TheFormAdminAirports from '@/components/TheFormAdminAirports.vue'

definePageMeta({
    title: 'Admin',
    description: 'Admin page airports',
    middleware: 'auth'
})


</script>

<style scoped>
div {
    background-image: url('/imgs/cockpit.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vw;
}
</style>