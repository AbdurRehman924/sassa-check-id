<template>
  <footer class="bg-black text-white w-screen text-xl mx-auto p-4">
    <p class="text-xl">SASSA CHECKER</p>
    <div v-for="item in data" class="text-xs">
      <a v-if="item.node.isFrontPage === false" :href="item.node.slug">{{
        item.node.title
      }}</a>
    </div>
  </footer>
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
