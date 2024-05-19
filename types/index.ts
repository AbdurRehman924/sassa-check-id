export type Page = {
  id: string;
  title: string;
  content: string;
  contentTypeName: string;
};
export type Category = {
  id: string;
  name: string;
  posts: Post;
};

type Post = {
  nodes: Node[];
};

type Node = {
  title: string;
  date: string;
  featuredImage: FeaturedImage;
  uri: string;
  categories: { nodes: { name: string } }[];
  author: { node: { name: string } };
};

type FeaturedImage = {
  node: {
    sourceUrl: string;
    srcSet: string;
    altText: string;
  };
};

export type PageResponse = { data: { nodeByUri: Page | Category } };

export type SeoResponse = {
  success: boolean;
  head: string;
};
