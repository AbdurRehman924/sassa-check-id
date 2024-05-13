export const useGetData = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const fetchPages = async () => {
    try {
      const { data } = useFetch(config.public.wordpressUrl, {
        method: "get",
        query: {
          query: `query NewQuery {
        pages {
          edges {
            node {
              title
              link
              id
              isFrontPage
              slug
            }
          }
        }
      }`,
        },
        transform(data) {
          return data.data.pages.edges;
        },
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPageById = async (id) => {
    try {
      const { data } = await useFetch(config.public.wordpressUrl, {
        method: "get",
        query: {
          query: `query GetPosts {
          page (id:"${id}"){
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
        key: `page-${id}`,
        getCachedData(key) {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const { data } = await useFetch(config.public.wordpressUrl, {
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
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategoryById = async (id) => {
    try {
      const { data } = await useFetch(config.public.wordpressUrl, {
        method: "get",
        query: {
          query: `query NewQuery {
            category(id: "${id}") {
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
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchPages, fetchPageById, fetchCategories, fetchCategoryById };
};
