<template>
    <nav
        class="relative z-50 w-full transition-all duration-300 border-b border-[var(--color-nav-border)] bg-[var(--color-nav-bg)] backdrop-blur-md">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex justify-between items-center h-20">

                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <NuxtLink to="/">
                        <img class="h-10 w-auto transition-transform hover:scale-105 [.light-mode_&]:invert"
                            src="/SkyRoutes_Logo_White.svg" alt="SkyRoutes Logo">
                    </NuxtLink>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex flex-1 justify-center space-x-8 items-center">
                    <template v-if="!isAdmin && !userId2">
                        <NuxtLink to="/"
                            class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 px-3 py-2 rounded-md text-lg font-medium transition-all duration-200">
                            Inicio</NuxtLink>
                        <NuxtLink to="/contact"
                            class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 px-3 py-2 rounded-md text-lg font-medium transition-all duration-200">
                            Contacta</NuxtLink>
                        <NuxtLink to="/about"
                            class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 px-3 py-2 rounded-md text-lg font-medium transition-all duration-200">
                            Nosotros</NuxtLink>
                    </template>

                    <template v-if="userId2">
                        <div class="relative group">
                            <button
                                class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 px-3 py-2 rounded-md text-lg font-medium transition-all duration-200 flex items-center gap-1">
                                Planes de vuelo
                                <svg class="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <!-- Dropdown -->
                            <div
                                class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-[var(--color-card-bg)] backdrop-blur-xl ring-1 ring-[var(--color-border-subtle)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                                <div class="py-1">
                                    <NuxtLink to="/user"
                                        class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                        Solicitar
                                    </NuxtLink>
                                    <NuxtLink to="/flightplans"
                                        class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                        Histórico
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="isAdmin">
                        <div class="relative group">
                            <button
                                class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 px-3 py-2 rounded-md text-lg font-medium transition-all duration-200 flex items-center gap-1">
                                Dashboard
                                <svg class="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div
                                class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-[var(--color-card-bg)] backdrop-blur-xl ring-1 ring-[var(--color-border-subtle)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                                <div class="py-1">
                                    <NuxtLink to="/admin/aircrafts"
                                        class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                        Aircrafts
                                    </NuxtLink>
                                    <NuxtLink to="/admin/airports"
                                        class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                        Airports
                                    </NuxtLink>
                                    <NuxtLink to="/admin/users"
                                        class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                        Users
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Right Side: User & Colors -->
                <div class="hidden md:flex items-center space-x-6">
                    <button @click="$emit('toggle-theme')" aria-label="Toggle Theme"
                        class="p-2 rounded-full hover:bg-[var(--color-sky-primary)]/10 text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] transition-colors">
                        <!-- Sun/Moon icons would go here, simplified for now -->
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                            </path>
                        </svg>
                    </button>

                    <div v-if="userId2" class="relative group">
                        <button class="flex items-center space-x-3 focus:outline-none py-1">
                            <div class="text-right hidden lg:block">
                                <p class="text-sm font-bold text-[var(--color-text-body)]">{{ userName || 'Usuario' }}
                                </p>
                                <p class="text-xs text-[var(--color-text-muted)]">Piloto</p>
                            </div>
                            <div
                                class="w-10 h-10 rounded-full bg-sky-secondary text-white flex items-center justify-center border-2 border-white/20 shadow-md overflow-hidden">
                                <img v-if="userImg" :src="userImg" alt="User" class="w-full h-full object-cover">
                                <span v-else class="text-xs font-bold">{{ userName ? userName.charAt(0).toUpperCase() :
                                    'U' }}</span>
                            </div>
                        </button>
                        <div
                            class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--color-card-bg)] ring-1 ring-[var(--color-border-subtle)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                            <div class="py-1">
                                <NuxtLink to="/profile"
                                    class="block px-4 py-2 text-sm text-[var(--color-text-body)] hover:bg-sky-primary/10 hover:text-sky-500">
                                    Perfil
                                </NuxtLink>
                                <div @click="logout"
                                    class="block px-4 py-2 text-sm text-red-400 hover:bg-sky-primary/10 cursor-pointer">
                                    Logout</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile menu button -->
                <div class="flex md:hidden">
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
                        class="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 focus:outline-none"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden" id="mobile-menu" v-show="isMobileMenuOpen">
            <div
                class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[var(--color-nav-bg)] backdrop-blur-xl border-t border-[var(--color-border-subtle)]">
                <template v-if="!isAdmin && !userId2">
                    <NuxtLink to="/"
                        class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 block px-3 py-2 rounded-md text-base font-medium">
                        Inicio</NuxtLink>
                    <NuxtLink to="/contact"
                        class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 block px-3 py-2 rounded-md text-base font-medium">
                        Contacta</NuxtLink>
                    <NuxtLink to="/about"
                        class="text-[var(--color-text-body)] hover:text-[var(--color-sky-primary)] hover:bg-[var(--color-sky-primary)]/10 block px-3 py-2 rounded-md text-base font-medium">
                        Nosotros</NuxtLink>
                </template>

                <template v-if="userId2">
                    <div
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium font-bold text-gray-400">
                        Planes</div>
                    <NuxtLink to="/user"
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium pl-8">
                        Solicitar</NuxtLink>
                    <NuxtLink to="/flightplans"
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium pl-8">
                        Histórico</NuxtLink>
                </template>

                <template v-if="isAdmin">
                    <div
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium font-bold text-gray-400">
                        Dashboard</div>
                    <NuxtLink to="/admin/aircrafts"
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium pl-8">
                        Aircrafts</NuxtLink>
                    <NuxtLink to="/admin/airports"
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium pl-8">
                        Airports</NuxtLink>
                    <NuxtLink to="/admin/users"
                        class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium pl-8">
                        Users</NuxtLink>
                </template>

                <div v-if="userId2" class="border-t border-gray-700 pt-4 pb-3">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 rounded-full bg-sky-secondary flex items-center justify-center">
                                <span class="text-white font-bold">U</span>
                            </div>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">{{ userName || 'Usuario' }}</div>
                        </div>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                        <NuxtLink to="/profile"
                            class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium">
                            Perfil</NuxtLink>
                        <div @click="logout"
                            class="text-[var(--color-text-body)] hover:text-white hover:bg-sky-primary block px-3 py-2 rounded-md text-base font-medium text-red-400 cursor-pointer">
                            Logout</div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const userId2 = ref(useCookie('userId'))
const isMobileMenuOpen = ref(false)
const userName = ref('')
const userImg = ref('')

const isAdmin = ref(false)
if (userId2.value == '93') {
    isAdmin.value = true
}

const fetchUserProfile = async () => {
    if (!userId2.value) return;
    try {
        const response = await $fetch("profiles/profiles", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId2.value }),
        });
        if (response && response.db && response.db[0]) {
            // The user requested 'juanito' (the username), not the person's name 'JuanAntonio'.
            // The DB has 'user' field for username.
            userName.value = response.db[0].user;
            userImg.value = response.db[0].img;
        }
    } catch (e) {
        console.error("Error fetching navbar profile:", e);
    }
}

onMounted(() => {
    fetchUserProfile();
});

const logout = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // Using simple reload for now as previously implemented
    location.reload()
    return navigateTo('/')
}

defineEmits(['toggle-theme'])
</script>

<style scoped></style>