<template>
  <div>
    <TheFormAdminAircrafts />
  </div>

</template>

<script setup>
import TheFormAdminAircrafts from '@/components/TheFormAdminAircrafts.vue'

definePageMeta({
    title: 'Admin',
    description: 'Admin page aircrafts',
    middleware: 'auth',
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

