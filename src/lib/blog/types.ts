export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: string;
  author: string;
  category: string;
  locale: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
