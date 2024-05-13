<template>
  <footer class="p-4 mx-auto text-white bg-black">
    <div class="py-3 mx-auto max-w-7xl">
      <div
        v-for="item in data"
        class="text-lg underline-offset-2"
        :key="item.node.id"
      >
        <NuxtLink
          v-if="item.node.uri != '/'"
          :to="item.node.uri"
          class="text-xl font-normal leading-8 font-OpenSans hover:text-blue-400"
          >{{ item.node.title }}</NuxtLink
        >
        <hr class="max-w-sm" />
      </div>
    </div>
  </footer>
</template>

<script setup>
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `query getPages {
        pages {
          edges {
            node {
              title
              id
              uri
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
</script>
