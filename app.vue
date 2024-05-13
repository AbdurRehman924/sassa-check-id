<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    method: "get",
    query: {
      query: `query NewQuery {
        pages {
          edges {
            node {
              title
              link
              id
              isFrontPage
              slug
            }
          }
        }
      }`,
    },
    transform(data) {
      return data.data.pages.edges;
    },
    key: "pages",
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
  provide("allPages", data);
</script>
