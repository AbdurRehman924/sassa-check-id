<template>
  <div class="mx-auto max-w-7xl my-3" v-html="data?.page.content"></div>
</template>

<script setup>
import { defineProps } from "vue";

const config = useRuntimeConfig();
const { id } = useRoute().params;
const props = defineProps({
  pages: Object,
});

let pageWithId = props.pages.find((page) => page.node.slug === id);

const { data } = await useFetch(config.public.wordpressUrl, {
  method: "get",
  query: {
    query: `query GetPosts {
  page (id:"${pageWithId.node.id}"){
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
});
</script>
