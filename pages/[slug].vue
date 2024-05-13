<template>
  <div
    v-if="selectedPage"
    class="min-h-screen mx-auto my-3 max-w-7xl font-OpenSans"
    v-html="data?.page.content"
  ></div>
</template>

<script setup>
  import { useRoute } from "vue-router";

  const route = useRoute();
  const allPages = inject("allPages");
  const { wordpressUrl } = useAppConfig();

  const selectedPage = computed(() => {
    return allPages.value.find((page) => page.node.slug === route.params.slug);
  });
  const nuxtApp = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `query GetPosts {
          page (id:"${selectedPage.value.node.id}"){
              id
              title
              date
              content
          }
        }`,
    },
    transform(data) {
      return data.data;
    },
    key: selectedPage.value.node.id,
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
</script>
