// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      wordpressUrl: "https://wpbackend.perceptiond.net/graphql",
      domain: "https://wpbackend.perceptiond.net",
    },
  },
  css: ["@/assets/main.css"],
  devtools: { enabled: true },
});
