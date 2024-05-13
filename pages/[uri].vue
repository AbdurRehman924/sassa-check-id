<template>
  <div>
    <div
      v-if="data.contentTypeName == 'page' || data.contentTypeName == 'post'"
      class="min-h-screen mx-auto my-3 max-w-7xl font-OpenSans"
      v-html="data.content"
    ></div>
    <div v-else>
      {{ data }}
    </div>
  </div>
</template>

<script setup>
  import { imagesRegex, wordpressUrl } from "~/utils/constants";

  const route = useRoute();
  const nuxtApp = useNuxtApp();
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
</script>
