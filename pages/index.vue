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
    <div class="my-3" v-html="data?.page.content"></div>
  </div>
</template>
