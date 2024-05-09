// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      wordpressUrl: "https://wpbackend.perceptiond.net/graphql",
    },
  },
  css: ["@/assets/fonts/fonts.css", "@/assets/style.css"],
  devtools: { enabled: true },
});
