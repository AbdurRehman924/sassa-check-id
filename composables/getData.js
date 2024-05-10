export const useGetData = () => {
  const config = useRuntimeConfig();
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
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchPages, fetchPageById };
};
