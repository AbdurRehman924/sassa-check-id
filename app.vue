<template>
  <NuxtLayout>
    <NuxtPage :pages="data" />
  </NuxtLayout>
</template>

<script setup>
const config = useRuntimeConfig();
const { data } = useFetch(config.public.wordpressUrl, {
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
});
</script>
