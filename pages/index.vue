<template>
  <SassaStatusForm />
  <div class="mx-auto max-w-7xl">
    <div class="my-3 font-OpenSans text-lg" v-html="data?.page.content"></div>
  </div>
</template>

<script setup>
const allPages = inject("allPages");
const { fetchPageById } = useGetData();

let indexPage = computed(() =>
  allPages.value.find((page) => page.node.isFrontPage === true)
);
const data = await fetchPageById(indexPage.value.node.id);
</script>
<style></style>
