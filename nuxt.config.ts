// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-07", // Updated to current date

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  // srcDir: 'src/', // Removed as we are using app/ directory

  alias: {
    '@': fileURLToPath(new URL('./app/', import.meta.url)), // Pointing to app now
    '~': fileURLToPath(new URL('./', import.meta.url)), // Pointing to root for server imports
  },

  modules: [], // Removed @nuxtjs/tailwindcss, nuxt3-leaflet

  css: ['@/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'SkyRoutes',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'SkyRoutes gestor de planes de vuelo' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]
    }
  },

  runtimeConfig: {
    public: {

      ACCOUNT_GMAIL: process.env.ACCOUNT_GMAIL,
      USER_GMAIL: process.env.USER_GMAIL,
      PASS_GMAIL: process.env.PASS_GMAIL,


    },

    devtools: {
      enabled: true,
    },

    privateRuntimeConfig: {
      apiSecret: process.env.API_SECRET,
    },
  },

  // para hacer debugging
  sourcemap: {
    server: true,
    client: true,
  },

  build: {
    transpile: ['@vue-leaflet/vue-leaflet'],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})