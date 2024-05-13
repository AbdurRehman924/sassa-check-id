// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      imagesUrl:
        process.env.NUXT_PUBLIC_IMAGES_PROXY || "http://localhost:3000/images",
    },
  },
  routeRules: {
    "/images/**": {
      proxy: "https://wpbackend.perceptiond.net/wp-content/**",
    },
  },
  css: ["@/assets/main.css"],
  devtools: { enabled: true },
});
