export default (baseUrlToReplace, imagesUrlToReplace) => {
  return function ([pageResponse, seoReponse]) {
    if (
      pageResponse.data.nodeByUri.contentTypeName == "page" ||
      pageResponse.data.nodeByUri.contentTypeName == "post"
    ) {
      const content = pageResponse.data.nodeByUri.content.replace(
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
        posts: pageResponse.data.nodeByUri.posts.nodes.map(function (post) {
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
        }),
      },
      {
        head: seoReponse.head
          .replace(imagesRegex, imagesUrlToReplace)
          .replace(baseUrlRegex, baseUrlToReplace),
      },
    ];
  };
};
