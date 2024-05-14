<template>
  <SassaStatusForm />
  <div class="px-6 mx-auto max-w-7xl">
    <h1 class="text-center">{{ data.title }}</h1>
    <div class="my-3 text-lg font-OpenSans" v-html="data.content"></div>
  </div>
</template>

<script setup>
import * as cheerio from "cheerio";
import {
  wordpressBaseUrl,
  wordpressGraphqlUrl,
  wordpressSEOUrl,
  baseUrlRegex,
  imagesRegex,
} from "~/utils/constants";

const { baseUrl, imagesUrl } = useRuntimeConfig().public;
const nuxtApp = useNuxtApp();
const { data } = await useFetch(wordpressGraphqlUrl, {
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
    const content = data.data.nodeByUri.content.replace(imagesRegex, imagesUrl);
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

const { data: seo } = await useFetch(
  `${wordpressSEOUrl}?url=${wordpressBaseUrl}/`,
  {
    transform(data) {
      return {
        head: data.head
          .replace(imagesRegex, imagesUrl)
          .replace(baseUrlRegex, baseUrl),
      };
    },
    key: "indexPageSeo",
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const $ = cheerio.load(seo.value.head);
const title = $("title").text();
const metas = $("meta")
  .toArray()
  .map((meta) => $(meta).attr());

useHead({
  title,
  meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
});
</script>
