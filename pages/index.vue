<script setup lang="ts">
const config = useRuntimeConfig();
const { data, refresh, pending } = await useFetch(config.public.wordpressUrl, {
  method: "get",
  query: {
    query: `query NewQuery {
  page(id: "cG9zdDozODM=") {
      title
      date
      content
    }
  }`,
  },
  transform(data: any) {
    console.log(data);

    return data.data.page as Array<
      Record<"title" | "date" | "content", string>
    >;
  },
});
</script>
<template>
  <TheHeader></TheHeader>

  <div class="mx-auto max-w-7xl">
    <div v-for="page in data">
      <h1 class="my-4 text-2xl">
        {{ page.title }}
      </h1>
      <div class="my-3" v-html="page.content"></div>
    </div>
  </div>
</template>
