<script setup lang="ts">
const config = useRuntimeConfig();
const { data, refresh, pending } = await useFetch(config.public.wordpressUrl, {
  method: "get",
  query: {
    query: `query NewQuery {
        posts{
          nodes {
            title
            date
            excerpt
        content
          }
        }
      
      }`,
  },
  transform(data: any) {
    return data.data.posts.nodes as Array<
      Record<"title" | "date" | "excerpt" | "uri" | "content", string>
    >;
  },
});
</script>
<template>
  <TheHeader></TheHeader>

  <div class="mx-auto max-w-7xl">
    <Post v-for="post in data">
      <h1 class="my-4 text-2xl">
        {{ post.title }}
      </h1>
      <div class="my-3" v-html="post.content"></div>
    </Post>
  </div>
</template>
