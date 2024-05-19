<template>
  <div>
    <div
      v-if="
        data[0].contentTypeName == 'page' || data[0].contentTypeName == 'post'
      "
      class="min-h-screen px-6 mx-auto my-3 max-w-7xl font-OpenSans"
      v-html="data[0].content"
    ></div>
    <div v-else>
      <div v-if="data[0].posts" class="px-6 mx-auto mt-3 mb-3 max-w-7xl">
        <div v-for="post in data[0].posts" :key="post.uri">
          <NuxtLink :to="post.uri">
            <img
              :src="post.featuredImage.sourceUrl"
              :alt="post.featuredImage.altText"
            />
          </NuxtLink>
          <div v-html="post.content"></div>
          <h2 class="mb-0">{{ post.title }}</h2>
          <p>{{ new Date(post.date).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as cheerio from "cheerio";

const nuxtApp = useNuxtApp();
const route = useRoute();

const uri = route.params.uri.join("/");

const { baseUrl, imagesUrl } = useRuntimeConfig().public;

const transform = dataTransform(baseUrl, imagesUrl);

const { data } = await useAsyncData(
  `getPageAndSeoData-${uri}`,
  () => Promise.all([getPageData(uri), getSeoData(uri)]),
  {
    transform: transform,
    key: uri,
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);
if (!data.value) {
  throw createError({ statusCode: 404, message: "404-Page Not Found" });
} else {
  const $ = cheerio.load(data.value[1].head);
  const title = $("title").text();
  const metas = $("meta")
    .toArray()
    .map((meta) => $(meta).attr());

  useHead({
    title,
    meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
  });
}
</script>
