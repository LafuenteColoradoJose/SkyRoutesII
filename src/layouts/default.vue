<template>
            <main class="flex flex-col place-content-between" :data-theme="theme">
                <TheNavBar @toggle-theme="toggleTheme"/>
                <slot />
                <TheFooter />
            </main>
</template>

<script setup>

const theme = ref('aqua')

const toggleTheme = () => {
    theme.value = theme.value === 'aqua' ? 'light' : 'aqua';
}

onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.setProperty('--background-image', theme.value === 'aqua' ? 'url(/airplane-front-view-silhouette-3.svg)' : 'url(/airplane-front-view-silhouette-5.svg)');
  });
});

</script>

<style scope>

    main {
        min-height: 100vh;
        height: 100%;
        background-image: var(--background-image);
        background-repeat: no-repeat;
        background-position: center;
        background-size:contain;
    }

</style>