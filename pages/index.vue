<template>
  <div class="mx-auto max-w-7xl">
    <div class="my-3 font-OpenSans text-lg" v-html="data?.page.content"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { fetchPageById } = useGetData();
const props = defineProps({
  pages: Object,
});

let indexPage = computed(() =>
  props.pages.find((page) => page.node.isFrontPage === true)
);
const data = await fetchPageById(indexPage.value.node.id);
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
