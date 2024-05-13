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
  const route = useRoute();
  const { wordpressUrl } = useAppConfig();
  const nuxtApp = useNuxtApp();
  const regex = /https:\/\/wpbackend\.perceptiond\.net\/wp-content/g;
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
          regex,
          "http://localhost:3000/images"
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
                regex,
                "http://localhost:3000/images"
              ),
              srcSet: post.featuredImage.node.srcSet.replace(
                regex,
                "http://localhost:3000/images"
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
