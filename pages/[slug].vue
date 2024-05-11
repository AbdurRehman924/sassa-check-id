<template>
  <div
    v-if="selectedPage"
    class="min-h-screen mx-auto my-3 max-w-7xl font-OpenSans"
    v-html="data?.page.content"></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const { fetchPageById } = useGetData();
const { fetchData } = useGetSeoData();

const route = useRoute();
const allPages = inject("allPages");

const selectedPage = computed(() => {
  return allPages.value.find((page) => page.node.slug === route.params.slug);
});

const data = await fetchPageById(selectedPage.value.node.id);

const { title, metas } = await fetchData(selectedPage.value.node.slug);

useHead({
  title,
  meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
});
</script>
