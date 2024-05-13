// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxtjs/tailwindcss", "@nuxtjs/seo"],

  appConfig: {
    wordpressUrl: "https://wpbackend.perceptiond.net/graphql",
  },
  routeRules: {
    "/images/**": {
      proxy: "https://wpbackend.perceptiond.net/wp-content/**",
    },
  },
  css: ["@/assets/main.css"],
  devtools: { enabled: true },
  site: {
    trailingSlash: true,
  },
});
