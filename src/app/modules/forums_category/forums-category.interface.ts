export type IForumCategory = {
  title: string;
  description: string;
  category: string;
  icon?: string;
  type: string;
  posts: [];
  views: number;

  slug: string;
};
