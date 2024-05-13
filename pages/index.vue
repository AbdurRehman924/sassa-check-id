<template>
  <SassaStatusForm />
  <img
    src="http://localhost:3000/images/id/1322104312/photo/freedom-chains-that-transform-into-birds-charge-concept.jpg?s=2048x2048&w=is&k=20&c=ZUWO0obdgqfvcSFLGFPJdcLR7Sg6X05fuAxSnAYPtM0="
  />
  <div class="mx-auto max-w-7xl">
    <h1 class="text-center">{{ data.page.title }}</h1>
    <div class="my-3 text-lg font-OpenSans" v-html="data.page.content"></div>
  </div>
</template>

<script setup>
  const allPages = inject("allPages");

  let indexPage = computed(() =>
    allPages.value.find((page) => page.node.isFrontPage === true)
  );
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const { data } = await useFetch(wordpressUrl, {
    query: {
      query: `query GetPosts {
          page (id:"${indexPage.value.node.id}"){
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
    key: indexPage.value.node.id,
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
</script>
