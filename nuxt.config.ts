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
  vite: {
    optimizeDeps: {
      include: [
        "@fawmi/vue-google-maps",
        "fast-deep-equal"
      ]
    }
  },
  plugins: [
    '~/plugins/google-maps.client.js'
  ],
  ui: {
    colorMode: false
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyDZrlzgVNXCPNCv-pGTjYN-Ic_DofQk8gE'
    }
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
