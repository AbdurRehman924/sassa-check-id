<script setup lang="ts">
const config = useRuntimeConfig();
const { data, refresh, pending } = await useFetch(config.public.wordpressUrl, {
  method: "get",
  query: {
    query: `query GetPosts {
  page (id:"cG9zdDozODM="){
      id
      title
      date
      content
  }
}`,
  },
  transform(data: any) {
    return data.data as {
      page: { id: string; title: string; date: string; content: string };
    };
  },
});
</script>
<template>
  <TheHeader></TheHeader>

  <div class="mx-auto max-w-7xl">
    <!-- <Post v-for="post in data">
      <h1 class="my-4 text-2xl">
        {{ post.title }}
      </h1>
    </Post> -->
    <h1>{{ data?.page.title }}</h1>
    <div class="my-3" v-html="data?.page.content"></div>
  </div>
</template>

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
