<template>
            <main class="grid grid-cols-1 content-between items-stretch" :data-theme="theme">
                <TheNavBar @toggle-theme="toggleTheme"/>
                <slot />
                <TheFooter />
            </main>
</template>

<script setup>

const theme = ref('aqua')

const toggleTheme = () => {
    theme.value = theme.value === 'aqua' ? 'nord' : 'aqua';
    console.log(theme.value)
}

</script>

<style scope>

    main {
        min-height: 100vh;
        /* background-image: url('/airplane-front-view-silhouette-3.svg'); */
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('/airplane-front-view-silhouette-3.svg');
    }

</style>