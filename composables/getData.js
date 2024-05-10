export const useGetData = () => {
  const config = useRuntimeConfig();

  const fetchPages = async (id) => {
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

  return { fetchPages };
};
