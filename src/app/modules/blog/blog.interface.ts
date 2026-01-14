export interface IBlog {
  title: string;
  description: string;
  image: string;
  author: any;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
