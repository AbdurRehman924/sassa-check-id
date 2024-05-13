<template>
  <div>
    <div
      class="min-h-screen mx-auto my-3 max-w-7xl font-OpenSans"
      v-html="data.content"
    ></div>
  </div>
</template>

<script setup>
  const route = useRoute();
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const regex = /https:\/\/wpbackend\.perceptiond\.net\/wp-content/g;
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `
      query getPageByUri {
        nodeByUri(uri: "${route.params.uri}"){
          ... on Page{
            id,
            title,
            content,
            contentTypeName
          }
          ... on Post {
            id,
            title,
            content,
            contentTypeName
          }
        }
      }
      `,
    },
    key: route.params.uri,
    transform(data) {
      const content = data.data.nodeByUri.content.replace(
        regex,
        "http://localhost:3000/images"
      );
      return {
        ...data.data.nodeByUri,
        content,
      };
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
</script>
