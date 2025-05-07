// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxt/ui'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ui: {
    colorMode: false
  },
  nitro: {
    devProxy: {
      "/api/": {
        target: process.env.BACKEND_URL,
        changeOrigin: true
      },
    }
  },
})
