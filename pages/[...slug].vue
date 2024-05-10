<template>
  <div
    v-if="selectedPageId"
    class="mx-auto max-w-7xl my-3 font-OpenSans"
    v-html="data?.page.content"></div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const { fetchPageById } = useGetData();
const route = useRoute();
const params = toRefs(route.params);
const props = defineProps({
  pages: Object,
});

const lastElement = computed(
  () => params.slug.value[params.slug.value.length - 1]
);
const selectedPageId = computed(() => {
  const foundPage = props.pages.find(
    (page) => page.node.slug === lastElement.value
  );
  return foundPage ? foundPage.node.id : null;
});

const data = await fetchPageById(selectedPageId.value);
</script>
