<template>
    <nav id="navBar" class=" flex flex-col justify-between z-10">


        <div class="navbar">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li v-show="!isAdmin && !userId2">
                            <NuxtLink to="/">Inicio</NuxtLink>
                        </li>
                        <li v-show="!isAdmin && !userId2">
                            <NuxtLink to="/contact">Contacta</NuxtLink>
                        </li>
                        <li v-show="!isAdmin && !userId2">
                            <NuxtLink to="/about">Nosotros</NuxtLink>
                        </li>
                        <li v-if="userId2">
                            <a>Planes de vuelo</a>
                            <ul class="p-2">
                                <li>
                                    <NuxtLink to="/user">Solicitar</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/flightplans">Histórico</NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <li v-if="isAdmin" class="text-xl font-semibold">
                            <a>Dashboard</a>
                            <ul class="p-2">
                                <li>
                                    <NuxtLink to="/admin/aircrafts">Aircrafts</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/admin/airports">Airports</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/admin/users">Users</NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <article>
                    <img src="/SkyRoutes_Logo_White.svg" alt="SkyRoutes Logo" class="w-12 pt-2 ml-20">
                </article>
            </div>


            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li v-show="!isAdmin && !userId2" class="text-xl font-semibold">
                        <NuxtLink to="/">Inicio</NuxtLink>
                    </li>
                    <li v-show="!isAdmin && !userId2" class="text-xl font-semibold">
                        <NuxtLink to="/contact">Contacta</NuxtLink>
                    </li>
                    <li v-show="!isAdmin && !userId2" class="text-xl font-semibold">
                        <NuxtLink to="/about">Nosotros</NuxtLink>
                    </li>
                    <li v-if="userId2">
                        <details class="">
                            <summary class="text-xl font-semibold">Planes de vuelo</summary>
                            <ul class="p-2">
                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/user">Solicitar</NuxtLink>
                                </li>
                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/flightplans">Histórico</NuxtLink>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li v-if="isAdmin" class="text-xl font-semibold">
                        <details>
                            <summary class="text-xl font-semibold">Dashboard</summary>
                            <ul class="p-2">
                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/admin/aircrafts">Aircrafts</NuxtLink>
                                </li>
                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/admin/airports">Airports</NuxtLink>
                                </li>
                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/admin/users">Users</NuxtLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div class="navbar-end">

                <div v-show="userId2" class="navbar ml-16 md:ml-44 lg:ml-96">

                    <div class="flex-none gap-2">

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full shadow-xl border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-full h-full">
                                        <path fill-rule="evenodd"
                                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>
                            </div>
                            <ul tabindex="0"
                                class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                <li class="text-xl font-semibold">
                                    <NuxtLink to="/profile" class="text-xl">Perfil</NuxtLink>
                                </li>
                                <li class="text-xl font-semibold" @click="logout">
                                    <NuxtLink class="text-xl">Logout</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div id="icono" class="">
                    <label class="swap swap-rotate">

                        <input type="checkbox" @change="$emit('toggle-theme')" />

                        <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            @click="handleThemeChange('moon')">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            @click="handleThemeChange('sun')">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>

                    </label>
                </div>
            </div>
        </div>

    </nav>
</template>

<script setup>

const userId2 = ref(useCookie('userId'))

const isAdmin = ref(false)
if (userId2.value == '93') {
    isAdmin.value = true
}

const logout = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    return reloadNuxtApp({
        path: '/',
        ttl: 10000,
    })

}


</script>


<style scope>
#navBar {
    background-color: #5f7fa6;
    background-image: url('/imgs/WorldMap.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto;

}

summary ul li {
    background-color: aqua;
}
</style>