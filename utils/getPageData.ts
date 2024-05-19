import type { Page, Category } from "~/types";

export default (
  pageUri: string,
): Promise<{ data: { nodeByUri: Page | Category } }> =>
  $fetch(wordpressGraphqlUrl, {
    query: {
      query: `
      query getPageByUri {
        nodeByUri(uri: "${pageUri}"){
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
  });
