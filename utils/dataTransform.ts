import type { Category, Page, PageResponse, SeoResponse } from "~/types";

export default (baseUrlToReplace: string, imagesUrlToReplace: string) => {
  return function ([pageResponse, seoReponse]: [PageResponse, SeoResponse]) {
    if (
      (pageResponse.data.nodeByUri as Page).contentTypeName == "page" ||
      (pageResponse.data.nodeByUri as Page).contentTypeName == "post"
    ) {
      const content = (pageResponse.data.nodeByUri as Page).content.replace(
        imagesRegex,
        imagesUrlToReplace,
      );
      return [
        {
          ...pageResponse.data.nodeByUri,
          content,
        },
        {
          head: seoReponse.head
            .replace(imagesRegex, imagesUrlToReplace)
            .replace(baseUrlRegex, baseUrlToReplace),
        },
      ];
    }
    return [
      {
        ...pageResponse.data.nodeByUri,
        posts: (pageResponse.data.nodeByUri as Category).posts.nodes.map(
          function (post) {
            return {
              ...post,
              featuredImage: {
                ...post.featuredImage.node,
                sourceUrl: post.featuredImage.node.sourceUrl.replace(
                  imagesRegex,
                  imagesUrlToReplace,
                ),
                srcSet: post.featuredImage.node.srcSet.replace(
                  imagesRegex,
                  imagesUrlToReplace,
                ),
              },
            };
          },
        ),
      },
      {
        head: seoReponse.head
          .replace(imagesRegex, imagesUrlToReplace)
          .replace(baseUrlRegex, baseUrlToReplace),
      },
    ];
  };
};
