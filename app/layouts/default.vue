<template>
  <div class="flex flex-col min-h-screen bg-sky-dark text-[var(--color-text-body)] relative">
    <!-- Optional: Subtle global pattern -->
    <div
      class="fixed inset-0 bg-[url('/airplane-front-view-silhouette-3.svg')] bg-center bg-no-repeat bg-cover opacity-5 pointer-events-none z-0 invert [.light-mode_&]:invert-0 [.light-mode_&]:opacity-10">
    </div>

    <TheNavBar @toggle-theme="toggleTheme" class="z-20" />

    <main
      class="flex-grow flex flex-col z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 animate-fade-in relative">
      <slot />
    </main>

    <TheFooter class="z-20" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLightMode = ref(false)

onMounted(() => {
  // Check if user has a preference saved or prefers light mode
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    isLightMode.value = true
    document.documentElement.classList.add('light-mode')
  }
})

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  if (isLightMode.value) {
    document.documentElement.classList.add('light-mode')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.remove('light-mode')
    localStorage.setItem('theme', 'dark')
  }
}
</script>