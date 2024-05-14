<template>
  <div>
    <div
      v-if="data.contentTypeName == 'page' || data.contentTypeName == 'post'"
      class="min-h-screen px-6 mx-auto my-3 max-w-7xl font-OpenSans"
      v-html="data.content"
    ></div>
    <div v-else>
      <div v-if="data.posts" class="px-6 mx-auto mt-3 mb-3 max-w-7xl">
        <div v-for="post in data.posts" :key="post.uri">
          <NuxtLink :to="post.uri">
            <img
              :src="post.featuredImage.sourceUrl"
              :alt="post.featuredImage.altText"
            />
          </NuxtLink>
          <div v-html="post.content"></div>
          <h2 class="mb-0">{{ post.title }}</h2>
          <p>{{ new Date(post.date).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as cheerio from "cheerio";
import {
  wordpressBaseUrl,
  wordpressGraphqlUrl,
  wordpressSEOUrl,
  baseUrlRegex,
  imagesRegex,
} from "~/utils/constants";

const route = useRoute();
const nuxtApp = useNuxtApp();
const { baseUrl, imagesUrl } = useRuntimeConfig().public;
const { data } = await useFetch(wordpressGraphqlUrl, {
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
        imagesUrl,
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
              imagesUrl,
            ),
            srcSet: post.featuredImage.node.srcSet.replace(
              imagesRegex,
              imagesUrl,
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

const { data: seo } = await useFetch(
  `${wordpressSEOUrl}?url=${wordpressBaseUrl}/${route.params.uri}/`,
  {
    transform(data) {
      return {
        head: data.head
          .replace(imagesRegex, imagesUrl)
          .replace(baseUrlRegex, baseUrl),
      };
    },
    key: `SEO_${route.params.uri}`,
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const $ = cheerio.load(seo.value.head);
const title = $("title").text();
const metas = $("meta")
  .toArray()
  .map((meta) => $(meta).attr());

useHead({
  title,
  meta: metas.map((meta) => ({ ...meta, hid: meta.name || meta.property })),
});
</script>
