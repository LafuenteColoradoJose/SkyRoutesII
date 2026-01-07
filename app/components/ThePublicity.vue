<template>
    <section class="flex flex-col flex-1 max-w-lg mx-auto lg:mx-0 justify-center items-center gap-4 p-4">

        <div class="text-center space-y-2">
            <h2
                class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-heading-from)] to-[var(--color-text-heading-to)]">
                SkyRoutes</h2>
            <h3 class="text-xl font-light text-[var(--color-sky-primary)]">Encuentra tu ruta ¡Totalmente gratuita!</h3>
        </div>

        <article class="flex flex-col items-center gap-4">
            <div class="text-center md:text-left text-lg leading-relaxed text-[var(--color-text-body)]">
                <p class="mb-4">
                    Con <span class="font-bold text-[var(--color-text-heading-from)]">SkyRoutes</span>, generar planes
                    de vuelo precisos y
                    eficientes nunca ha sido tan fácil.
                </p>
                <p>
                    Nuestra aplicación inteligente utiliza tecnología de vanguardia para ofrecerte una herramienta
                    completa y confiable.
                </p>
            </div>

            <div
                class="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 hover:scale-105 transition-transform duration-300">
                <img src="/imgs/fmc.webp" alt="Flight Plan Cart" class="w-full h-auto object-cover max-h-64">
            </div>

            <p class="text-center text-lg font-medium text-[var(--color-text-muted)] mt-4">
                ¡No te pierdas la oportunidad de elevar tus vuelos al siguiente nivel!
            </p>
        </article>

    </section>
</template>

<style scoped></style>