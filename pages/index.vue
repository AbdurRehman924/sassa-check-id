<template>
  <SassaStatusForm />
  <div class="px-6 mx-auto max-w-7xl">
    <h1 class="text-center">{{ data[0].title }}</h1>
    <div class="my-3 text-lg font-OpenSans" v-html="data[0].content"></div>
  </div>
</template>

<script setup>
const { baseUrl, imagesUrl } = useRuntimeConfig().public;
const nuxtApp = useNuxtApp();

const { data } = await useAsyncData(
  "getIndexPageAndSeoData",
  () => Promise.all([getPageData("/"), getSeoData("/")]),
  {
    transform([pageResponse, seoResponse]) {
      const content = pageResponse.data.nodeByUri.content.replace(
        imagesRegex,
        imagesUrl,
      );

      const head = seoResponse.head
        .replace(imagesRegex, imagesUrl)
        .replace(baseUrlRegex, baseUrl);
      return [
        {
          ...pageResponse.data.nodeByUri,
          content,
        },
        {
          head,
        },
      ];
    },
    key: "indexPage",
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

if (!data.value) {
  throw createError({
    message: "Something went wrong! Please try again later",
  });
} else {
  addMetaTags(data.value[1].head);
}
</script>
