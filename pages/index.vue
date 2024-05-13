<template>
  <SassaStatusForm />
  <div class="mx-auto max-w-7xl">
    <h1 class="text-center">{{ data.nodeByUri.title }}</h1>
    <div
      class="my-3 text-lg font-OpenSans"
      v-html="data.nodeByUri.content"
    ></div>
  </div>
</template>

<script setup>
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `query getIndexPage {
        nodeByUri(uri: "/"){
      ... on Page{
      id,
      title,
      date,
      content
      }
    }
  }`,
    },
    transform(data) {
      return data.data;
    },
    key: "indexPage",
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
</script>
