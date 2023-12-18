<template>
    <div>
        <TheFormAdminUsers />
    </div>

</template>


<script setup>
import TheFormAdminUsers from '@/components/TheFormAdminUsers.vue'

definePageMeta({
    title: 'Admin',
    description: 'Admin page users',
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
    height: 100%;
}
</style>
