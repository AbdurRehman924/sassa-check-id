<template>
  <div class="mx-auto my-3 max-w-7xl font-OpenSans">
    <CategoriesList :data="data" />
    <div v-interpolate>
      <div
        v-for="item in posts"
        class="mx-auto my-3 text-lg max-w-7xl font-OpenSans"
        v-html="item.node.content"
      ></div>
    </div>
  </div>
</template>
<script setup>
  const { data } = await useFetch(useAppConfig().wordpressUrl, {
    method: "get",
    query: {
      query: `query NewQuery {
            categories {
              nodes {
                id
                name
              }
            }
          }`,
    },
    transform(data) {
      return data.data.categories.nodes;
    },
  });

  let posts = ref();
  let count = ref();

  let firstCategoryId = computed(() => data.value[0].id);

  const { data: loadedPosts } = await useFetch(useAppConfig().wordpressUrl, {
    method: "get",
    query: {
      query: `query NewQuery {
            category(id: "${firstCategoryId.value}") {
              count
              posts {
                edges {
                  node {
                    title
                    content
                  }
                }
              }
            }
          }`,
    },
    transform(data) {
      return {
        posts: data.data.category.posts.edges,
        count: data.data.category.count,
      };
    },
  });
  posts.value = loadedPosts.value.posts;
  count.value = loadedPosts.value.count;

  let regex = /https:\/\/wpbackend\.perceptiond\.net\/wp-content/g;
  const vInterpolate = {
    mounted(el) {
      Array.from(el.getElementsByTagName("img")).forEach((image) => {
        const src = image.getAttribute("src");
        const newSrc = src.replace(regex, "http://localhost:3000/images");
        image.setAttribute("src", newSrc);
        const srcSets = image.getAttribute("srcSet").split(",");
        const newSrcSets = [];
        srcSets.forEach((srcSet) => {
          srcSet = srcSet.replace(regex, "http://localhost:3000/images");
          newSrcSets.push(srcSet);
        });
        image.setAttribute("srcSet", newSrcSets.join(","));
      });
    },
  };
</script>
