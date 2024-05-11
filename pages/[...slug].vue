<template>
  <div
    v-if="selectedPageId"
    class="mx-auto max-w-7xl my-3 font-OpenSans min-h-screen"
    v-html="data?.page.content"></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const { fetchPageById } = useGetData();
const route = useRoute();
const params = toRefs(route.params);
const allPages = inject("allPages");

const lastElement = computed(
  () => params.slug.value[params.slug.value.length - 1]
);
const selectedPageId = computed(() => {
  const foundPage = allPages.value.find(
    (page) => page.node.slug === lastElement.value
  );
  return foundPage ? foundPage.node.id : null;
});

const data = await fetchPageById(selectedPageId.value);
</script>
