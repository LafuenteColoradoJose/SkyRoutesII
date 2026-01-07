<template>
  <footer
    class="bg-[var(--color-nav-bg)] backdrop-blur-md text-[var(--color-text-body)] py-8 mt-auto border-t border-[var(--color-nav-border)] relative overflow-hidden">
    <!-- Background Pattern integration if desired (optional) -->


    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">

        <!-- Logo & Copyright -->
        <div class="flex items-center gap-4">
          <img src="/SkyRoutes_Logo_White.svg" alt="Logotipo SkyRoutes"
            class="w-16 h-auto transition-transform hover:scale-105 [.light-mode_&]:invert">
          <div class="text-sm">
            <p class="font-bold text-[var(--color-text-heading-from)]">SkyRoutes</p>
            <p class="text-[var(--color-text-muted)]">Copyright © {{ new Date().getFullYear() }} - All rights reserved
            </p>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex gap-8 text-sm font-medium">
          <NuxtLink v-if="userId" to="/contact" class="hover:text-[var(--color-sky-primary)] transition-colors">Contacta
          </NuxtLink>
          <NuxtLink v-if="userId" to="/about" class="hover:text-[var(--color-sky-primary)] transition-colors">Nosotros
          </NuxtLink>
        </div>

        <!-- Social / Credits -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-sm">
          <div class="flex items-center gap-2 group">
            <span
              class="font-medium text-[var(--color-text-body)] group-hover:text-[var(--color-sky-primary)] transition-colors">José
              Lafuente</span>
            <a href="https://github.com/LafuenteColoradoJose" target="_blank" aria-label="GitHub de José Lafuente">
              <img src="/icons/github.svg" alt="GitHub"
                class="w-5 h-5 transition-opacity invert [.light-mode_&]:invert-0">
            </a>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
const userId = ref(useCookie('userId'))
</script>
