<template>
  <SassaStatusForm />
  <div class="mx-auto max-w-7xl">
    <h1 class="text-center">{{ data.page.title }}</h1>
    <div class="my-3 font-OpenSans text-lg" v-html="data?.page.content"></div>
  </div>
</template>

<script setup>
const allPages = inject("allPages");
const { fetchPageById } = useGetData();
const { fetchData } = useGetSeoData();

let indexPage = computed(() =>
  allPages.value.find((page) => page.node.isFrontPage === true)
);
const data = await fetchPageById(indexPage.value.node.id);

const { title, metas, scripts } = await fetchData(indexPage.value.node.slug);
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
