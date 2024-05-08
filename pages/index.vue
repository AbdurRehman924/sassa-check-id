<template>
  <div class="mx-auto max-w-7xl">
    <h1>{{ data.page.title }}</h1>
    <div class="my-3" v-html="data?.page.content"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  pages: Object,
});

let indexPage = props.pages.find((page) => page.node.isFrontPage === true);
const config = useRuntimeConfig();

const { data } = await useFetch(config.public.wordpressUrl, {
  method: "get",
  query: {
    query: `query GetPosts {
  page (id:"${indexPage.node.id}"){
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
<style>
/* .wp-block-heading {
  font-size: 40px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.wp-block-table {
  table,
  th,
  td {
    border: 1px solid black;
  }
}
#ez-toc-container {
  background-color: gray;
} */
</style>
