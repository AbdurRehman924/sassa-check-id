<template>
  <div>
    <div
      v-if="data.contentTypeName == 'page' || data.contentTypeName == 'post'"
      class="min-h-screen mx-auto my-3 max-w-7xl font-OpenSans"
      v-html="data.content"></div>
    <div v-else>
      <div v-if="data.posts" class="max-w-7xl mx-auto mt-3 mb-3">
        <div v-for="post in data.posts" :key="post.uri">
          <NuxtLink :to="post.uri">
            <img
              :src="post.featuredImage.sourceUrl"
              :alt="post.featuredImage.altText" />
          </NuxtLink>
          <div v-html="post.content"></div>
          <h2 class="mb-0">{{ post.title }}</h2>
          <p>{{ post.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imagesRegex, wordpressUrl } from "~/utils/constants";

const route = useRoute();
const nuxtApp = useNuxtApp();
const { $fetchSeoData } = useNuxtApp();
const { imagesUrl } = useRuntimeConfig().public;
const { data } = await useFetch(wordpressUrl, {
  query: {
    query: `
      query getPageByUri {
        nodeByUri(uri: "${route.params.uri}"){
          ... on Page{
            id,
            title,
            content,
            contentTypeName
          }
          ... on Category {
            id
            name
            posts{
              nodes{
                title
                date
                featuredImage {
                  node {
                    sourceUrl
                    srcSet
                    altText
                  }
                }
                uri
                categories{
                  nodes{
                    name
                  }
                }
                author{
                  node {
                    name
                  }
                }
              }
            }
          }
          ... on Post {
            id,
            title,
            content,
            contentTypeName
          }
        }
      }
      `,
  },
  key: route.params.uri,
  transform(data) {
    if (
      data.data.nodeByUri.contentTypeName == "page" ||
      data.data.nodeByUri.contentTypeName == "post"
    ) {
      const content = data.data.nodeByUri.content.replace(
        imagesRegex,
        imagesUrl
      );
      return {
        ...data.data.nodeByUri,
        content,
      };
    }
    return {
      ...data.data.nodeByUri,
      posts: data.data.nodeByUri.posts.nodes.map((post) => {
        return {
          ...post,
          featuredImage: {
            ...post.featuredImage.node,
            sourceUrl: post.featuredImage.node.sourceUrl.replace(
              imagesRegex,
              imagesUrl
            ),
            srcSet: post.featuredImage.node.srcSet.replace(
              imagesRegex,
              imagesUrl
            ),
          },
        };
      }),
    };
  },
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const { title, metas } = await $fetchSeoData(route.params.uri);
useHead({
  title,
  meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
});
</script>
