<template>
  <SassaStatusForm />
  <div class="mx-auto max-w-7xl px-6">
    <h1 class="text-center">{{ data.title }}</h1>
    <div class="my-3 text-lg font-OpenSans" v-html="data.content"></div>
  </div>
</template>

<script setup>
  import { wordpressUrl, imagesRegex } from "~/utils/constants";
  const { imagesUrl } = useRuntimeConfig().public;
  const nuxtApp = useNuxtApp();
  const { $fetchSeoData } = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `query getIndexPage {
      nodeByUri(uri: "/"){
        ... on Page{
          id
          title
          date
          content
        }
      }
    }`,
    },
    transform(data) {
      const content = data.data.nodeByUri.content.replace(
        imagesRegex,
        imagesUrl
      );
      return {
        ...data.data.nodeByUri,
        content,
      };
    },
    key: "indexPage",
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  const { title, metas } = await $fetchSeoData("/");
  useHead({
    title,
    meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
  });
</script>
