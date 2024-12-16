3// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url"
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  srcDir: 'src/',

  alias: {
    '@': fileURLToPath(new URL('./src/', import.meta.url)),
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt3-leaflet',
    // 'cookie-universal-nuxt',

  ],

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

  // plugins: [
  //   '@/server/plugins/db',
  // ],

  runtimeConfig: {
    public: {
      
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_PORT: process.env.MYSQL_PORT,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_PASS: process.env.MYSQL_PASS,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,


      PLANETSCALE_URL: process.env.PLANETSCALE_URL,


      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_USERNAME: process.env.DATABASE_USERNAME,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_NAME: process.env.DATABASE_NAME,

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

  // middleware: 'auth',

  // para hacer debugging
  sourcemap: {
    server: true,
    client: true,
  },

  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },

  compatibilityDate: "2024-11-20",
})