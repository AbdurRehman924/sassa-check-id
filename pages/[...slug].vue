<template>
  <div
    v-if="selectedPage"
    class="mx-auto max-w-7xl my-3 font-OpenSans min-h-screen"
    v-html="data?.page.content"></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const { fetchPageById } = useGetData();
const { fetchData } = useGetSeoData();

const route = useRoute();
const params = toRefs(route.params);
const allPages = inject("allPages");

const lastElement = computed(
  () => params.slug.value[params.slug.value.length - 1]
);
const selectedPage = computed(() => {
  return allPages.value.find((page) => page.node.slug === lastElement.value);
});

const data = await fetchPageById(selectedPage.value.node.id);

const { title, metas, scripts } = await fetchData(selectedPage.value.node.slug);

useHead({
  title,
  meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
  script: scripts.map((script) => ({
    type: script.type,
    json: script.content,
    hid: script.type,
  })),
});
</script>
